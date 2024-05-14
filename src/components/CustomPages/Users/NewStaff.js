import React, { useState, useContext, useEffect } from "react";
import { Breadcrumb, Col, Row, Card, FormGroup, Button } from "react-bootstrap";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { Link, useNavigate } from "react-router-dom";
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

export default function CreateStaff() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [courtList, setCourtList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [lgasList, setLgasList] = useState([]);
  const [titleList, setTitleList] = useState([]);
  const [details, setDetails] = useState({
    surname: "",
    first_name: "",
    middle_name: "",
    title_id: "",
    court_id: "",
    state_id: "",
    lga_id: "",
    signature: null,
    phone: "",
    email: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //get court list
  const getCourtList = async () => {
    setLoading(true);
    await endpoint
      .get("/court/list")
      .then((res) => {
        //  console.log("roles", res.data.data)
        setCourtList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
      });
  };

  //get states list
  const getStatestList = async () => {
    setLoading(true);
    await endpoint
      .get("/state/list")
      .then((res) => {
        //  console.log("roles", res.data.data)
        setStatesList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
      });
  };

  //get states list
  const getLGAstList = async (id) => {
    setLoading(true);
    await endpoint
      .get("/state/list")
      .then((res) => {
        //  console.log("roles", res.data.data)
        setLgasList(res.data.data);
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
    getCourtList();
    getStatestList();
    getTitletList();
  }, []);

  const handleCreateUser = async (data) => {
    // console.log(data)
    setLoading(true);
    await endpoint
      .post("/user/create", data)
      .then((res) => navigate(`${process.env.PUBLIC_URL}/all-users`))
      .catch((err) => {
        // console.log(err)
      });
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
                    className="form-control"
                    {...register("title_id", {
                      required: "Please select title",
                    })}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        title_id: e.target.value,
                      })
                    }>
                    <option value=""> --Select Title-- </option>
                    {titleList.map((title) => (
                      <option
                        key={title.id}
                        value={title.id}>
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
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        surname: e.target.value,
                      })
                    }
                    type="text"
                    required
                    name="surname"
                    {...register("surname")}
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom01">
                    Firstname
                  </CFormLabel>
                  <CFormInput
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        first_name: e.target.value,
                      })
                    }
                    type="text"
                    id="validationCustom01"
                    defaultValue=""
                    required
                    name="first_name"
                    {...register("first_name")}
                  />
                  {/* <CFormFeedback valid>Looks good!</CFormFeedback> */}
                </CCol>

                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">
                    OtherName
                  </CFormLabel>
                  <CFormInput
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        middle_name: e.target.value,
                      })
                    }
                    type="text"
                    name="middle_name"
                    {...register("middle_name")}
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustomUsername">
                    Email
                  </CFormLabel>
                  <CInputGroup className="has-validation">
                    {/* <CInputGroupText id="inputGroupPrepend">@</CInputGroupText> */}
                    <CFormInput
                      onChange={(e) =>
                        setDetails({
                          ...details,
                          email: e.target.value,
                        })
                      }
                      type="email"
                      aria-describedby="inputGroupPrepend"
                      required
                      name="email"
                      {...register("email")}
                    />
                  </CInputGroup>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">
                    Phone No.
                  </CFormLabel>
                  <CFormInput
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        phone: e.target.value,
                      })
                    }
                    type="text"
                    name="phone"
                    {...register("phone")}
                  />

                  {errors.phoneNo?.type === "matchPattern" && (
                    <span className="text-danger">
                      {" "}
                      <em>Phone No. is Incorrect</em>{" "}
                    </span>
                  )}
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustomUsername">
                    Court
                  </CFormLabel>

                  <select
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        court_id: e.target.value,
                      })
                    }
                    className="form-control"
                    {...register("court_id", {
                      required: "Please select court",
                    })}>
                    <option value=""> --Select Court-- </option>
                    {courtList.map((court, index) => (
                      <option value={court.id}> {court.name}</option>
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
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        state_id: e.target.value,
                      })
                    }
                    className="form-control"
                    {...register("state_id", {
                      required: "Please select State",
                    })}>
                    <option value=""> --Select state-- </option>
                    {statesList.map((state) => (
                      <option
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
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        lga_id: e.target.value,
                      })
                    }
                    className="form-control"
                    {...register("lga_id", {
                      required: "Please select lga",
                    })}>
                    <option value=""> --Select lga-- </option>
                    {lgasList.map((role) => (
                      <option
                        key={role.id}
                        value={role.id}>
                        {role.role_name}
                      </option>
                    ))}
                  </select>

                  {errors.r?.type === "required" && (
                    <span className="text-danger"> Lga required </span>
                  )}
                </CCol>

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
