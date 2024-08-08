import React, { useEffect, useState } from "react";
import * as formelement from "../../../data/Form/formelement/formelement";
import MultiSelect from "react-multiple-select-dropdown-lite";
import * as editprofile from "../../../data/Pages/editprofile/editprofile";
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
import endpoint from "../../../context/endpoint";
import Loader from "../../../data/Loader/loader";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";
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
import * as CourtList from "../../../data/Court/Court";

export default function Courts() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [data, setCourts] = useState([]);

  // const [divisionList, setDivisionList] = useState([]);

  const [stateList, setStateList] = useState([]);

  const [name, setName] = useState("");
  // const [division, setDivision] = useState(null);
  const [state, setState] = useState(null);

  const handleCreateCourt = async () => {
    await endpoint
      .post("/court/create", {
        name: trim(name),
        state_id: state,
        // division_id: division,
      })
      .then((res) => {
        SuccessAlert(res.data.message);
        setShow(false);
        getCourts();
      })
      .catch((error) => {
        if (error.response) {
          ErrorAlert(error.response.data.description);
        }
      });
  };

  useEffect(() => {
    // getDivisionList();
    getStateList();
    setCourts();
    getCourts();
  }, []);

  const getCourts = async () => {
    await endpoint
      .get(`/court/list`)
      .then(async (res) => {
        setCourts(res.data.data);
      })
      .catch((err) => {});
  };

  // const getDivisionList = async () => {
  //   setLoading(true);
  //   await endpoint
  //     .get("/division/list")
  //     .then((res) => {
  //       //  console.log("roles", res.data.data) /division/list
  //       setDivisionList(res.data.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       // console.log(err)
  //     });
  // };

  const getStateList = async () => {
    setLoading(true);
    await endpoint
      .get("/state/list")
      .then((res) => {
        // console.log("state", res.data.data);
        setStateList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
      });
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Court List</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              All
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Court
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <Row>
        <Col lg={12} xl={12} md={12} sm={12}>
          <Card>
            <Card.Header>
              <Col className="text-beginning">
                <Card.Title
                  as="h3"
                  style={{ color: "#0A7E51", fontWeight: 900 }}
                >
                  COURT LIST
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
                  Add Court
                </Button>
              </Col>
            </Card.Header>
            <Card.Body>
              <CourtList.Court Court={data} />
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
          onSubmit={handleSubmit(handleCreateCourt)}
          className="row g-3 needs-validation"
        >
          <Modal.Body>
            <div>
              <Card>
                <Card.Header>
                  <Card.Title as="h3">Add Court</Card.Title>
                </Card.Header>

                <Card.Body>
                  <Col lg={12} md={12}>
                    <FormGroup>
                      <label htmlFor="exampleInputname">State</label>
                      <select
                        type="text"
                        name="state"
                        {...register("state")}
                        onChange={(e) => setState(e.target.value)}
                        className="form-control"
                      >
                        <option value=""> --Select State-- </option>
                        {stateList.map((state) => (
                          <option key={state.id} value={state.id}>
                            {state.state}
                          </option>
                        ))}
                      </select>
                    </FormGroup>
                  </Col>

                  <br />

                  <Col lg={12} md={12}>
                    <FormGroup>
                      <label htmlFor="exampleInputname">Court Name</label>
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
              variant="dark"
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
    </div>
  );
}
