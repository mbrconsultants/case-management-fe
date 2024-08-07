import React, { useState, useEffect } from "react";
import { Breadcrumb, Col, Row, Card, FormGroup, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CForm, CCol, CFormLabel, CFormInput, CButton } from "@coreui/react";
import endpoint from "../../../context/endpoint";
import { useForm } from "react-hook-form";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";
import Loader from "../../../data/Loader/loader";
import "./selectStyle.css";

export default function CreateStaff() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [titleList, setTitleList] = useState([]);
  const [url, setUrl] = useState();
  const [details, setDetails] = useState({
    surname: "",
    first_name: "",
    middle_name: "",
    title_id: "",
    designation: "",
    phone: "",
    phone_2: "",
    email: "",
    email_2: "",
    signature: null,
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const params = useParams();
  const id = params?.id;

  // Get single staff
  const getSingleStaff = async () => {
    setLoading(true);
    await endpoint
      .get(`/legal-officer/show/${id}`)
      .then((res) => {
        const data = res.data.data;
        setDetails({
          ...data,
          signature: data.signature || null
        });
        setUrl(data.signature); // Save the current signature URL
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  // Get title list
  const getTitleList = async () => {
    setLoading(true);
    await endpoint
      .get("/title/list")
      .then((res) => {
        setTitleList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getTitleList();
    if (id) {
      getSingleStaff();
    }
  }, []);

  const handleCreateUser = async () => {
    setLoading(true);

    const data = new FormData();
    data.append("title_id", details.title_id);
    data.append("first_name", details.first_name);
    data.append("middle_name", details.middle_name);
    data.append("surname", details.surname);
    data.append("designation", details.designation);
    data.append("email", details.email);
    data.append("email_2", details.email_2);
    data.append("phone", details.phone);
    data.append("phone_2", details.phone_2);

    if (details.signature && details.signature instanceof File) {
      data.append("signature", details.signature);
    } else {
      data.append("signature_url", details.signature);
    }

    if (id) {
      await endpoint
        .put(`/legal-officer/edit/${id}`, data)
        .then((res) => navigate(`${process.env.PUBLIC_URL}/legal-officer-list`))
        .catch((err) => {
          setLoading(false);
          ErrorAlert(err.response.data.description);
        });
    } else {
      await endpoint
        .post("/legal-officer/create", data)
        .then((res) => navigate(`${process.env.PUBLIC_URL}/legal-officer-list`))
        .catch((err) => {
          setLoading(false);
          ErrorAlert(err.response.data.description);
        });
    }
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">New Legal officer</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Registry
            </Breadcrumb.Item>
            <Breadcrumb.Item className="breadcrumb-item active breadcrumds" aria-current="page">
              New Legal officer
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link
            to={`${process.env.PUBLIC_URL}/legal-officer-list/`}
            className="btn btn-primary btn-icon text-white me-3">
            <span>
              <i className="fe fe-eye"></i>&nbsp;
            </span>
            View Legal officer
          </Link>
        </div>
      </div>

      <Row>
        <Col md={12} lg={12}>
          <Card>
            <Card.Header>
              <Col className="card-title text-center">
                <span> Enter Legal officer Credentials </span>
                <span className="fe fe-user"></span>
              </Col>
            </Card.Header>

            <Card.Body>
              <CForm onSubmit={handleSubmit(handleCreateUser)} className="row g-3 needs-validation">
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustomUsername">
                    Title
                    <span style={{ fontSize: "20px" }}></span>
                  </CFormLabel>
                  <select
                    value={details.title_id}
                    className="form-control custom-select"
                    style={{ border: "1px solid #000", padding: "10px" }}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        title_id: e.target.value,
                      })
                    }>
                    <option value=""> --Select title-- </option>
                    {titleList.map((title) => (
                      <option key={title.id} value={title.id}>
                        {title.name}
                      </option>
                    ))}
                  </select>
                  {errors.r?.type === "required" && (
                    <span className="text-danger"> Title required </span>
                  )}
                </CCol>

                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">
                    Surname
                    <span style={{ fontSize: "20px" }}></span>
                  </CFormLabel>
                  <CFormInput
                    defaultValue={details.surname}
                    style={{ border: "1px solid #000", padding: "10px" }}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        surname: e.target.value,
                      })
                    }
                    type="text"
                    name="surname"
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom01">
                    Firstname
                    <span style={{ fontSize: "20px" }}></span>
                  </CFormLabel>
                  <CFormInput
                    defaultValue={details.first_name}
                    style={{ border: "1px solid #000", padding: "10px" }}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        first_name: e.target.value,
                      })
                    }
                    type="text"
                    id="validationCustom01"
                    name="first_name"
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom01">
                    OtherName
                    <span style={{ fontSize: "20px" }}></span>
                  </CFormLabel>
                  <CFormInput
                    defaultValue={details.middle_name}
                    style={{ border: "1px solid #000", padding: "10px" }}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        middle_name: e.target.value,
                      })
                    }
                    type="text"
                    name="middle_name"
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom01">
                    Designation
                    <span style={{ fontSize: "20px" }}></span>
                  </CFormLabel>
                  <CFormInput
                    defaultValue={details.designation}
                    style={{ border: "1px solid #000", padding: "10px" }}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        designation: e.target.value,
                      })
                    }
                    type="text"
                    id="validationCustom01"
                    name="designation"
                  />
                </CCol>
                <Col md={4}>
                  <FormGroup>
                    <label htmlFor="exampleInputname1">
                      Email address
                    <span style={{ fontSize: "20px"}}></span>
                    </label>
                    <Form.Control
                      type="email"
                      // className="form-control"
                      defaultValue={details.email}
                      style={{ border: "1px solid #000", padding: "10px" }}
                      onChange={(e) =>
                        setDetails({
                          ...details,
                          email: e.target.value,
                        })
                      }
                      name="email"
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <label htmlFor="exampleInputname1">
                      Alternative Email address
                    <span style={{ fontSize: "20px" }}></span>
                    </label>
                    <Form.Control
                      type="email"
                      className="form-control"
                      defaultValue={details.email_2}
                      style={{ border: "1px solid #000", padding: "10px" }}
                      onChange={(e) =>
                        setDetails({
                          ...details,
                          email_2: e.target.value,
                        })
                      }
                      name="email_2"
                    />
                  </FormGroup>
                </Col>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom01">
                    Phone Number
                    <span style={{ fontSize: "20px" }}></span>
                  </CFormLabel>
                  <CFormInput
                    defaultValue={details.phone}
                    style={{ border: "1px solid #000", padding: "10px" }}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        phone: e.target.value,
                      })
                    }
                    type="text"
                    name="phone"
                  />
                  {errors.phoneNo?.type === "matchPattern" && (
                    <span className="text-danger">Enter valid phone number</span>
                  )}
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom01">
                    Alternative Phone Number
                    <span style={{ fontSize: "20px" }}></span>
                  </CFormLabel>
                  <CFormInput
                    defaultValue={details.phone_2}
                    style={{ border: "1px solid #000", padding: "10px" }}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        phone_2: e.target.value,
                      })
                    }
                    type="text"
                    name="phone_2"
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">
                    Signature
                    <span style={{ fontSize: "20px" }}></span>
                  </CFormLabel>
                  <Form.Control
                    type="file"
                    className="form-control"
                    style={{ border: "1px solid #000", padding: "10px" }}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setDetails({
                        ...details,
                        signature: file,
                      });
                    }}
                    name="signature"
                    accept=".jpg, .jpeg, .png"
                  />
                </CCol>
                <CCol md={4}>
                  {url && !details.signature && (
                    <img
                      src={`${process.env.REACT_APP_UPLOAD_URL}${url}`}
                      alt="Signature"
                      crossOrigin="anonymous"
                      style={{ maxWidth: '150px', height: 'auto' }}
                    />
                  )}
                  {details.signature && (
                    <img
                      src={details.signature instanceof Blob ? URL.createObjectURL(details.signature) : `${process.env.REACT_APP_UPLOAD_URL}${details.signature}`}
                      alt="Signature"
                      crossOrigin="anonymous"
                      style={{ maxWidth: '150px', height: 'auto' }}
                    />
                  )}
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
