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
    phone2: "",
    email: "",
    email2: "",
    lawyer_name: [""],
    lawyer_phone: [""]
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
    // setLoading(true;

    const data = new FormData();
    data.append("chamber_name", details.chamber_name);
    data.append("chamber_head", details.chamber_head);
    data.append("address", details.address);
    data.append("email", details.email);
    data.append("email2", details.email2);
    data.append("phone", details.phone);
    data.append("phone2", details.phone2);
    data.append("signature", details.signature);
    data.append("lawyer_name", JSON.stringify(details.lawyer_name));
    data.append("lawyer_phone", JSON.stringify(details.lawyer_phone));

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
      lawyer_phone: [...prevState.lawyer_phone, ""],
    }));
  };

  const handleRemoveLawyer = (index) => {
    setDetails((prevState) => ({
      ...prevState,
      lawyer_name: prevState.lawyer_name.filter((_, i) => i !== index),
      lawyer_phone: prevState.lawyer_phone.filter((_, i) => i !== index),
    }));
  };

  const handleLawyerChange = (index, value, field) => {
    const newLawyerDetails = [...details[field]];
    newLawyerDetails[index] = value;
    setDetails((prevState) => ({ ...prevState, [field]: newLawyerDetails }));
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
                    value={details.chamber_name}
                    onChange={(e) =>
                      setDetails({ ...details, chamber_name: e.target.value })
                    }
                    type="text"
                    name="chamberName"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="chamberHead">Head of Chamber</CFormLabel>
                  <CFormInput
                    id="chamberHead"
                    value={details.chamber_head}
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
                    value={details.email}
                    onChange={(e) =>
                      setDetails({ ...details, email: e.target.value })
                    }
                    type="email"
                    name="email"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="email">Alternative Email</CFormLabel>
                  <CFormInput
                    id="email2"
                    value={details.email2}
                    onChange={(e) =>
                      setDetails({ ...details, email2: e.target.value })
                    }
                    type="email"
                    name="email2"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="phone">Phone Number</CFormLabel>
                  <CFormInput
                    id="phone"
                    value={details.phone}
                    onChange={(e) =>
                      setDetails({ ...details, phone: e.target.value })
                    }
                    type="text"
                    name="phone"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="phone">Alternative Phone Number</CFormLabel>
                  <CFormInput
                    id="phone2"
                    value={details.phone2}
                    onChange={(e) =>
                      setDetails({ ...details, phone2: e.target.value })
                    }
                    type="text"
                    name="phone2"
                  />
                </CCol>

                <CCol md={12}>
                  <CFormLabel htmlFor="address">Address</CFormLabel>
                  <CFormTextarea
                    id="address"
                    value={details.address}
                    onChange={(e) =>
                      setDetails({ ...details, address: e.target.value })
                    }
                    name="address"
                  />
                </CCol>

                <CCol md={12}>
                  {details.lawyer_name.map((name, index) => (
                    <Row key={index} className="mb-3 align-items-center">
                      <Col md={4}>
                        <CFormLabel>Counsel in Chamber</CFormLabel>
                        <CFormInput
                          value={name}
                          onChange={(e) =>
                            handleLawyerChange(index, e.target.value, "lawyer_name")
                          }
                        />
                      </Col>
                      <Col md={4}>
                        <CFormLabel>Counsel's Phone Number</CFormLabel>
                        <CFormInput
                          value={details.lawyer_phone[index]}
                          onChange={(e) =>
                            handleLawyerChange(index, e.target.value, "lawyer_phone")
                          }
                        />
                      </Col>
                      <Col md={4} className="d-flex justify-content-center mt-4 mt-md-0">
                        <CButton
                          color="danger"
                          style={{
                            fontSize: 14,
                            padding: "4px 12px",
                            maxWidth: 70,
                            minWidth: 70,
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
                              fontSize: 14,
                              padding: "4px 12px",
                              maxWidth: 70,
                              minWidth: 70,
                            }}
                            onClick={handleAddLawyer}
                          >
                            Add
                          </CButton>
                        )}
                      </Col>
                    </Row>
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
