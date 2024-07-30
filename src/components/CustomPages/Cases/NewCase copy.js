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
  CRow,
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
import "./styles.css";
export default function CreateCase() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [courtList, setCourtList] = useState([]);
  const [courtDivisionList, setCourtDivisionList] = useState([]);
  const [chamberList, setChamberList] = useState([]);
  // const [selectedLawyers, setSelectedLawyers] = useState(null);

  const [statesList, setStatesList] = useState([]);
  const [caseTypelist, setCaseTypeList] = useState([]);
  const [appellantList, setAppellantList] = useState([]);
  const [respondentList, setRespondentList] = useState([]);
  const [chamberLawyers, setChamberLawyers] = useState([]);

  const [documentTypeList, setDocumentTypeList] = useState([]);

  const [details, setDetails] = useState({
    case_type_id: "",
    suite_no: "",
    parties: "",
    appellant_name: "",
    appellant_id: "",
    respondent_name: "",
    judge_id: [],
    respondent_id: "",
    chamber_solicitor_id: "",
    chamber_lawyer_ids: [],
    court_id: "",
    case_description: "",
    hearing_date: "",
    doc_urls: [],
    doc_type_id: "",
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

  //get single case
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

  //get appellant titles
  const getAppellantTitles = async () => {
    setLoading(true);
    await endpoint
      .get("/case/appellants/list")
      .then((res) => {
        setAppellantList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
      });
  };

  //get respondent titles
  const getRespondentsTitles = async () => {
    setLoading(true);
    await endpoint
      .get("/case/respondents/list")
      .then((res) => {
        setRespondentList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
      });
  };
  //get DocumentTypeList
  const getDocumentTypeList = async () => {
    setLoading(true);
    await endpoint
      .get("/file-type/list")
      .then((res) => {
        console.log("document type", res.data.data);
        setDocumentTypeList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
      });
  };

  //get CourtDivision
  const getCourtDivision = async (courtID) => {
    setLoading(true);
    await endpoint
      .get(`/division/search/${courtID}`)
      .then((res) => {
        setCourtDivisionList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
      });
  };
  //get ChamberList
  const getChamberList = async () => {
    setLoading(true);
    await endpoint
      .get(`/solicitor/list`)
      .then((res) => {
        console.log("solicitor", res.data.data);
        setChamberList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
      });
  };

  // Find the chamber Lawyers with the specified ID
  const getChamberLawyers = async (id) => {
    setLoading(true);
    await endpoint
      .get(`/solicitor/council/${id}`)
      .then((res) => {
        console.log("council", res.data.data);
        setChamberLawyers(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
      });
  };

  useEffect(() => {
    getCourtList();
    getChamberList();
    getAppellantTitles();
    getRespondentsTitles();
    getStatestList();
    getDocumentTypeList();
    getCaseType();
    if (id) {
      getSingleCase();
    }
  }, []);

  const handleCreateUser = async () => {
    setLoading(true);
    const chamber_lawyer_ids = [
      details.judge_id && details.judge_id.map((id) => id.value),
    ];
    const data = new FormData();

    // console.log("==============doc_urls======================");
    // console.log(doc_urls);
    // console.log("====================================");

    // Append other form data
    data.append("case_type_id", details.case_type_id);
    data.append("suite_no", details.suite_no);
    data.append("parties", details.parties);
    data.append("appellant_name", details.appellant_name);
    data.append("appellant_id", details.appellant_id);
    data.append("respondent_name", details.respondent_name);
    data.append("respondent_id", details.respondent_id);
    data.append("court_id", details.court_id);
    data.append("case_description", details.case_description);
    data.append("hearing_date", details.hearing_date);
    data.append("chamber_solicitor_id", details.chamber_solicitor_id);
    // data.append("chamber_lawyer_ids", JSON.stringify(chamber_lawyer_ids));
    data.append("doc_type_id", details.doc_type_id);
    for (let i = 0; i < details.doc_urls.length; i++) {
      data.append("doc_urls", details.doc_urls[i]);
    }

    console.log("Add Case Payload:", data);
    for (let pair of data.entries()) {
      console.log("Payload Key Value Pair", pair[0] + ": " + pair[1]);
    }

    // return;
    try {
      if (id) {
        const res = await endpoint.put(`/case/edit/${id}`, data);
        SuccessAlert(res.data.message);
        navigate(`${process.env.PUBLIC_URL}/cases`);
      } else {
        const res = await endpoint.post("/case/create", data);
        navigate(`${process.env.PUBLIC_URL}/cases`);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      ErrorAlert(err.response.data.description);
    }
  };

  const [rows, setRows] = useState([{ doc_url: "" }]);

  const setSelectedLawyers = (selectedOptions) => {
    setDetails({
      ...details,
      judge_id: selectedOptions,
    });
  };

  // Updated Case attachment code

  //Function to handle file change
  const handleFileChange = (index, file) => {
    const updatedRows = [...rows];
    updatedRows[index].doc_url = file;
    setRows(updatedRows);

    // Update files state
    const updatedFiles = [...details.doc_urls];
    updatedFiles[index] = file;
    setDetails({ ...details, doc_urls: updatedFiles });
  };

  //Function to handle document type change
  const handleTypeChange = (index, docType) => {
    setDetails((prevState) => {
      const newdoc_type_id = [...prevState.doc_type_id];
      newdoc_type_id[index] = docType;
      return { ...prevState, doc_type_id: newdoc_type_id };
    });
  };

  //Function to add a new row for report attcahment
  const handleAddRow = () => {
    setRows([...rows, { doc_url: "" }]);
  };

  //Function to remove row for report attachment
  const handleRemoveRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);

    const updatedFiles = details.doc_urls.filter((_, i) => i !== index);
    setDetails({ ...details, doc_urls: updatedFiles });
  };

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
            View Cases
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
                <fieldset
                  style={{
                    border: "3px solid #ccc",
                    padding: "20px",
                    margin: "20px 0",
                  }}
                >
                  <legend style={{ fontSize: "1.5em", padding: "0 10px" }}>
                    CASE DETAILS
                  </legend>
                  <CRow>
                    <CCol md={4}>
                      <CFormLabel htmlFor="validationCustom02">
                        Suite Number
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
                        <select
                          className="form-select"
                          placeholder="Select a court..."
                          name=""
                          id=""
                          defaultValue={details.court_id}
                          onChange={(e) => {
                            setDetails({
                              ...details,
                              court_id: e.target.value,
                            });
                            getCourtDivision(e.target.value);
                          }}
                        >
                          <option value="">--select--</option>
                          {courtList &&
                            courtList.map((court, index) => (
                              <option value={court.id} key={index}>
                                {court.name}
                              </option>
                            ))}
                        </select>
                      </Form.Group>
                    </CCol>
                    <CCol md={4}>
                      <CFormLabel htmlFor="validationCustomUsername">
                        Court Divisions
                      </CFormLabel>
                      <Form.Group>
                        <select
                          className="form-select"
                          placeholder="Select a court..."
                          name=""
                          id=""
                          defaultValue={details.court_id}
                          onChange={(e) =>
                            setDetails({
                              ...details,
                              court_id: e.target.value,
                            })
                          }
                        >
                          <option value="">--select--</option>
                          {courtDivisionList &&
                            courtDivisionList.map((court, index) => (
                              <option value={court.id} key={index}>
                                {court.division}
                              </option>
                            ))}
                        </select>
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
                        <option value="">--select--</option>
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
                      <CFormLabel htmlFor="validationCustom02">
                        Appellant Title
                      </CFormLabel>
                      <select
                        className="form-select"
                        defaultValue={details.appellant_id}
                        onChange={(e) =>
                          setDetails({
                            ...details,
                            appellant_id: e.target.value,
                          })
                        }
                        name=""
                        id=""
                      >
                        <option value="">--select--</option>
                        {appellantList.map((appellant) => (
                          <option value={appellant.id} key={appellant.id}>
                            {appellant.appellant}
                          </option>
                        ))}
                      </select>
                    </CCol>
                    <CCol md={4}>
                      <CFormLabel htmlFor="validationCustom02">
                        Appellant Name
                      </CFormLabel>
                      <CFormInput
                        defaultValue={details.appellant_name}
                        onChange={(e) =>
                          setDetails({
                            ...details,
                            appellant_name: e.target.value,
                          })
                        }
                        type="text"
                        name="appellants name"
                      />
                    </CCol>
                    <CCol md={4}>
                      <CFormLabel htmlFor="validationCustomUsername">
                        Respondent Title
                      </CFormLabel>
                      <CInputGroup className="has-validation">
                        <select
                          className="form-select"
                          defaultValue={details.respondent_id}
                          onChange={(e) =>
                            setDetails({
                              ...details,
                              respondent_id: e.target.value,
                            })
                          }
                          name=""
                          id=""
                        >
                          <option value="">--select--</option>
                          {respondentList.map((respondent) => (
                            <option value={respondent.id} key={respondent.id}>
                              {respondent.respondent}
                            </option>
                          ))}
                        </select>
                      </CInputGroup>
                    </CCol>
                    <CCol md={4}>
                      <CFormLabel htmlFor="validationCustom02">
                        Respondent Name
                      </CFormLabel>
                      <CFormInput
                        defaultValue={details.respondent_name}
                        onChange={(e) =>
                          setDetails({
                            ...details,
                            respondent_name: e.target.value,
                          })
                        }
                        type="text"
                        name="respondent name"
                      />
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
                    <CCol md={6}>
                      <CFormLabel htmlFor="validationCustomUsername">
                        Parties
                      </CFormLabel>
                      <CFormInput
                        className="has-validation"
                        defaultValue={details.parties}
                        onChange={(e) =>
                          setDetails({
                            ...details,
                            parties: e.target.value,
                          })
                        }
                        type="text"
                        aria-describedby="inputGroupPrepend"
                        name="case parties"
                      ></CFormInput>
                    </CCol>
                    <CCol md={6}>
                      <CFormLabel htmlFor="validationCustomUsername">
                        Chamber Name
                      </CFormLabel>
                      <Form.Group>
                        <select
                          className="form-select"
                          placeholder="Select a chamber..."
                          name=""
                          id=""
                          defaultValue={details.chamber_solicitor_id}
                          onChange={(e) => {
                            setDetails({
                              ...details,
                              chamber_solicitor_id: e.target.value,
                            });
                            getChamberLawyers(e.target.value);
                          }}
                        >
                          <option value="">--select--</option>
                          {chamberList &&
                            chamberList.map((chamber, index) => (
                              <option value={chamber.id} key={index}>
                                {chamber.chamber_name}
                              </option>
                            ))}
                        </select>
                      </Form.Group>
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
                      ></CFormTextarea>
                    </CCol>
                  </CRow>
                </fieldset>
                <fieldset
                  style={{
                    border: "3px solid #ccc",
                    padding: "20px",
                    margin: "20px 0",
                  }}
                >
                  <legend style={{ fontSize: "1.5em", padding: "0 10px" }}>
                    ATTACHMENTS
                  </legend>
                  <CRow>
                    {rows.map((row, index) => (
                      <div className="row" key={index}>
                        <CCol md={6}>
                          <CFormLabel htmlFor="validationCustomUsername">
                            Attachment Type
                          </CFormLabel>
                          <select
                            className="form-select"
                            // value={row.doc_type_id}
                            value={
                              details.doc_type_id && details.doc_type_id[index]
                                ? details.doc_type_id[index]
                                : ""
                            }
                            // value={details.doc_type_id[index] || ""}
                            onChange={(e) =>
                              handleTypeChange(index, e.target.value)
                            }
                          >
                            <option value="">--select--</option>
                            {documentTypeList.map((fileType, idx) => (
                              <option key={idx} value={fileType.id}>
                                {fileType.name}
                              </option>
                            ))}
                          </select>
                        </CCol>
                        <CCol md={6}>
                          <CFormLabel htmlFor="validationCustomUsername">
                            Attachment
                          </CFormLabel>
                          <CInputGroup className="has-validation">
                            <CFormInput
                              type="file"
                              id="inputGroupFile01"
                              aria-describedby="inputGroupFileAddon01"
                              aria-label="Upload"
                              onChange={(e) =>
                                handleFileChange(index, e.target.files[0])
                              }
                            />
                          </CInputGroup>
                        </CCol>
                        <CCol md={3} className="mt-3">
                          <CFormLabel
                            htmlFor={`removeRow${index}`}
                          ></CFormLabel>
                          {index > 0 && (
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={() => handleRemoveRow(index)}
                            >
                              <span className="fa fa-trash"></span>
                            </button>
                          )}
                        </CCol>
                      </div>
                    ))}
                    <div className="row">
                      <CCol md={12} className="mt-3 text-right">
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={handleAddRow}
                        >
                          <span className="fa fa-plus"></span> More Attachment
                        </button>
                      </CCol>
                    </div>
                  </CRow>
                </fieldset>
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
