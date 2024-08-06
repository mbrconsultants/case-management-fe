import React, { useState, useEffect } from "react";
import { Breadcrumb, Col, Row, Card } from "react-bootstrap";
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
import { ErrorAlert } from "../../../data/Toast/toast";

export default function CreateChamber() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [details, setDetails] = useState({
    chamber_head: "",
    chamber_name: "",
    address: "",
    signature: null,
    phone: "",
    phone_2: "",
    email: "",
    email_2: "",
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
    try {
      const res = await endpoint.get(`/solicitor/show/${id}`);
      const data = res.data.data;
      setDetails({
        ...data,
        lawyer_name: Array.isArray(data.lawyer_name) ? data.lawyer_name : [],
        lawyer_phone: Array.isArray(data.lawyer_phone) ? data.lawyer_phone : [],
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  
  

  useEffect(() => {
    if (id) {
      getSingleStaff();
    }
  }, [id]);

  const handleCreateUser = async () => {
    const data = new FormData();
    data.append("chamber_name", details.chamber_name);
    data.append("chamber_head", details.chamber_head);
    data.append("address", details.address);
    data.append("email", details.email);
    data.append("email_2", details.email_2);
    data.append("phone", details.phone);
    data.append("phone_2", details.phone_2);
    data.append("signature", details.signature);
    data.append("lawyer_name", JSON.stringify(Array.isArray(details.lawyer_name) ? details.lawyer_name : []));
    data.append("lawyer_phone", JSON.stringify(Array.isArray(details.lawyer_phone) ? details.lawyer_phone : []));
  
    try {
      if (id) {
        await endpoint.put(`/solicitor/edit/${id}`, data);
      } else {
        await endpoint.post("/solicitor/create", data);
      }
      navigate(`${process.env.PUBLIC_URL}/chamber-list`);
    } catch (err) {
      setLoading(false);
      ErrorAlert(err.response?.data?.description);
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
                  <CFormLabel htmlFor="chamberName">
                    Chamber's Name
                    <span style={{color: 'red', fontSize: '20px'}}>*</span>
                  </CFormLabel>
                  <CFormInput
                    id="chamberName" required
                    style={{ border: "1px solid #000", padding: "10px" }}
                    value={details.chamber_name}
                    onChange={(e) =>
                      setDetails({ ...details, chamber_name: e.target.value })
                    }
                    type="text"
                    name="chamberName"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="chamberHead">
                    Head of Chamber
                    <span style={{color: 'red', fontSize: '20px'}}>*</span>
                    </CFormLabel>
                  <CFormInput
                    id="chamberHead" required
                    style={{ border: "1px solid #000", padding: "10px" }}
                    value={details.chamber_head}
                    onChange={(e) =>
                      setDetails({ ...details, chamber_head: e.target.value })
                    }
                    type="text"
                    name="chamberHead"
                  />
                </CCol>
  
                <CCol md={6}>
                  <CFormLabel htmlFor="email">
                    Email
                    <span style={{color: 'red', fontSize: '20px'}}>*</span>
                  </CFormLabel>
                  <CFormInput
                    id="email" required
                    style={{ border: "1px solid #000", padding: "10px" }}
                    value={details.email}
                    onChange={(e) =>
                      setDetails({ ...details, email: e.target.value })
                    }
                    type="email"
                    name="email"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="email">
                    Alternative Email
                    <span style={{color: 'red', fontSize: '20px'}}></span>
                  </CFormLabel>
                  <CFormInput
                    id="email2"
                    style={{ border: "1px solid #000", padding: "10px" }}
                    value={details.email_2}
                    onChange={(e) =>
                      setDetails({ ...details, email_2: e.target.value })
                    }
                    type="email"
                    name="email_2"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="phone">
                    Phone Number
                    <span style={{color: 'red', fontSize: '20px'}}>*</span>
                  </CFormLabel>
                  <CFormInput
                    id="phone" required
                    style={{ border: "1px solid #000", padding: "10px" }}
                    value={details.phone}
                    onChange={(e) =>
                      setDetails({ ...details, phone: e.target.value })
                    }
                    type="text"
                    name="phone"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="phone">
                    Alternative Phone Number
                    <span style={{color: 'red', fontSize: '20px'}}></span>
                  </CFormLabel>
                  <CFormInput
                    id="phone2"
                    style={{ border: "1px solid #000", padding: "10px" }}
                    value={details.phone_2}
                    onChange={(e) =>
                      setDetails({ ...details, phone_2: e.target.value })
                    }
                    type="text"
                    name="phone2"
                  />
                </CCol>
  
                <CCol md={12}>
                  <CFormLabel htmlFor="address">
                    Address
                    <span style={{color: 'red', fontSize: '20px'}}>*</span>
                  </CFormLabel>
                  <CFormTextarea
                    id="address" required
                    style={{ border: "1px solid #000", padding: "10px" }}
                    value={details.address}
                    onChange={(e) =>
                      setDetails({ ...details, address: e.target.value })
                    }
                    name="address"
                  />
                </CCol>
                <Card.Header>
                  <Col className="card-title text-center">
                    <span> Create Counsel </span>
                    <span className="fe fe-user"></span>
                  </Col>
                </Card.Header>
                <CCol md={12}>
                  {Array.isArray(details.lawyer_name) && details.lawyer_name.map((name, index) => (
                    <React.Fragment key={index}>
                      <Row className="mb-3">
                        <Col md={6}>
                          <CFormLabel>Counsel in Chamber</CFormLabel>
                          <CFormInput
                            style={{ border: "1px solid #000", padding: "10px" }}
                            value={name}
                            onChange={(e) =>
                              handleLawyerChange(index, e.target.value, "lawyer_name")
                            }
                          />
                        </Col>
                        <Col md={6}>
                          <CFormLabel>Counsel's Phone Number</CFormLabel>
                          <CFormInput
                            style={{ border: "1px solid #000", padding: "10px" }}
                            value={details.lawyer_phone[index]}
                            onChange={(e) =>
                              handleLawyerChange(index, e.target.value, "lawyer_phone")
                            }
                          />
                        </Col>
                      </Row>
                      <Row className="mb-3">
                        <Col md={12} className="d-flex justify-content-start">
                          <CButton
                            color="danger"
                            onClick={() => handleRemoveLawyer(index)}
                            className="btn btn-sm me-2"
                          >
                            Remove
                          </CButton>
                          <CButton
                            color="primary"
                            onClick={handleAddLawyer}
                            className="btn btn-sm me-2"
                          >
                            Add
                          </CButton>
                        </Col>
                      </Row>
                    </React.Fragment>
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
