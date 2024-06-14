//import { Link, Navigate } from "react-router-dom";
//import "react-data-table-component-extensions/dist/index.css";
//import DataTable from "react-data-table-component";
//import DataTableExtensions from "react-data-table-component-extensions";
//import { OverlayTrigger, Tooltip, Badge, FormSelect } from "react-bootstrap";
//import endpoint from "../../context/endpoint";
//import { Context } from "../../context/Context";
// import {
//   CForm,
//   CCol,
//   CFormLabel,
//   CFormFeedback,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CButton,
//   CFormCheck,
// } from "@coreui/react";
// import moment from "moment";
// import { Modal, FormGroup, Form } from "react-bootstrap";
// import { ErrorAlert, SuccessAlert } from "../../data/Toast/toast";
// import {
//   DropdownButton,
//   ButtonGroup,
//   Card,
//   Button,
//   Row,
//   Col,
//   InputGroup,
//   Dropdown,
// } from "react-bootstrap";
// import Loader from "../Loader/loader";
// import { useForm } from "react-hook-form";
//##################################################################################
import React, { useEffect, useState, useContext } from "react";
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
import { Context } from "../../context/Context";
import Loader from "../Loader/loader";
import { ErrorAlert, SuccessAlert } from "../../data/Toast/toast";
import { Link, useParams, useNavigate } from "react-router-dom";
import { trim } from "lodash";
//import * as CadreList from "../../../data/Title/Cadre";
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
//import * as UnitList from "../../../data/Units/Units";
// import * as CadreList from '../Cadre/Cadre';
// import Cadre from './Cadre/Cadre';
// import Cadre from './../Cadre/Cadre'

