import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import endpoint from "../../../context/endpoint";
import Select from "react-select";
import {
  Tabs,
  Tab,
  Breadcrumb,
  Card,
  Row,
  Col,
  Table,
  Modal,
  Button,
} from "react-bootstrap";
import "./styles.css";

import Loader from "../../../data/Loader/loader";

import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";

export default function SingleCase() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [openCaseModalData, setOpenCaseModalData] = useState();
  const [legalOfficers, setLegalOfficers] = useState([]);
  const [chambers, setChambers] = useState([]);

  const [legalOfficerId, setLegalOfficerId] = useState();
  const [chamberId, setChamberId] = useState();

  const [LegalModal, setLegalModal] = useState(false);
  const [motionModal, setMotionModal] = useState(false);
  const [caseModal, setCaseModal] = useState(false);

  const [ChamberModal, setChamberModal] = useState(false);
  const [attachment, setCaseAttachment] = useState([]);
  const [motionData, setMotionData] = useState();
  const [fileType, setFileType] = useState();
  const [selectedCouncil, setSelectedCouncil] = useState(null);
  const [selectedChamber, setSelectedChamber] = useState(null);

  const navigate = useNavigate();

  const openLegalModal = () => {
    setLegalModal(true);
  };

  const closeLegalModal = () => {
    setLegalModal(false);
  };

  const openChamberModal = () => {
    setChamberModal(true);
  };

  const closeChamberModal = () => {
    setChamberModal(false);
  };

  const openMotionModal = () => {
    setMotionData(data);
    setMotionModal(true);
  };
  const closeMotionModal = () => {
    setMotionModal(false);
  };

  const openCaseModal = (data) => {
    setOpenCaseModalData(data);
    setCaseModal(true);
  };
  const closeCaseModal = () => {
    setCaseModal(false);
  };

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    getUser();
    getLegalOfficer();
    getChambers();
    getFileType();
  }, []);
  const [motionDetails, setMotionDetails] = useState({
    case_id: id,
    motion_description: "",
    doc_type_id: "",
    doc_url: null,
  });

  //get all users
  const getUser = async () => {
    setLoading(true);
    await endpoint
      .get(`/case/show/${id}`)
      .then(({ data }) => {
        console.log("case", data.data);
        setData(data.data);
        setCaseAttachment(data.data.CaseAttachments);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const getLegalOfficer = async () => {
    setLoading(true);
    await endpoint
      .get(`/legal-officer/list`)
      .then(({ data }) => {
        console.log("legal officer", data.data);
        setLegalOfficers(data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const getChambers = async () => {
    setLoading(true);
    await endpoint
      .get(`/solicitor/list`)
      .then(({ data }) => {
        console.log("chamber", data.data);
        setChambers(data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const getFileType = async () => {
    setLoading(true);
    await endpoint
      .get(`/file-type/list`)
      .then(({ data }) => {
        console.log("fileType", data.data);
        setFileType(data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const judgeIDs =
    selectedCouncil && selectedCouncil.map((option) => option.value);

  const handleAddLegalOfficer = async () => {
    try {
      const data = new FormData();
      data.append("case_id", id);
      data.append("legal_officer_id", judgeIDs);

      const response = await endpoint.post(`/case/assign-council`, data);
      closeLegalModal();
      // navigate(`${process.env.PUBLIC_URL}/cases`);
      SuccessAlert(response.data.message);
    } catch (err) {
      console.log(err);
      setLoading(false);
      closeLegalModal();
      if (err.response && err.response.data && err.response.data.description) {
        ErrorAlert(err.response.data.description);
      } else {
        ErrorAlert("An error occurred. Please try again.");
        closeLegalModal();
      }
    }
  };

  const chambersIDs =
    selectedChamber && selectedChamber.map((option) => option.value);

  const handleAddChamberOfficer = async () => {
    try {
      const data = new FormData();
      data.append("case_id", id);
      data.append("chamber_solicitor_id", chambersIDs);

      const response = await endpoint.post(`/case/assign-solicitor`, data);
      closeChamberModal();
      // navigate(`${process.env.PUBLIC_URL}/cases`);
      SuccessAlert(response.data.message);
    } catch (err) {
      console.log(err);
      setLoading(false);
      closeChamberModal();
      if (err.response && err.response.data && err.response.data.description) {
        ErrorAlert(err.response.data.description);
      } else {
        ErrorAlert("An error occurred. Please try again.");
        closeChamberModal();
      }
    }
  };

  const handleAddMotion = async () => {
    try {
      const data = new FormData();
      data.append("case_id", motionDetails.case_id);
      data.append("case_description", motionDetails.case_description);
      data.append("doc_type_id", motionDetails.doc_type_id);
      data.append("doc_url", motionDetails.doc_url);

      const response = await endpoint.post(`/motion/create`, data);
      navigate(`${process.env.PUBLIC_URL}/cases`);
      SuccessAlert(response.data.message);
    } catch (err) {
      console.log(err);
      setLoading(false);
      closeMotionModal();
      if (err.response && err.response.data && err.response.data.description) {
        ErrorAlert(err.response.data.description);
      } else {
        ErrorAlert("An error occurred. Please try again.");
      }
    }
  };

  const handleCloseCase = async () => {
    await endpoint
      .post(`/case/close/${id}`)
      .then((res) => {
        console.log("case gateway", res);
        setData(data.data);
        getUser(); // Refresh case data
        SuccessAlert(res.data.message);
        setLoading(false);
        closeCaseModal();
      })
      .catch((err) => {
        setLoading(false);
        closeCaseModal();
        ErrorAlert(err.response.data.message);
        // console.log(err);
      });
  };

  const handleReopenCaseClick = (id) => {
    // console.log("reopen id", id);
    // window.location.href = `/reopen-case/${id}`;
    navigate(`/reopen-case/${id}`);
  };

  // const handleReopenCase = async () => {
  //   await endpoint
  //     .post(`/case/reopen`)
  //     .then((res) => {
  //       console.log("case gateway", res);
  //       setData(data.data);
  //       getUser(); // Refresh case data
  //       SuccessAlert(res.data.message);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       closeCaseModal();
  //       ErrorAlert(err.response.data.message);
  //       // console.log(err);
  //     });
  // };

  return (
    <>
      <div>
        <Col xl={12} md={12}>
          <Card className="card border">
            {loading && <Loader />}
            {!loading && data && (
              <Card.Body>
                <div className="text-center"></div>
                <div className="mt-5">
                  <div
                    className="container bg-primary text-white custom-height"
                    style={{ height: "50px", borderRadius: "5px" }}
                  >
                    <h4 className="text-center text-uppercase pt-3">
                      Case Information
                    </h4>
                  </div>
                  <hr className="my-4" />
                  <div className="row m-5">
                    {data && (
                      <div className="col-md-12">
                        <div className="row border">
                          <div className="fw-bold col-md-6">Suite No:</div>
                          <div className="col-md-6">{data.suite_no}</div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">Court:</div>
                          <div
                            className="col-md-6"
                            // style={{ textAlign: `right` }}
                          >
                            {data.Court ? data.Court.name : ""}
                          </div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">Parties:</div>
                          <div className="col-md-6">{data.parties}</div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">Respondent:</div>
                          <div className="col-md-6">{data.respondent}</div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">Case Type:</div>
                          <div className="col-md-6">
                            {data.CaseType ? data.CaseType.case_type : ""}
                          </div>
                        </div>
                        <div className="row border">
                          <div className="fw-bold col-md-6">
                            Case Description:
                          </div>
                          <div className="col-md-6">
                            {data.case_description}
                          </div>
                        </div>
                        <div className="row border">
                          <div className="fw-bold col-md-6">Legal Officer:</div>
                          <div className="col-md-6">
                            {data.LegalOfficer ? (
                              <>
                                {
                                  // data.LegalOfficer.Title
                                  // ? data.LegalOfficer.Title.name
                                  // : "" +
                                  data.LegalOfficer.surname +
                                    " " +
                                    data.LegalOfficer.first_name +
                                    " " +
                                    data.LegalOfficer.middle_name
                                }
                                <button
                                  className="btn btn-primary mx-5"
                                  onClick={openLegalModal}
                                >
                                  change
                                </button>
                              </>
                            ) : (
                              <button
                                className="btn btn-info bright-btn btn-info-bright"
                                onClick={openLegalModal}
                              >
                                <span className="fe fe-plus"></span>
                                Attach Legal Officer
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">
                            Chamber/Solicitor:
                          </div>
                          <div className="col-md-6">
                            {data.ChamberOrSolicitor ? (
                              <>
                                {data.ChamberOrSolicitor.chamber_name}
                                <button
                                  className="btn btn-primary mx-5"
                                  onClick={openChamberModal}
                                >
                                  change
                                </button>
                              </>
                            ) : (
                              <button
                                className="btn btn-primary bright-btn btn-secondary-bright"
                                onClick={openChamberModal}
                              >
                                <span className="fe fe-plus"></span>
                                Attach Chamber/Solicitor
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">Attachment(s):</div>
                          <div className="col-md-6">
                            {attachment.map((attach) => (
                              <a
                                href={`${
                                  process.env.REACT_APP_UPLOAD_URL +
                                  attach.doc_url
                                }`}
                                target="_blank"
                                className="btn btn-sm btn-primary bright-btn btn-secondary-bright m-1"
                              >
                                <span className="fa fa-eye"></span>{" "}
                                View/Download
                              </a>
                            ))}
                          </div>
                        </div>
                        <div className="row border">
                          <div className="fw-bold col-md-6">Case Status:</div>
                          <div className="col-md-6">
                            <a
                              href={`#`}
                              className="btn bright-btn btn-secondary-bright m-1"
                            >
                              <i className="fa fa-file" aria-hidden="true"></i>
                              {data.status == 1 ? "Pending" : " Resolved"}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card.Body>
            )}

            <div className="d-flex justify-content-between">
              <button
                className="btn btn-primary bright-btn btn-primary-bright mx-5"
                onClick={openMotionModal}
              >
                Attach Motion
              </button>
              {data && (
                <button
                  className={`btn ${
                    data.status === 2
                      ? "btn-danger bright-btn btn-danger-bright"
                      : "btn-danger bright-btn btn-danger-bright"
                  } mx-5`}
                  onClick={() => openCaseModal(data)}
                >
                  {data.status === 2 ? "Reopen Case" : "Close Case"}
                </button>
              )}
            </div>
          </Card>
        </Col>
        <Modal show={LegalModal}>
          <Modal.Header>
            <Button onClick={closeLegalModal} className="btn-close" variant="">
              x
            </Button>
          </Modal.Header>

          <Modal.Body>
            <div>
              <Card>
                <Card.Header>
                  <Card.Title as="h3">Attach legal Officer </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Col lg={12} md={12}>
                    <p>Please select legal Officers</p>
                    <Select
                      isMulti
                      options={legalOfficers.map((judge) => ({
                        value: judge.id,
                        label: `${
                          judge.surname +
                          " " +
                          judge.first_name +
                          " " +
                          judge.middle_name
                        }`,
                      }))}
                      value={legalOfficerId}
                      onChange={setSelectedCouncil}
                      getOptionLabel={(option) => option.label} // Function to specify how options are displayed
                    />
                  </Col>
                </Card.Body>
              </Card>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" className="me-1" onClick={closeLegalModal}>
              Close
            </Button>
            <Button
              variant="primary"
              className="me-1"
              onClick={(e) => handleAddLegalOfficer(e, params.id)}
            >
              Assign
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={ChamberModal}>
          <Modal.Header>
            <Button
              onClick={closeChamberModal}
              className="btn-close"
              variant=""
            >
              x
            </Button>
          </Modal.Header>

          <Modal.Body>
            <div>
              <Card>
                <Card.Header>
                  <Card.Title as="h3">Attach Chamber </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Col lg={12} md={12}>
                    <p>Please select Chamber</p>
                    <Select
                      isMulti
                      options={chambers.map((chamber) => ({
                        value: chamber.id,
                        label: `${chamber.chamber_name}`,
                      }))}
                      value={legalOfficerId}
                      onChange={setSelectedChamber}
                      getOptionLabel={(option) => option.label} // Function to specify how options are displayed
                    />
                  </Col>
                </Card.Body>
              </Card>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" className="me-1" onClick={closeChamberModal}>
              Close
            </Button>
            <Button
              variant="primary"
              className="me-1"
              onClick={(e) => handleAddChamberOfficer(e)}
            >
              Assign
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={motionModal} size="lg">
          <Modal.Header>
            <Button onClick={closeMotionModal} className="btn-close" variant="">
              x
            </Button>
          </Modal.Header>

          <Modal.Body>
            <div>
              <Card>
                <Card.Header>
                  <Card.Title as="h3">Attach Motion </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Col lg={12} md={12}>
                    <p>
                      Please complete the details to assign motion to{" "}
                      {motionData && motionData.suite_no}
                    </p>
                  </Col>
                  <Row className="my-5">
                    <Col md={6}>
                      <label htmlFor="document type">Document Type</label>
                      <select
                        className="form-select"
                        name=""
                        id=""
                        onChange={(e) =>
                          setMotionDetails({
                            ...motionDetails,
                            doc_type_id: e.target.value,
                          })
                        }
                      >
                        <option value="">--select--</option>
                        {fileType &&
                          fileType.map((file) => (
                            <option value={file.id} key={file.id}>
                              {file.name}
                            </option>
                          ))}
                      </select>
                    </Col>
                    <Col md={6}>
                      <label htmlFor="document type">Document </label>
                      <input
                        onChange={(e) =>
                          setMotionDetails({
                            ...motionDetails,
                            doc_url: e.target.files[0],
                          })
                        }
                        className="form-control"
                        type="file"
                        name=""
                        id=""
                      />
                    </Col>
                  </Row>
                  <Row className="my-5">
                    <Col md={12}>
                      <label htmlFor="document type">Motion Description</label>
                      <textarea
                        className="form-control"
                        onChange={(e) =>
                          setMotionDetails({
                            ...motionDetails,
                            motion_description: e.target.value,
                          })
                        }
                      ></textarea>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="warning"
              className="me-1"
              onClick={closeMotionModal}
            >
              Close
            </Button>
            <Button
              variant="primary"
              className="me-1"
              onClick={(e) => handleAddMotion(e)}
            >
              Assign
            </Button>
          </Modal.Footer>
        </Modal>
        {openCaseModalData && (
          <Modal show={caseModal} size="lg">
            <Modal.Header>
              {/* <Button onClick={closeCaseModal} className="btn-close" variant="">
                x
              </Button> */}
            </Modal.Header>

            <Modal.Body>
              <div>
                <Card>
                  <Card.Header>
                    <Card.Title as="h3">
                      {openCaseModalData.status === 2
                        ? "Reopen Case"
                        : "Close Case"}{" "}
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Col lg={12} md={12}>
                      <p>
                        Are you sure you want to{" "}
                        {openCaseModalData.status === 2
                          ? "Reopen Case"
                          : "Close Case"}
                        ?
                      </p>
                    </Col>
                  </Card.Body>
                </Card>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="warning"
                className="me-1"
                onClick={closeCaseModal}
              >
                Cancel
              </Button>

              <button
                className={`btn ${
                  openCaseModalData.status === 2
                    ? "btn-danger bright-btn btn-danger-bright"
                    : "btn-danger bright-btn btn-danger-bright"
                } mx-5`}
                onClick={
                  openCaseModalData.status === 2
                    ? () => handleReopenCaseClick(openCaseModalData.id)
                    : handleCloseCase
                }
              >
                {openCaseModalData.status === 2 ? `Reopen Case` : "Close Case"}
              </button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </>
  );
}
