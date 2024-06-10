import React, { useState, useContext, useEffect } from "react";
import { Breadcrumb, Col, Row, Card, FormGroup, Button } from "react-bootstrap";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";
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
import * as formvalidation from "../../../data/Form/formvalidations/formvalidations";
import endpoint from "../../../context/endpoint";
import { useForm } from "react-hook-form";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";

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
    email: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const params = useParams();

  const id = params?.id;

  //get single staff
  const getSingleStaff = async () => {
    setLoading(true);
    await endpoint
      .get(`/legal-officer/show/${id}`)
      .then((res) => {
        console.log("staff", res.data.data);
        setDetails(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
      });
  };


  //get title list
  const getTitletList = async () => {
    setLoading(true);
    await endpoint
      .get("/title/list")
      .then((res) => {
        //  console.log("roles", res.data.data)
        setTitleList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
      });
  };

  useEffect(() => {
    getTitletList();
    if (id) {
      getSingleStaff();
    }
  }, []);

  const handleCreateUser = async () => {
    // e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("title_id", details.title_id);
    data.append("first_name", details.first_name);
    data.append("middle_name", details.middle_name);
    data.append("surname", details.surname);
    data.append("gender", details.gender);
    data.append("designation", details.designation);
    data.append("email", details.email);
    data.append("phone", details.phone);
    if (id) {
      await endpoint
        .put(`/legal-officer/edit/${id}`, data)
        .then((res) => navigate(`${process.env.PUBLIC_URL}/staff-list`))
        .catch((err) => {
          console.log(err);
          setLoading(false);
          ErrorAlert(err.response.data.description);
        });
    } else {
      await endpoint
        .post("/legal-officer/create", data)
        .then((res) => navigate(`${process.env.PUBLIC_URL}/staff-list`))
        .catch((err) => {
          setLoading(false);
          console.log(err);
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
            <Breadcrumb.Item
              className="breadcrumb-item"
              href="#">
              Registry
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page">
              New Legal officer
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link
            to={`${process.env.PUBLIC_URL}/staff-list/`}
            className="btn btn-primary btn-icon text-white me-3">
            <span>
              <i className="fe fe-eye"></i>&nbsp;
            </span>
            View Legal officer
          </Link>
        </div>
      </div>

      <Row>
        <Col
          md={12}
          lg={12}>
          <Card>
            <Card.Header>
              <Col className="card-title text-center">
                <span> Enter Legal officer Credentials </span>
                <span className="fe fe-user"></span>
              </Col>
            </Card.Header>

            <Card.Body>
              {/* <formvalidation.CustomValidation /> */}
              <CForm
                onSubmit={handleSubmit(handleCreateUser)}
                className="row g-3 needs-validation">
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustomUsername">
                    Title
                  </CFormLabel>

                  <select
                    defaultValue={details.title_id}
                    className="form-control"
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        title_id: e.target.value,
                      })
                    }>
                    <option value=""> --Select title-- </option>
                    {titleList.map((title) => (
                      <option
                        key={title.id}
                        value={title.id}
                        selected={title.id === details.title_id}>
                        {title.name}
                      </option>
                    ))}
                  </select>

                  {errors.r?.type === "required" && (
                    <span className="text-danger"> Title required </span>
                  )}
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">surname</CFormLabel>
                  <CFormInput
                    defaultValue={details.surname}
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
                  </CFormLabel>
                  <CFormInput
                    defaultValue={details.first_name}
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
                  {/* <CFormFeedback valid>Looks good!</CFormFeedback> */}
                </CCol>

                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">
                    OtherName
                  </CFormLabel>
                  <CFormInput
                    defaultValue={details.middle_name}
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
                  </CFormLabel>
                  <CFormInput
                    defaultValue={details.designation}
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
                  {/* <CFormFeedback valid>Looks good!</CFormFeedback> */}
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustomUsername">
                    Email
                  </CFormLabel>
                  <CInputGroup className="has-validation">
                    {/* <CInputGroupText id="inputGroupPrepend">@</CInputGroupText> */}
                    <CFormInput
                      defaultValue={details.email}
                      onChange={(e) =>
                        setDetails({
                          ...details,
                          email: e.target.value,
                        })
                      }
                      type="email"
                      aria-describedby="inputGroupPrepend"
                      name="email"
                    />
                  </CInputGroup>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">
                    Phone No.
                  </CFormLabel>
                  <CFormInput
                    defaultValue={details.phone}
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
                    <span className="text-danger">
                      {" "}
                      <em>Phone No. is Incorrect</em>{" "}
                    </span>
                  )}
                </CCol>
                {/* <CCol md={4}>
                  <CFormLabel htmlFor="validationCustomUsername">
                    Court
                  </CFormLabel>

                  <select
                    defaultValue={details.court_id}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        court_id: e.target.value,
                      })
                    }
                    className="form-control">
                    <option value=""> --Select Court-- </option>
                    {courtList.map((court, index) => (
                      <option
                        value={court.id}
                        selected={court.id === details.court_id}>
                        {" "}
                        {court.name}
                      </option>
                    ))}
                  </select>

                  {errors.r?.type === "required" && (
                    <span className="text-danger"> Court is required </span>
                  )}
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustomUsername">
                    States
                  </CFormLabel>
                  <select
                    defaultValue={details.state_id}
                    onChange={(e) => {
                      const selectedStateId = e.target.value;
                      setDetails((prevDetails) => ({
                        ...prevDetails,
                        state_id: selectedStateId,
                      }));
                      getLGAstList(selectedStateId);
                    }}
                    className="form-control">
                    <option value=""> --Select state-- </option>
                    {statesList.map((state) => (
                      <option
                        selected={state.id === details.state_id}
                        key={state.id}
                        value={state.id}>
                        {state.state}
                      </option>
                    ))}
                  </select>

                  {errors.r?.type === "required" && (
                    <span className="text-danger"> State required </span>
                  )}
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustomUsername">
                    LGA
                  </CFormLabel>

                  <select
                    value={details.lga_id || ""}
                    onChange={(e) => {
                      setDetails({
                        ...details,
                        lga_id: e.target.value,
                      });
                    }}
                    className="form-control">
                    <option value=""> --Select lga-- </option>
                    {id && (
                      <option
                        selected
                        key={details.id}
                        value={details.Lga ? details.Lga.id : ""}>
                        {details.Lga ? details.Lga.name : ""}
                      </option>
                    )}
                    {lgasList.map((lga) => (
                      <option
                        key={lga.id}
                        value={lga.id}>
                        {lga.name}
                      </option>
                    ))}
                  </select>

                  {errors.r?.type === "required" && (
                    <span className="text-danger"> Lga required </span>
                  )}
                </CCol>
                <CCol
                  xs={6}
                  className="text-center">
                  <SignatureCanvas
                    ref={(data) => setSign(data)}
                    onEnd={() =>
                      setUrl(sign.getTrimmedCanvas().toDataURL("image/png"))
                    }
                    canvasProps={{
                      width: 500,
                      height: 120,
                      className: "sigCanvas",
                    }}
                  />
                </CCol>
                {id && (
                  <CCol
                    xs={6}
                    className="text-center">
                    <label>Old Signature</label>
                    <br></br>
                    <img
                      src={details.signature}
                      crossOrigin="anonymous"
                      alt="Old Signatory..."
                    />
                  </CCol>
                )}
                <CCol xs={12}>
                  <button
                    className="btn btn-xs btn-warning justify-end"
                    onClick={(e) => handleClear(e)}>
                    Clear Signature field
                  </button>
                </CCol> */}
                <CCol
                  xs={12}
                  className="text-center">
                  <CButton
                    color="primary"
                    type="submit">
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
