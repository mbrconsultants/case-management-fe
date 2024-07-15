import React, { useState, useContext, useEffect } from "react";
import {
  Breadcrumb,
  Col,
  Row,
  Card,
  Modal,
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
import Loader from "../../../data/Loader/loader";

import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";

export default function ReopenCase() {
  const [loading, setLoading] = useState(false);
  const [courtList, setCourtList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [caseTypelist, setCaseTypeList] = useState([]);
  const [titleList, setTitleList] = useState([]);
  const navigate = useNavigate();

  //#
  const [data, setData] = useState();
  const [legalOfficers, setLegalOfficers] = useState([]);
  const [chambers, setChambers] = useState([]);
  const [fileType, setFileType] = useState();
  const [attachment, setCaseAttachment] = useState([]);

  const [legalOfficerId, setLegalOfficerId] = useState();
  const [chamberId, setChamberId] = useState();
  const [remarksModal, setRemarksModal] = useState(false);
  const [remarksList, setremarksList] = useState([]);

  const [hearingdate, setHearingdate] = useState({ hearing_date: "" });

  //##
  const [documentTypeList, setReportDocumentTypeList] = useState([]);
  const [appellantList, setAppellantList] = useState([]);
  const [respondentList, setRespondentList] = useState([]);
  const [reportUpdate, setReportUpdate] = useState({
    doc_urls: [],
    doc_type_id: "",
  });
  const [lines, setLines] = useState([{ doc_url: "" }]);

  const [details, setDetails] = useState({
    case_type_id: "",
    suite_no: "",
    parties: "",
    appellant_id: "",
    appellants: "",
    respondent_id: "",
    respondent: "",
    court_id: "",
    comment: "",
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

  //#
  //get all users
  const getUser = async () => {
    setLoading(true);
    await endpoint
      .get(`/case/show/${id}`)
      .then(({ data }) => {
        console.log("case", data.data);
        setData(data.data);

        setCaseAttachment(data.data.CaseAttachments);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const getLegalOfficer = async () => {
    setLoading(true);
    await endpoint
      .get(`/legal-officer/list`)
      .then(({ data }) => {
        console.log("legal officer", data.data);
        setLegalOfficers(data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const getChambers = async () => {
    setLoading(true);
    await endpoint
      .get(`/solicitor/list`)
      .then(({ data }) => {
        console.log("chamber", data.data);
        setChambers(data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const getFileType = async () => {
    setLoading(true);
    await endpoint
      .get(`/file-type/list`)
      .then(({ data }) => {
        console.log("fileType", data.data);
        setFileType(data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  // const judgeIDs =
  //     selectedCouncil && selectedCouncil.map((option) => option.value);

  // const chambersIDs =
  //   selectedChamber && selectedChamber.map((option) => option.value);

  //##

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

  // get single Case
  const getSingleCase = async () => {
    setLoading(true);
    await endpoint
      .get(`/case/show/${id}`)
      .then((res) => {
        setDetails(res.data.data);
        setremarksList(data.data.Remarks);
        console.log("Console Start");
        console.log(res.data.data);
        console.log("Console End");

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

  //get document type list
  const getDocumentTypeList = async () => {
    setLoading(true);
    await endpoint
      .get("/file-type/list")
      .then((res) => {
        console.log("document type", res.data.data);
        setReportDocumentTypeList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
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
    getAppellantTitles();
    getRespondentsTitles();
    getDocumentTypeList();
    //#
    getUser();
    getLegalOfficer();
    getChambers();
    getFileType();
    //##
    // getSingleCase();

    if (id) {
      getSingleCase();
    }
  }, []);
  //#
  const [motionDetails, setMotionDetails] = useState({
    case_id: id,
    motion_description: "",
    doc_type_id: "",
    doc_url: null,
  });
  //##

  const handleReopenCase = async () => {
    // e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("case_id", details.id);
    data.append("case_type_id", details.case_type_id);
    data.append("suite_no", details.suite_no);
    data.append("parties", details.parties);
    data.append("appellants", details.appellants);
    data.append("appellant_id", details.appellant_id);
    data.append("respondent", details.respondent);
    data.append("respondent_id", details.respondent_id);
    data.append("court_id", details.court_id);
    data.append("comment", details.comment);
    data.append("case_description", details.case_description);
    data.append("hearing_date", details.hearing_date);
    data.append("doc_url", details.doc_url);
    if (id) {
      await endpoint
        .post(`/case/reopen`, data)
        .then((res) => {
          SuccessAlert(res.data.message);
          navigate(`${process.env.PUBLIC_URL}/cases`);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          ErrorAlert(err.response.data.description);
        });
    }
    // else {
    //   await endpoint
    //     .post("/case/create", data)
    //     .then((res) => navigate(`${process.env.PUBLIC_URL}/cases`))
    //     .catch((err) => {
    //       setLoading(false);
    //       console.log(err);
    //       ErrorAlert(err.response.data.description);
    //     });
    // }
  };

  const options = courtList.map((court) => ({
    value: court.id,
    label: court.name,
  }));

  // Find the selected option based on details.court_id
  const selectedOption =
    options.find((option) => option.value === details.court_id) || null;

  //show remark modal
  const showRemarks = () => {
    setRemarksModal(true);
    console.log("here");
  };
  const hideRemarks = () => {
    setRemarksModal(false);
    console.log("here");
  };

  //Function to handle file(doc) change for report update
  const handleDocChange = (index, doc) => {
    const updatedLines = [...lines];
    updatedLines[index].doc_url = doc;
    setLines(updatedLines);

    // Block to Update, reportFiles state for attachment update section
    const updatedDocs = [...reportUpdate.doc_urls];
    updatedDocs[index] = doc;
    setReportUpdate({ ...reportUpdate, doc_urls: updatedDocs });
  };

  //Function to handle document type change for update section
  const handleDocTypeUpdate = (index, docType) => {
    setReportUpdate((prevState) => {
      const newdoc_type_id = [...prevState.doc_type_id];
      newdoc_type_id[index] = docType;
      return { ...prevState, doc_type_id: newdoc_type_id };
    });
  };

  //Function to add a new line for report attcahment update
  const handleAddLine = () => {
    setLines([...lines, { doc_url: "" }]);
  };

  //Function to remove line for report attachment update
  const handleRemoveLine = (index) => {
    const updatedLines = lines.filter((_, i) => i !== index);
    setLines(updatedLines);

    const updatedDocs = reportUpdate.doc_urls.filter((_, i) => i !== index);
    setReportUpdate({ ...reportUpdate, doc_urls: updatedDocs });
  };

  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Reopen Case</h1>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item className="breadcrumb-item" href="#">
                Registry
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item active breadcrumds"
                aria-current="page"
              >
                Reopen Case
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
        <Col xl={12} md={12}>
          <Card className="card border">
            {loading && <Loader />}
            {!loading && data && (
              <Card.Body>
                <div className="text-center"></div>
                <div className="mt-5">
                  <div
                    className="container bg-primary text-white custom-height"
                    style={{ height: "50px", borderRadius: "5px" }}
                  >
                    <h4 className="text-center text-uppercase pt-3">
                      Previous Case Information
                    </h4>
                  </div>
                  <hr className="my-4" />
                  <div className="row m-5">
                    {data && (
                      <div className="col-md-12">
                        <div className="row border">
                          <div className="fw-bold col-md-6">Suite No:</div>
                          <div className="col-md-6">{data.suite_no}</div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">Court:</div>
                          <div className="col-md-6">
                            {data.Court ? data.Court.name : ""}
                          </div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">Respondent:</div>
                          <div className="col-md-6">{data.respondent}</div>
                        </div>
                        <div className="row border">
                          <div className="fw-bold col-md-6">Comment:</div>
                          <div className="col-md-6">
                            <button
                              onClick={showRemarks}
                              className="btn btn-primary"
                            >
                              {" "}
                              <span className="fa fa-eye"></span> View
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card.Body>
            )}
          </Card>
        </Col>
      </div>
      <div>
        <Row>
          <Col md={12} lg={12}>
            <Card>
              <Card.Header>
                <Col className="card-title text-center">
                  <span> Enter New Details to Reopen Case</span>
                  <span className="fe fe-file"></span>
                </Col>
              </Card.Header>

              <Card.Body>
                {/* <formvalidation.CustomValidation /> */}
                <CForm
                  onSubmit={handleSubmit(handleReopenCase)}
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
                    <CFormLabel htmlFor="validationCustom01">
                      Parties
                    </CFormLabel>
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
                  <CCol md={12}>
                    <CFormLabel htmlFor="validationCustomUsername">
                      Comment
                    </CFormLabel>
                    <CFormTextarea
                      className="has-validation"
                      defaultValue={details.comment}
                      onChange={(e) =>
                        setDetails({
                          ...details,
                          comment: e.target.value,
                        })
                      }
                      type="text"
                      aria-describedby="inputGroupPrepend"
                      name="comment"
                    >
                      {/* <CInputGroupText id="inputGroupPrepend">@</CInputGroupText> */}
                    </CFormTextarea>
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
                  {lines.map((row, index) => (
                    <div key={index}>
                      <div className="row">
                        <CCol md={6}>
                          <CFormLabel htmlFor="edit_validationCustomUsername">
                            Attachment Type
                          </CFormLabel>
                          <select
                            className="form-select"
                            value={reportUpdate.doc_type_id[index] || ""}
                            onChange={(e) =>
                              handleDocTypeUpdate(index, e.target.value)
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
                          <CFormLabel htmlFor="edit_validationCustomUsername">
                            Attachment
                          </CFormLabel>
                          <CInputGroup className="has-validation">
                            <CFormInput
                              type="file"
                              id="inputGroupFile01"
                              aria-describedby="inputGroupFileAddon01"
                              aria-label="Upload"
                              onChange={(e) =>
                                handleDocChange(index, e.target.files[0])
                              }
                            />
                          </CInputGroup>
                        </CCol>
                      </div>
                      <div className="row mt-2">
                        <CCol md={12} className="d-flex justify-content-start">
                          {index !== 0 && (
                            <CButton
                              className="me-2"
                              size="sm"
                              color="red"
                              onClick={() => handleRemoveLine(index)}
                            >
                              Remove
                            </CButton>
                          )}
                          {index === lines.length - 1 && (
                            <CButton
                              className="btn btn-secondary"
                              size="sm"
                              onClick={handleAddLine}
                            >
                              Add
                            </CButton>
                          )}
                        </CCol>
                      </div>
                    </div>
                  ))}

                  <CCol xs={12} className="text-center">
                    <CButton color="primary" type="submit">
                      <span className="fe fe-plus"></span>
                      {loading ? "Reopening Case..." : "Reopen Case"}
                    </CButton>
                  </CCol>
                </CForm>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal show={remarksModal} size="lg">
        <Modal.Header>
          <Button onClick={hideRemarks} className="btn-close" variant="">
            x
          </Button>
        </Modal.Header>

        <Modal.Body>
          <div>
            <Card>
              <Card.Header>
                <Card.Title as="h3">{"Remarks"}</Card.Title>
              </Card.Header>
              <Card.Body>
                <Col lg={12} md={12}>
                  <div className="container">
                    {remarksList.length > 0 ? (
                      remarksList.map((remark, index) => (
                        <tr key={index + 1}>
                          <td>{index + 1}</td>
                          <td>{remark.comment}</td>
                        </tr>
                      ))
                    ) : (
                      <p>{"No Remark"}</p>
                    )}
                  </div>
                </Col>
              </Card.Body>
            </Card>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" className="me-1" onClick={hideRemarks}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
