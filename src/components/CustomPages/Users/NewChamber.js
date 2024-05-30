import React, { useState, useEffect } from "react";
import { Breadcrumb, Col, Row, Card, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  CForm,
  CCol,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CButton,
} from "@coreui/react";
import endpoint from "../../../context/endpoint";
import { useForm } from "react-hook-form";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";

export default function CreateChamber() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    chamber_head: "",
    chamber_name: "",
    address: "",
    signature: null,
    phone: "",
    email: "",
    lawyer_name: [""],
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const params = useParams();

  const id = params?.id;

  const getSingleStaff = async () => {
    setLoading(true);
    await endpoint
      .get(`/solicitor/show/${id}`)
      .then((res) => {
        console.log("solicitor", res.data.data);
        setDetails(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (id) {
      getSingleStaff();
    }
  }, []);

  const handleCreateUser = async () => {
    setLoading(true);

    const data = new FormData();
    data.append("chamber_name", details.chamber_name);
    data.append("chamber_head", details.chamber_head);
    data.append("address", details.address);
    data.append("email", details.email);
    data.append("phone", details.phone);
    data.append("signature", details.signature);
    data.append("lawyer_name", JSON.stringify(details.lawyer_name));

    if (id) {
      await endpoint
        .put(`/solicitor/edit/${id}`, data)
        .then((res) => navigate(`${process.env.PUBLIC_URL}/chamber-list`))
        .catch((err) => {
          console.log(err);
          setLoading(false);
          ErrorAlert(err.response.data.description);
        });
    } else {
      await endpoint
        .post("/solicitor/create", data)
        .then((res) => navigate(`${process.env.PUBLIC_URL}/chamber-list`))
        .catch((err) => {
          setLoading(false);
          console.log(err);
          ErrorAlert(err.response.data.description);
        });
    }
  };

  const handleAddLawyer = () => {
    setDetails((prevState) => ({
      ...prevState,
      lawyer_name: [...prevState.lawyer_name, ""],
    }));
  };

  const handleRemoveLawyer = (index) => {
    setDetails((prevState) => ({
      ...prevState,
      lawyer_name: prevState.lawyer_name.filter((_, i) => i !== index),
    }));
  };

  const handleLawyerChange = (index, value) => {
    const newLawyerNames = [...details.lawyer_name];
    newLawyerNames[index] = value;
    setDetails((prevState) => ({ ...prevState, lawyer_name: newLawyerNames }));
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">New Chamber List</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Registry
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              New Chamber List
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link
            to={`${process.env.PUBLIC_URL}/chamber-list/`}
            className="btn btn-primary btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-eye"></i>&nbsp;
            </span>
            View Chamber List
          </Link>
        </div>
      </div>

      <Row>
        <Col md={12} lg={12}>
          <Card>
            <Card.Header>
              <Col className="card-title text-center">
                <span> Enter Chamber Credentials </span>
                <span className="fe fe-user"></span>
              </Col>
            </Card.Header>

            <Card.Body>
              <CForm
                onSubmit={handleSubmit(handleCreateUser)}
                className="row g-3 needs-validation"
              >
                <CCol md={6}>
                  <CFormLabel htmlFor="chamberName">Chamber's Name</CFormLabel>
                  <CFormInput
                    id="chamberName"
                    defaultValue={details.chamber_name}
                    onChange={(e) =>
                      setDetails({ ...details, chamber_name: e.target.value })
                    }
                    type="text"
                    name="chamberName"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="chamberHead">Chamber's Head</CFormLabel>
                  <CFormInput
                    id="chamberHead"
                    defaultValue={details.chamber_head}
                    onChange={(e) =>
                      setDetails({ ...details, chamber_head: e.target.value })
                    }
                    type="text"
                    name="chamberHead"
                  />
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="email">Email</CFormLabel>
                  <CFormInput
                    id="email"
                    defaultValue={details.email}
                    onChange={(e) =>
                      setDetails({ ...details, email: e.target.value })
                    }
                    type="email"
                    name="email"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="phone">Phone No.</CFormLabel>
                  <CFormInput
                    id="phone"
                    defaultValue={details.phone}
                    onChange={(e) =>
                      setDetails({ ...details, phone: e.target.value })
                    }
                    type="text"
                    name="phone"
                  />
                </CCol>

                <CCol md={12}>
                  <CFormLabel htmlFor="address">Address</CFormLabel>
                  <CFormTextarea
                    id="address"
                    defaultValue={details.address}
                    onChange={(e) =>
                      setDetails({ ...details, address: e.target.value })
                    }
                    name="address"
                  />
                </CCol>

                <CCol md={12}>
                  <CFormLabel>Lawyers</CFormLabel>
                  {details.lawyer_name.map((name, index) => (
                    <div key={index} className="mb-3">
                      <Row>
                        <Col md={12}>
                          <CFormInput
                            placeholder="Lawyer's Name"
                            value={name}
                            onChange={(e) =>
                              handleLawyerChange(index, e.target.value)
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col md={12} className="d-flex justify-content-center">
                          <CButton
                            color="danger"
                            style={{
                              fontSize: 10,
                              padding: "2px 6px",
                              maxWidth: 52,
                              minWidth: 52,
                            }}
                            onClick={() => handleRemoveLawyer(index)}
                            className="me-2"
                          >
                            Remove
                          </CButton>
                          {index === details.lawyer_name.length - 1 && (
                            <CButton
                              color="primary"
                              style={{
                                fontSize: 10,
                                padding: "2px 6px",
                                maxWidth: 52,
                                minWidth: 52,
                              }}
                              onClick={handleAddLawyer}
                            >
                              ADD
                            </CButton>
                          )}
                        </Col>
                      </Row>
                    </div>
                  ))}
                </CCol>

                <CCol xs={12} className="text-center">
                  <CButton color="primary" type="submit">
                    <span className="fe fe-plus"></span>
                    {isLoading ? "Saving data..." : "Save"}
                  </CButton>
                </CCol>
              </CForm>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
