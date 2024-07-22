import React, { useEffect, useState } from "react";
import * as formelement from "../../data/Form/formelement/formelement";
import MultiSelect from "react-multiple-select-dropdown-lite";
import {
  CForm,
  CCol,
  CFormLabel,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CButton,
  CFormCheck,
} from "@coreui/react";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import endpoint from "../../context/endpoint";
import Loader from "../Loader/loader";
import { ErrorAlert, SuccessAlert } from "../../data/Toast/toast";
import { Link, useParams, useNavigate } from "react-router-dom";
import { trim } from "lodash";
import {
  Col,
  Row,
  Card,
  Form,
  FormGroup,
  FormControl,
  ListGroup,
  Button,
  Breadcrumb,
} from "react-bootstrap";

export default function PartiesData() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const params = useParams();

  const id = params?.id;

  const [modalHeading, setModalHeading] = useState("");
  const [appellantModalHeading, setAppellantModalHeading] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [appellantModal, setShowAppellantModal] = useState(false);
  const [showRespondent, setRespondentShow] = useState(false);

  const [respondents, setRespondent] = useState([]);
  const [appellants, setAppellant] = useState([]);
  const [respondent, setRespondentName] = useState("");
  const [appellant, setAppellantName] = useState("");
  const [singleAppellant, setSingleAppellant] = useState({});
  const [singleRespondent, setSingleRespondent] = useState({});
  const [showAppellantDeleteModal, setShowAppellantDeleteModal] =
    useState(false);
  const [showRespondentDeleteModal, setShowRespondentDeleteModal] =
    useState(false);

  // Show appellant modal
  const handleAppellantModal = () => {
    setShowAppellantModal(true);
    setSingleAppellant({});
    setAppellantModalHeading("Add New Appellant");
  };

  // Show respondent modal
  const handleRespondentShow = () => {
    setRespondentShow(true);
    setSingleRespondent({});
    setModalHeading("Add New Respondent");
  };

  // Show appellant delete modal
  const handleShowAppellantDeleteModal = (appellant) => {
    setSingleAppellant(appellant);
    setShowAppellantDeleteModal(true);
  };

  // Show respondent delete modal
  const handleShowRespondentDeleteModal = (respondent) => {
    setSingleRespondent(respondent);
    setShowRespondentDeleteModal(true);
  };

  // Create or edit appellant
  const handleCreateAppellant = async () => {
    setLoading(true);
    if (singleAppellant.id) {
      await endpoint
        .put(`/case/appellant/edit/${singleAppellant.id}`, {
          appellant: trim(appellant),
        })
        .then((res) => {
          SuccessAlert(res.data.message);
          getAppellantList();
          setShowAppellantModal(false);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          ErrorAlert(err.response.data.description);
        });
    } else {
      await endpoint
        .post(`/case/create-appellant/`, { appellant: trim(appellant) })
        .then((res) => {
          SuccessAlert(res.data.message);
          getAppellantList();
          setShowAppellantModal(false);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          ErrorAlert(error.response.data.description);
        });
    }
  };

  // Create or edit respondent
  const handleCreateRespondent = async () => {
    setLoading(true);
    if (singleRespondent.id) {
      await endpoint
        .put(`/case/respondent/edit/${singleRespondent.id}`, {
          respondent: trim(respondent),
        })
        .then((res) => {
          SuccessAlert(res.data.message);
          getRespondentList();
          setRespondentShow(false);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          ErrorAlert(err.response.data.description);
        });
    } else {
      await endpoint
        .post(`/case/create-respondent`, { respondent: trim(respondent) })
        .then((res) => {
          SuccessAlert(res.data.message);
          getRespondentList();
          setRespondentShow(false);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          ErrorAlert(error.response.data.description);
        });
    }
  };

  // Get appellant list
  const getAppellantList = async () => {
    await endpoint
      .get("/case/appellants/list")
      .then((res) => {
        setAppellant(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Get respondent list
  const getRespondentList = async () => {
    await endpoint
      .get("/case/respondents/list")
      .then((res) => {
        setRespondent(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAppellantList();
    getRespondentList();
  }, []);

  // Delete appellant
  const deleteAppellant = async (id) => {
    setLoading(true);
    await endpoint
      .delete(`/case/appellant/delete/${id}`)
      .then((res) => {
        getAppellantList();
        setLoading(false);
        SuccessAlert(res.data.message);
        setShowAppellantDeleteModal(false);
      })
      .catch((err) => {
        setLoading(false);
        setShowAppellantDeleteModal(false);
        ErrorAlert(err.response.data.description);
      });
  };

  // Delete respondent
  const deleteRespondent = async (id) => {
    setLoading(true);
    await endpoint
      .delete(`/case/respondent/delete/${id}`)
      .then((res) => {
        getRespondentList();
        setLoading(false);
        SuccessAlert(res.data.message);
        setShowRespondentDeleteModal(false);
      })
      .catch((err) => {
        setLoading(false);
        setShowRespondentDeleteModal(false);
        ErrorAlert(err.response.data.description);
      });
  };

  return (
    <>
      <div>
        <Row>
          <Col lg={6} xl={6} md={12} sm={12}>
            <Card>
              <Card.Header>
                <Col className="text-beginning">
                  <Card.Title
                    as="h3"
                    style={{ color: "#0A7E51", fontWeight: 900 }}
                  >
                    APPELLANTS
                  </Card.Title>
                </Col>
                <Col className="text-end">
                  <Button
                    className="btn"
                    type="submit"
                    variant="primary"
                    onClick={(e) => {
                      handleAppellantModal();
                      setAppellantModalHeading("Add New Appellant");
                    }}
                    style={{ color: "#0A7E51", fontWeight: 900 }}
                  >
                    <span className="fe fe-plus"></span>
                    Add Appellant
                  </Button>
                </Col>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead style={{ background: "#0A7E51" }}>
                      <tr>
                        <th style={{ color: "#fff", fontWeight: 900 }}>S/N</th>
                        <th style={{ color: "#fff", fontWeight: 900 }}>Name</th>
                        <th style={{ color: "#fff", fontWeight: 900 }}>
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {appellants.map((data, index) => (
                        <tr key={data.id}>
                          <td>{index + 1}</td>
                          <td>
                            {data.appellant ? data.appellant.toUpperCase() : ""}
                          </td>
                          <td>
                            <Button
                              to="#"
                              className="btn bright-btn btn-secondary-bright"
                              // style={{ backgroundColor: "blue" }}
                              variant="blue"
                              onClick={(e) => {
                                handleAppellantModal();
                                setSingleAppellant(data);
                                setAppellantModalHeading(
                                  `Edit ${data.appellant}`
                                );
                              }}
                            >
                              <span
                                className="fe fe-edit"
                                style={{ fontWeight: 900 }}
                              ></span>
                              Edit
                            </Button>
                            &nbsp;&nbsp;
                            <Link
                              to="#"
                              className="btn btn-danger"
                              variant="danger"
                              onClick={(e) => {
                                handleShowAppellantDeleteModal(data);
                              }}
                            >
                              <span
                                className="fe fe-trash"
                                style={{ fontWeight: 900 }}
                              ></span>
                              Delete
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={6} xl={6} md={12} sm={12}>
            <Card>
              <Card.Header>
                <Col className="text-beginning">
                  <Card.Title
                    as="h3"
                    style={{ color: "#0A7E51", fontWeight: 900 }}
                  >
                    RESPONDENTS
                  </Card.Title>
                </Col>
                <Col className="text-end">
                  <Button
                    className="btn"
                    type="submit"
                    variant="primary"
                    onClick={(e) => {
                      handleRespondentShow();
                      setModalHeading("Add New Respondent");
                    }}
                    style={{ color: "#0A7E51", fontWeight: 900 }}
                  >
                    <span className="fe fe-plus"></span>
                    Add Respondent
                  </Button>
                </Col>
              </Card.Header>
              <Card.Body>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead style={{ background: "#0A7E51" }}>
                      <tr>
                        <th style={{ color: "#fff", fontWeight: 900 }}>S/N</th>
                        <th style={{ color: "#fff", fontWeight: 900 }}>Name</th>
                        <th style={{ color: "#fff", fontWeight: 900 }}>
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {respondents.map((data, index) => (
                        <tr key={data.id}>
                          <td>{index + 1}</td>
                          <td>
                            {data.respondent
                              ? data.respondent.toUpperCase()
                              : ""}
                          </td>
                          <td>
                            <Button
                              to="#"
                              className="btn bright-btn btn-secondary-bright"
                              variant="blue"
                              onClick={(e) => {
                                handleRespondentShow();
                                setSingleRespondent(data);
                                setModalHeading(`Edit ${data.respondent}`);
                              }}
                            >
                              <span
                                className="fe fe-edit"
                                style={{ fontWeight: 900 }}
                              ></span>
                              Edit
                            </Button>
                            &nbsp;&nbsp;
                            <Link
                              to="#"
                              className="btn btn-danger"
                              variant="danger"
                              onClick={(e) => {
                                handleShowRespondentDeleteModal(data);
                              }}
                            >
                              <span
                                className="fe fe-trash"
                                style={{ fontWeight: 900 }}
                              ></span>
                              Delete
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Modal show={appellantModal}>
          <Modal.Header>
            <Button
              onClick={() => setShowAppellantModal(false)}
              className="btn-close"
              variant=""
            >
              x
            </Button>
          </Modal.Header>
          <CForm
            onSubmit={handleSubmit(handleCreateAppellant)}
            className="row g-3 needs-validation"
          >
            <Modal.Body>
              <div>
                <Card>
                  <Card.Header>
                    <Card.Title as="h3">{appellantModalHeading}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Col lg={12} md={12}>
                      <FormGroup>
                        <label htmlFor="exampleInputname">Name</label>
                        <Form.Control
                          defaultValue={
                            singleAppellant && singleAppellant.appellant
                          }
                          type="text"
                          name="fullname"
                          onChange={(e) => setAppellantName(e.target.value)}
                          className="form-control"
                        />
                      </FormGroup>
                    </Col>
                  </Card.Body>
                </Card>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="dark"
                className="me-1"
                onClick={() => setShowAppellantModal(false)}
              >
                Close
              </Button>
              <Button variant="primary" type="submit" className="me-1">
                <span className="fe fe-arrow-right"></span>
                Save
              </Button>
            </Modal.Footer>
          </CForm>
        </Modal>

        <Modal show={showRespondent}>
          <Modal.Header>
            <Button
              onClick={() => setRespondentShow(false)}
              className="btn-close"
              variant=""
            >
              x
            </Button>
          </Modal.Header>
          <CForm
            onSubmit={handleSubmit(handleCreateRespondent)}
            className="row g-3 needs-validation"
          >
            <Modal.Body>
              <div>
                <Card>
                  <Card.Header>
                    <Card.Title as="h3">{modalHeading}</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Col lg={12} md={12}>
                      <FormGroup>
                        <label htmlFor="exampleInputname">Name</label>
                        <Form.Control
                          defaultValue={
                            singleRespondent && singleRespondent.respondent
                          }
                          type="text"
                          name="fullname"
                          onChange={(e) => setRespondentName(e.target.value)}
                          className="form-control"
                        />
                      </FormGroup>
                    </Col>
                  </Card.Body>
                </Card>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="dark"
                className="me-1"
                onClick={() => setRespondentShow(false)}
              >
                Close
              </Button>
              <Button variant="primary" type="submit" className="me-1">
                <span className="fe fe-arrow-right"></span>
                Save
              </Button>
            </Modal.Footer>
          </CForm>
        </Modal>

        <Modal
          show={showAppellantDeleteModal}
          onHide={() => setShowAppellantDeleteModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Remove Appellant</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Col lg={12} md={12}>
                  Please confirm you are about to delete{" "}
                  {singleAppellant.appellant}?
                </Col>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="warning"
              onClick={() => setShowAppellantDeleteModal(false)}
            >
              Close
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteAppellant(singleAppellant.id)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showRespondentDeleteModal}
          onHide={() => setShowRespondentDeleteModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Remove Respondent</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body>
                <Col lg={12} md={12}>
                  Please confirm you are about to delete{" "}
                  {singleRespondent.respondent}?
                </Col>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="warning"
              onClick={() => setShowRespondentDeleteModal(false)}
            >
              Close
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteRespondent(singleRespondent.id)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
