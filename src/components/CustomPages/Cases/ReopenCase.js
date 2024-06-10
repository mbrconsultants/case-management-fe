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

  const [details, setDetails] = useState({
    case_type_id: "",
    suite_no: "",
    parties: "",
    appellants: "",
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
    data.append("respondent", details.respondent);
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
