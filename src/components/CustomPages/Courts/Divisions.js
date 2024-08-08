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
import * as DivisionList from "../../../data/Court/Division";

export default function Divisions() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const [data, setDivisions] = useState([]);

  const [CourtList, setCourtList] = useState([]);
  const [court, setCourt] = useState(null);

  const [division, setDivision] = useState("");

  const handleCreateDivision = async () => {
    await endpoint
      .post("/division/create", {
        division: trim(division),
        court_id: court,
      })
      .then((res) => {
        SuccessAlert(res.data.message);
        setShow(false);
        getDivisions();
      })
      .catch((error) => {
        if (error.response) {
          ErrorAlert(error.response.data.description);
        }
      });
  };

  useEffect(() => {
    getCourtList();
    setDivisions();
    getDivisions();
  }, []);

  const getDivisions = async () => {
    await endpoint
      .get(`/division/list`)
      .then(async (res) => {
        setDivisions(res.data.data);
      })
      .catch((err) => {});
  };

  const getCourtList = async () => {
    setLoading(true);
    await endpoint
      .get("/court/list")
      .then((res) => {
        // console.log("state", res.data.data);
        setCourtList(res.data.data);
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
          <h1 className="page-title">Division List</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              All
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Division
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
                  Division LIST
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
                  Add Division
                </Button>
              </Col>
            </Card.Header>
            <Card.Body>
              <DivisionList.Division Division={data} />
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
          onSubmit={handleSubmit(handleCreateDivision)}
          className="row g-3 needs-validation"
        >
          <Modal.Body>
            <div>
              <Card>
                <Card.Header>
                  <Card.Title as="h3">Add Division</Card.Title>
                </Card.Header>

                <Card.Body>
                  <Col lg={12} md={12}>
                    <FormGroup>
                      <label htmlFor="exampleInputname">Court</label>
                      <select
                        type="text"
                        name="court"
                        {...register("court")}
                        onChange={(e) => setCourt(e.target.value)}
                        className="form-control"
                      >
                        <option value=""> --Select Court-- </option>
                        {CourtList.map((court) => (
                          <option key={court.id} value={court.id}>
                            {court.name}
                          </option>
                        ))}
                      </select>
                    </FormGroup>
                  </Col>

                  <br />

                  <Col lg={12} md={12}>
                    <FormGroup>
                      <label htmlFor="exampleInputname">Division Name</label>
                      <Form.Control
                        type="text"
                        name="name"
                        onChange={(e) => setDivision(e.target.value)}
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