export default function PartiesData() {
  //   const { user, dispatch } = useContext(Context);
  //   const currentUser = user?.user;
  //   // console.log("user id", currentUser.id);
  //   const userID = currentUser.id;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showCadre, setCadreShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleCadreShow = () => setCadreShow(true);

  const [department, setDepartment] = useState("");
  const [data, setDepartments] = useState([]);
  const [units, setUnits] = useState([]);
  const [cadres, setCadre] = useState([]);
  const [name, setName] = useState("");
  const [names, setNames] = useState("");

  // const [cadres, setCadre] = useState({
  //   name: "",
  // });

  const [designation, setDesignationList] = useState([]);

  //create cadre
  const handleCreateCadre = async () => {
    await endpoint
      .post(`/cadre/create`, { name: trim(name) })
      .then((res) => {
        // console.log("cadre created", res);
        // setCadre({
        //   name: "",
        // });
        SuccessAlert(res.data.message);
        getCadreList();
        setCadreShow(false);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          ErrorAlert(error.response.data.description);
          // console.log("error:", error.response.data);
        }
      });
  };

  //get cadre list
  const getCadreList = async () => {
    await endpoint
      .get("/cadre/list")
      .then((res) => {
        // console.log("cadre list", res.data.data);
        setCadre(res.data.data);
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  const handleCreateDepartment = async () => {
    // console.log("data:", {
    //   name: trim(name),
    //   department: trim(department),
    //   created_by: userID,
    // });
    await endpoint
      .post("/unit/create", { name: trim(name), department: trim(department) })
      .then((res) => {
        // console.log("Unit created", res);
        SuccessAlert(res.data.message);
        getUnitList();
        setShow(false);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response) {
          ErrorAlert(error.response.data.description);
          // console.log("error:", error.response.data);
        }
      });
  };

  useEffect(() => {
    getUnitList();
    getDepartmentsList();
    getCadreList();
  }, []);
  //get department list
  const getUnitList = async () => {
    await endpoint
      .get("/unit/all")
      .then((res) => {
        // console.log(res.data.data);
        setUnits(res.data.data);
      })
      .catch((err) => {
        // console.log(err)
      });
  };
  const getDepartmentsList = async () => {
    await endpoint
      .get("/department/list")
      .then((res) => {
        // console.log(res.data.data);
        setDepartments(res.data.data);
      })
      .catch((err) => {
        // console.log(err)
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
                    APPELANTS
                  </Card.Title>
                </Col>

                <Col className="text-end">
                  <Button
                    className="btn"
                    type="submit"
                    variant="primary"
                    onClick={handleShow}
                    style={{ color: "#0A7E51", fontWeight: 900 }}
                  >
                    {" "}
                    <span className="fe fe-plus"></span>
                    Add Appelant
                  </Button>
                </Col>
              </Card.Header>
              <Card.Body>
                {/* <UnitList.Units units={units} /> */}
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead style={{ background: "#0A7E51" }}>
                      <tr>
                        <th style={{ color: "#fff", fontWeight: 900 }}>S/N</th>
                        <th style={{ color: "#fff", fontWeight: 900 }}>Name</th>
                        {/* <th style={{ color: "#fff", fontWeight: 900 }}>Created By</th> */}
                        <th style={{ color: "#fff", fontWeight: 900 }}>
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cadres.map((data, index) => (
                        <tr key={data.id}>
                          <td>{index + 1}</td>
                          <td>
                            {data.name == null ? "" : data.name.toUpperCase()}
                          </td>

                          <td>
                            <Link
                              to="#"
                              className="btn btn-secondary"
                              variant="secondary"
                              onClick={(e) => {
                                // handleShowEditModal();
                                // setCadreId(data);
                              }}
                            >
                              <span
                                className="fe fe-edit"
                                style={{ fontWeight: 900 }}
                              ></span>{" "}
                              Edit
                            </Link>{" "}
                            &nbsp; &nbsp;
                            <Link
                              to="#"
                              className="btn btn-danger"
                              variant="danger"
                              onClick={(e) => {
                                // handleShowDeleteModal();
                                // setCadreId(data);
                              }}
                            >
                              <span
                                className="fe fe-trash"
                                style={{ fontWeight: 900 }}
                              ></span>{" "}
                              Delete{" "}
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
                    RESPONDENT
                  </Card.Title>
                </Col>

                <Col className="text-end">
                  <Button
                    className="btn"
                    type="submit"
                    variant="primary"
                    onClick={handleCadreShow}
                    style={{ color: "#0A7E51", fontWeight: 900 }}
                  >
                    {" "}
                    <span className="fe fe-plus"></span>
                    Add Respondent
                  </Button>
                </Col>
              </Card.Header>
              <Card.Body>
                {/* <CadreList.Cadre cadres={cadres} /> */}
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead style={{ background: "#0A7E51" }}>
                      <tr>
                        <th style={{ color: "#fff", fontWeight: 900 }}>S/N</th>
                        <th style={{ color: "#fff", fontWeight: 900 }}>Name</th>
                        {/* <th style={{ color: "#fff", fontWeight: 900 }}>Created By</th> */}
                        <th style={{ color: "#fff", fontWeight: 900 }}>
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cadres.map((data, index) => (
                        <tr key={data.id}>
                          <td>{index + 1}</td>
                          <td>
                            {data.name == null ? "" : data.name.toUpperCase()}
                          </td>

                          <td>
                            <Link
                              to="#"
                              className="btn btn-secondary"
                              variant="secondary"
                              onClick={(e) => {
                                // handleShowEditModal();
                                // setCadreId(data);
                              }}
                            >
                              <span
                                className="fe fe-edit"
                                style={{ fontWeight: 900 }}
                              ></span>{" "}
                              Edit
                            </Link>{" "}
                            &nbsp; &nbsp;
                            <Link
                              to="#"
                              className="btn btn-danger"
                              variant="danger"
                              onClick={(e) => {
                                // handleShowDeleteModal();
                                // setCadreId(data);
                              }}
                            >
                              <span
                                className="fe fe-trash"
                                style={{ fontWeight: 900 }}
                              ></span>{" "}
                              Delete{" "}
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

        <Modal show={show}>
          <Modal.Header>
            <Button
              onClick={() => setShow(false)}
              className="btn-close"
              variant=""
            >
              x
            </Button>
          </Modal.Header>
          <CForm
            onSubmit={handleSubmit(handleCreateDepartment)}
            className="row g-3 needs-validation"
          >
            <Modal.Body>
              <div>
                <Card>
                  <Card.Header>
                    <Card.Title as="h3">Add Appellant</Card.Title>
                  </Card.Header>

                  <Card.Body>
                    {/* <Col lg={12} md={12}>
                      <FormGroup>
                        <label htmlFor="exampleInputname">Department</label>
                        <select
                          type="text"
                          name="department"
                          onChange={(e) => setDepartment(e.target.value)}
                          className="form-control"
                        >
                          <option value="">--Select Department--</option>
                          {data.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </FormGroup>
                    </Col> */}
                    <Col lg={12} md={12}>
                      <FormGroup>
                        <label htmlFor="exampleInputname">Name</label>
                        <Form.Control
                          type="text"
                          name="name"
                          onChange={(e) => setName(e.target.value)}
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
                variant="warning"
                className="me-1"
                onClick={() => setShow(false)}
              >
                Close
              </Button>
              <Button variant="primary" type="submit" className="me-1">
                {" "}
                <span className="fe fe-arrow-right"></span>
                Save
              </Button>
            </Modal.Footer>
          </CForm>
        </Modal>

        <Modal show={showCadre}>
          <Modal.Header>
            <Button
              onClick={() => setCadreShow(false)}
              className="btn-close"
              variant=""
            >
              x
            </Button>
          </Modal.Header>
          <CForm
            onSubmit={handleSubmit(handleCreateCadre)}
            className="row g-3 needs-validation"
          >
            <Modal.Body>
              <div>
                <Card>
                  <Card.Header>
                    <Card.Title as="h3">Add Respondent</Card.Title>
                  </Card.Header>

                  <Card.Body>
                    <Col lg={12} md={12}>
                      <FormGroup>
                        <label htmlFor="exampleInputname">Name</label>
                        <Form.Control
                          type="text"
                          name="name"
                          onChange={(e) => setName(e.target.value)}
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
                variant="warning"
                className="me-1"
                onClick={() => setCadreShow(false)}
              >
                Close
              </Button>
              <Button variant="primary" type="submit" className="me-1">
                {" "}
                <span className="fe fe-arrow-right"></span>
                Save
              </Button>
            </Modal.Footer>
          </CForm>
        </Modal>
      </div>
    </>
  );
}
