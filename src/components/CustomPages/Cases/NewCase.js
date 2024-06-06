import React, { useState, useContext, useEffect } from "react";
import {
  Breadcrumb,
  Col,
  Row,
  Card,
  FormGroup,
  Button,
  Form,
} from "react-bootstrap";
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
  CFormTextarea,
  CInputGroupText,
  CButton,
  CFormCheck,
} from "@coreui/react";
import * as formvalidation from "../../../data/Form/formvalidations/formvalidations";
import endpoint from "../../../context/endpoint";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";

export default function CreateCase() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [courtList, setCourtList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [caseTypelist, setCaseTypeList] = useState([]);
  const [titleList, setTitleList] = useState([]);

  const [details, setDetails] = useState({
    case_type_id: "",
    suite_no: "",
    parties: "",
    appellants: "",
    respondent: "",
    court_id: "",
    case_description: "",
    hearing_date: "",
    doc_url: null,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const params = useParams();

  //get court list
  const getCourtList = async () => {
    setLoading(true);
    await endpoint
      .get("/court/list")
      .then((res) => {
        console.log("courtlist", res.data.data);
        setCourtList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
      });
  };

  const id = params?.id;

  //get single staff
  const getSingleCase = async () => {
    setLoading(true);
    await endpoint
      .get(`/case/show/${id}`)
      .then((res) => {
        setDetails(res.data.data);
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
        setStatesList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  //get case Type
  const getCaseType = async () => {
    setLoading(true);
    await endpoint
      .get("/case-type/list")
      .then((res) => {
        console.log("casetype", res.data.data);
        setCaseTypeList(res.data.data);
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
    getCaseType();
    if (id) {
      getSingleCase();
    }
  }, []);

  const handleCreateUser = async () => {
    // e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("case_type_id", details.case_type_id);
    data.append("suite_no", details.suite_no);
    data.append("parties", details.parties);
    data.append("appellants", details.appellants);
    data.append("respondent", details.respondent);
    data.append("court_id", details.court_id);
    data.append("case_description", details.case_description);
    data.append("hearing_date", details.hearing_date);
    data.append("doc_url", details.doc_url);
    if (id) {
      await endpoint
        .put(`/case/edit/${id}`, data)
        .then((res) => navigate(`${process.env.PUBLIC_URL}/cases`))
        .catch((err) => {
          console.log(err);
          setLoading(false);
          ErrorAlert(err.response.data.description);
        });
    } else {
      await endpoint
        .post("/case/create", data)
        .then((res) => navigate(`${process.env.PUBLIC_URL}/cases`))
        .catch((err) => {
          setLoading(false);
          console.log(err);
          ErrorAlert(err.response.data.description);
        });
    }
  };

  const options = courtList.map((court) => ({
    value: court.id,
    label: court.name,
  }));

  // Find the selected option based on details.court_id
  const selectedOption =
    options.find((option) => option.value === details.court_id) || null;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">New Case</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Registry
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              New Case
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link
            to={`${process.env.PUBLIC_URL}/cases/`}
            className="btn btn-primary btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-eye"></i>&nbsp;
            </span>
            View Case
          </Link>
        </div>
      </div>

      <Row>
        <Col md={12} lg={12}>
          <Card>
            <Card.Header>
              <Col className="card-title text-center">
                <span> Enter Case Details </span>
                <span className="fe fe-file"></span>
              </Col>
            </Card.Header>

            <Card.Body>
              {/* <formvalidation.CustomValidation /> */}
              <CForm
                onSubmit={handleSubmit(handleCreateUser)}
                className="row g-3 needs-validation"
              >
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">
                    Suit Number
                  </CFormLabel>
                  <CFormInput
                    defaultValue={details.suite_no}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        suite_no: e.target.value,
                      })
                    }
                    type="text"
                    name="suite_no"
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustomUsername">
                    Court
                  </CFormLabel>
                  <Form.Group>
                    <Select
                      options={options}
                      value={selectedOption}
                      onChange={(selectedOption) =>
                        setDetails({
                          ...details,
                          court_id: selectedOption
                            ? selectedOption.value
                            : null,
                        })
                      }
                      placeholder="Select a court..."
                      isClearable
                    />
                  </Form.Group>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">
                    Case Type
                  </CFormLabel>
                  <select
                    className="form-select"
                    defaultValue={details.case_type_id}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        case_type_id: e.target.value,
                      })
                    }
                  >
                    <option value="">--select-</option>
                    {caseTypelist.map((caseType, index) => (
                      <option
                        key={index + 1}
                        value={caseType.id}
                        selected={details.case_type_id === caseType.id}
                        className="text-dark"
                      >
                        {caseType.case_type}
                      </option>
                    ))}
                  </select>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom01">Parties</CFormLabel>
                  <CFormInput
                    defaultValue={details.parties}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        parties: e.target.value,
                      })
                    }
                    type="text"
                    id="validationCustom01"
                    name="parties"
                  />
                  {/* <CFormFeedback valid>Looks good!</CFormFeedback> */}
                </CCol>

                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">
                    Appellant
                  </CFormLabel>
                  <CFormInput
                    defaultValue={details.appellants}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        appellants: e.target.value,
                      })
                    }
                    type="text"
                    name="appellant"
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustomUsername">
                    Respondent
                  </CFormLabel>
                  <CInputGroup className="has-validation">
                    {/* <CInputGroupText id="inputGroupPrepend">@</CInputGroupText> */}
                    <CFormInput
                      defaultValue={details.respondent}
                      onChange={(e) =>
                        setDetails({
                          ...details,
                          respondent: e.target.value,
                        })
                      }
                      type="text"
                      aria-describedby="inputGroupPrepend"
                      name="respondent"
                    />
                  </CInputGroup>
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="validationCustomUsername">
                    Case Description
                  </CFormLabel>
                  <CFormTextarea
                    className="has-validation"
                    defaultValue={details.case_description}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        case_description: e.target.value,
                      })
                    }
                    type="text"
                    aria-describedby="inputGroupPrepend"
                    name="case_description"
                  >
                    {/* <CInputGroupText id="inputGroupPrepend">@</CInputGroupText> */}
                  </CFormTextarea>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">
                    Hearing Date
                  </CFormLabel>
                  <CFormInput
                    defaultValue={details.hearing_date}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        hearing_date: e.target.value,
                      })
                    }
                    type="date"
                    name="hearing_date"
                  />
                </CCol>
                <CCol md={4}></CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustomUsername">
                    Attachment
                  </CFormLabel>
                  <CInputGroup className="has-validation">
                    <input
                      defaultValue={details.doc_url}
                      onChange={(e) =>
                        setDetails({
                          ...details,
                          doc_url: e.target.files[0],
                        })
                      }
                      type="file"
                      aria-describedby="inputGroupPrepend"
                      name="document"
                    />
                  </CInputGroup>
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
