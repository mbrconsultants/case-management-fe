import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import endpoint from "../../../context/endpoint";
import Select from "react-select";
import {
  Tabs,
  Tab,
  Breadcrumb,
  Card,
  Row,
  Col,
  Table,
  Modal,
  Button,
} from "react-bootstrap";
import {
  CForm,
  CCol,
  CFormLabel,
  CFormTextarea,
  CButton,
  CFormInput,
  CInputGroup,
} from "@coreui/react";
import "./styles.css";
import { useForm } from "react-hook-form";
import Loader from "../../../data/Loader/loader";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";

export default function SingleCase() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [openCaseModalData, setOpenCaseModalData] = useState();
  const [legalOfficers, setLegalOfficers] = useState([]);
  const [chambers, setChambers] = useState([]);
  const [legalOfficerId, setLegalOfficerId] = useState();
  const [chamberId, setChamberId] = useState();
  const [LegalModal, setLegalModal] = useState(false);
  const [motionModal, setMotionModal] = useState(false);
  const [caseModal, setCaseModal] = useState(false);
  const [adjournCaseModal, setAdjournCaseModal] = useState(false);
  const [ChamberModal, setChamberModal] = useState(false);
  const [attachment, setCaseAttachment] = useState([]);
  const [assigncouncils, setAssignCouncils] = useState([]);
  const [assignsolicitors, setAssignSolicitors] = useState([]);
  const [motionData, setMotionData] = useState();
  const [adjournCaseData, setAdjournCaseData] = useState();
  const [fileType, setFileType] = useState();
  const [selectedCouncil, setSelectedCouncil] = useState(null);
  const [selectedChamber, setSelectedChamber] = useState(null);
  const [comment, setComment] = useState(""); // State for the comment
  const [motionDetails, setMotionDetails] = useState({
    case_id: "",
    motion_description: "",
    doc_type_id: "",
    doc_url: null,
  });
  const [reportDetails, setReportDetails] = useState({
    reportDate: "",
    reportDescription: "",
    reportFiles: [],
    reportDocType: "",
  });
  const [reports, setReports] = useState([]); // State for storing multiple reports
  const [documentTypeList, setReportDocumentTypeList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const openLegalModal = () => {
    setLegalModal(true);
  };

  const closeLegalModal = () => {
    setLegalModal(false);
  };

  const openChamberModal = () => {
    setChamberModal(true);
  };

  const closeChamberModal = () => {
    setChamberModal(false);
  };

  const openMotionModal = () => {
    setMotionDetails({ ...motionDetails, case_id: id });
    setMotionModal(true);
  };

  const openAdjournCaseModal = () => {
    setAdjournCaseData(data);
    setAdjournCaseModal(true);
  };

  const closeAdjournCaseModal = () => {
    setAdjournCaseModal(false);
  };

  const closeMotionModal = () => {
    setMotionModal(false);
  };

  const openCaseModal = (data) => {
    setOpenCaseModalData(data);
    setCaseModal(true);
  };
  const closeCaseModal = () => {
    setCaseModal(false);
  };

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    getCase();
    getLegalOfficer();
    getChambers();
    getFileType();
    getReportDocumentTypeList();
  }, []);

  const getCase = async () => {
    setLoading(true);
    await endpoint
      .get(`/case/show/${id}`)
      .then(({ data }) => {
        console.log("case", data.data);
        setData(data.data);
        setAssignCouncils(data.data.AssignCouncils);
        setAssignSolicitors(data.data.AssignSolicitors);
        setCaseAttachment(data.data.CaseAttachments);
        setReports(data.data.Reports); // Assuming `Reports` is the array of reports from the API
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const getLegalOfficer = async () => {
    setLoading(true);
    await endpoint
      .get(`/legal-officer/list`)
      .then(({ data }) => {
        setLegalOfficers(data.data);
        setLoading(false);
      })
      .catch((err) => console.log("Legal Officer Error", err));
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
      .catch((err) => console.log("Chamber Error", err));
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

  const judgeIDs =
    selectedCouncil && selectedCouncil.map((option) => option.value);

  const handleAddLegalOfficer = async () => {
    try {
      const data = {
        legal_officer_id: judgeIDs,
        case_id: id,
      };
      const response = await endpoint.post(`/case/assign-council`, data);
      closeLegalModal();
      getCase();
      SuccessAlert(response.data.message);
    } catch (err) {
      console.log(err);
      setLoading(false);
      closeLegalModal();
      if (err.response && err.response.data && err.response.data.description) {
        ErrorAlert(err.response.data.description);
      } else {
        ErrorAlert("An error occurred. Please try again.");
        closeLegalModal();
      }
    }
  };

  const chambersIDs =
    selectedChamber && selectedChamber.map((option) => option.value);

  const handleAddChamberOfficer = async () => {
    try {
      const data = {
        chamber_solicitor_id: chambersIDs,
        case_id: id,
      };
      const response = await endpoint.post(`/case/assign-solicitor`, data);
      closeChamberModal();
      getCase();
      SuccessAlert(response.data.message);
    } catch (err) {
      console.log(err);
      setLoading(false);
      closeChamberModal();
      if (err.response && err.response.data && err.response.data.description) {
        ErrorAlert(err.response.data.description);
      } else {
        ErrorAlert("An error occurred. Please try again.");
        closeChamberModal();
      }
    }
  };

  const handleAddMotion = async () => {
    try {
      const data = new FormData();
      data.append("case_id", motionDetails.case_id);
      data.append("motion_description", motionDetails.motion_description);
      data.append("doc_type_id", motionDetails.doc_type_id);
      data.append("doc_url", motionDetails.doc_url);

      const response = await endpoint.post(`/motion/create`, data);
      navigate(`${process.env.PUBLIC_URL}/cases`);
      SuccessAlert(response.data.message);
    } catch (err) {
      console.log(err);
      setLoading(false);
      closeMotionModal();
      if (err.response && err.response.data && err.response.data.description) {
        ErrorAlert(err.response.data.description);
      } else {
        ErrorAlert("An error occurred. Please try again.");
      }
    }
  };

  const handleCloseCase = async () => {
    await endpoint
      .post(`/case/close/${id}`, { comment })
      .then((res) => {
        console.log("case gateway", res);
        setData(data.data);
        getCase(); // Refresh case data
        SuccessAlert(res.data.message);
        setLoading(false);
        closeCaseModal();
      })
      .catch((err) => {
        setLoading(false);
        closeCaseModal();
        ErrorAlert(err.response.data.message);
      });
  };

  const handleReopenCaseClick = (id) => {
    navigate(`/reopen-case/${id}`);
  };

  const handleAdjournCase = async () => {
    try {
      const data = new FormData();
      data.append("case_id", adjournCaseData.case_id);

      const response = await endpoint.post(`/motion/create`, data);
      navigate(`${process.env.PUBLIC_URL}/cases`);
      SuccessAlert(response.data.message);
    } catch (err) {
      console.log(err);
      setLoading(false);
      closeAdjournCaseModal();
      if (err.response && err.response.data && err.response.data.description) {
        ErrorAlert(err.response.data.description);
      } else {
        ErrorAlert("An error occurred. Please try again.");
      }
    }
  };

  const handleAddReport = async () => {
    try {
      const formData = new FormData();
      formData.append("case_id", id);
      formData.append("report_date", reportDetails.reportDate);
      formData.append("report_description", reportDetails.reportDescription);
      formData.append("report_doc_type", reportDetails.reportDocType);
      for (let i = 0; i < reportDetails.reportFiles.length; i++) {
        formData.append("report_files", reportDetails.reportFiles[i]);
      }

      const response = await endpoint.post(`/report/create`, formData);
      SuccessAlert(response.data.message);
      getCase(); // Refresh case data to show the new report
    } catch (err) {
      console.log(err);
      ErrorAlert("An error occurred. Please try again.");
    }
  };

  //Get Report Document Type List
  const getReportDocumentTypeList = async () => {
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

  const handleViewReport = (reportId) => {
    const reportUrl = `/report/view/${reportId}`;
    window.open(reportUrl, "_blank");
  };

  const handleEditReport = (reportId) => {
    const reportUrl = `/report/edit/${reportId}`;
    navigate(reportUrl);
  };

  const [rows, setRows] = useState([{ doc_url: "" }]);
  const handleAddRow = () => {
    setRows([...rows, { doc_url: "" }]);
  };

  const handleRemoveRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleFileChange = (index, file) => {
    const updatedRows = [...rows];
    updatedRows[index].doc_url = file;
    setRows(updatedRows);
  };

  return (
    <>
      <div>
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
                      Case Information
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
                          <div className="fw-bold col-md-6">Parties:</div>
                          <div className="col-md-6">{data.parties}</div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">Respondent:</div>
                          <div className="col-md-6">{data.respondent}</div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">Case Type:</div>
                          <div className="col-md-6">
                            {data.CaseType ? data.CaseType.case_type : ""}
                          </div>
                        </div>
                        <div className="row border">
                          <div className="fw-bold col-md-6">
                            Case Description:
                          </div>
                          <div className="col-md-6">
                            {data.case_description}
                          </div>
                        </div>
                        <div className="row border">
                          <div className="fw-bold col-md-6">Hearing Date:</div>
                          <div className="col-md-6">
                            {data.hearing_date ? data.hearing_date : ""}
                          </div>
                        </div>
                        <div className="row border">
                          <div className="fw-bold col-md-6">
                            Legal Officer(s):
                          </div>
                          <div className="col-md-6">
                            {assigncouncils && assigncouncils.length > 0 ? (
                              <>
                                {assigncouncils.map((council, index) => (
                                  <span key={index}>
                                    <h3 className="btn btn-sm btn-primary bright-btn btn-secondary-bright m-1">
                                      {council.LegalOfficer.surname}{" "}
                                      {council.LegalOfficer.first_name}
                                    </h3>
                                  </span>
                                ))}
                              </>
                            ) : (
                              <button>No Legal Officer(s) Assigned</button>
                            )}
                          </div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">
                            Chamber/Solicitor:
                          </div>
                          <div className="col-md-6">
                            {assignsolicitors && assignsolicitors.length > 0 ? (
                              <>
                                {assignsolicitors.map((solicitor, index) => (
                                  <span key={index}>
                                    <h3 className="btn btn-sm btn-primary bright-btn btn-secondary-bright m-1">
                                      {
                                        solicitor.ChamberOrSolicitor
                                          .chamber_name
                                      }
                                    </h3>
                                  </span>
                                ))}
                              </>
                            ) : (
                              <button>No Chamber/Solicitor Attached</button>
                            )}
                          </div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">Case Status:</div>
                          <div className="col-md-6">
                            <a
                              href={`#`}
                              className="btn bright-btn btn-secondary-bright m-1"
                            >
                              <i className="fa fa-file" aria-hidden="true"></i>
                              {data.status == 1 ? "Pending" : " Resolved"}
                            </a>
                          </div>
                        </div>
                        <p style={{ color: "green" }}>
                          {" "}
                          <a href="/comments">View Comments </a>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Card.Body>
            )}

            <div className="">
              <button
                className="btn btn-primary bright-btn btn-primary-bright mx-5"
                onClick={openMotionModal}
              >
                Attach Motion
              </button>
              <button
                className="btn btn-warning bright-btn btn-primary-bright mx-5"
                onClick={openAdjournCaseModal}
              >
                Adjourn Case
              </button>
              {data && (
                <button
                  className={`btn ${
                    data.status === 2
                      ? "btn-danger bright-btn btn-danger-bright"
                      : "btn-danger bright-btn btn-danger-bright"
                  } mx-5`}
                  onClick={() => openCaseModal(data)}
                >
                  {data.status === 2 ? "Reopen Case" : "Close Case"}
                </button>
              )}
              {/* <button
                className="btn btn-warning bright-btn btn-primary-bright mx-5"
                onClick={openAdjournCaseModal}>
                Adjourn Case
              </button> */}
            </div>
          </Card>
        </Col>

        <Row>
          <Col xl={12} md={12}>
            <Card className="card border">
              {loading && <Loader />}
              {!loading && data && (
                <Card.Body>
                  <div>
                    <div
                      className="container bg-primary text-white custom-height"
                      style={{
                        height: "40px",
                        borderRadius: "2.5px",
                        maxWidth: "300px",
                      }}
                    >
                      <h6 className="text-center pt-3">Attachment(s)</h6>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-bordered table-striped">
                        <thead style={{ background: "#0A7E51" }}>
                          <tr>
                            <th
                              style={{
                                color: "#fff",
                                fontWeight: 900,
                              }}
                            >
                              S/N
                            </th>
                            <th
                              style={{
                                color: "#fff",
                                fontWeight: 900,
                              }}
                            >
                              Attachment Type
                            </th>
                            <th
                              style={{
                                color: "#fff",
                                fontWeight: 900,
                              }}
                            >
                              Attachment
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {attachment.map((attach, index) => (
                            <tr key={attach.id}>
                              <td>{index + 1}</td>
                              <td>{attach.type ? attach.type : "N/A"}</td>
                              <td>
                                <a
                                  href={`${process.env.REACT_APP_UPLOAD_URL}${attach.doc_url}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-sm btn-primary bright-btn btn-secondary-bright m-1"
                                >
                                  <span className="fa fa-eye"></span>{" "}
                                  View/Download
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Card.Body>
              )}
            </Card>
          </Col>
        </Row>

        <Col xl={12} md={12}>
          <Card className="card border">
            {loading && <Loader />}
            {!loading && data && (
              <Card.Body>
                <div>
                  <div
                    className="container bg-primary text-white custom-height"
                    style={{
                      height: "40px",
                      borderRadius: "2.5px",
                      maxWidth: "300px",
                    }}
                  >
                    <h6 className="text-center pt-3">Case Report</h6>
                  </div>
                  <CForm
                    onSubmit={handleSubmit(handleAddReport)}
                    className="row g-3 needs-validation"
                  >
                    <CCol md={12}>
                      <CFormLabel htmlFor="reportDate">Report Date</CFormLabel>
                      <CFormInput
                        type="date"
                        id="reportDate"
                        value={reportDetails.reportDate}
                        onChange={(e) =>
                          setReportDetails({
                            ...reportDetails,
                            reportDate: e.target.value,
                          })
                        }
                      />
                    </CCol>
                    <CCol md={12}>
                      <CFormLabel htmlFor="reportDescription">
                        Report Description
                      </CFormLabel>
                      <CFormTextarea
                        id="reportDescription"
                        value={reportDetails.reportDescription}
                        onChange={(e) =>
                          setReportDetails({
                            ...reportDetails,
                            reportDescription: e.target.value,
                          })
                        }
                      ></CFormTextarea>
                    </CCol>
                    {/* <CCol md={12}>
                      <CFormLabel htmlFor="reportDocType">
                        Document Type
                      </CFormLabel>
                      <CFormInput
                        type="text"
                        id="reportDocType"
                        value={reportDetails.reportDocType}
                        onChange={(e) =>
                          setReportDetails({
                            ...reportDetails,
                            reportDocType: e.target.value,
                          })
                        }
                      />
                    </CCol> */}
                    {/* <CCol md={12}>
                      <CFormLabel htmlFor="reportFiles">
                        Attach Files
                      </CFormLabel>
                      <CFormInput
                        type="file"
                        id="reportFiles"
                        multiple
                        onChange={(e) =>
                          setReportDetails({
                            ...reportDetails,
                            reportFiles: Array.from(e.target.files),
                          })
                        }
                      />
                    </CCol> */}
                    {rows.map((row, index) => (
                      <div className="row" key={index}>
                        <CCol md={4}>
                          <CFormLabel htmlFor="validationCustomUsername">
                            Report Attachment Type
                          </CFormLabel>
                          <select className="form-select">
                            <option value="">--select--</option>
                            {documentTypeList.map((fileType, idx) => (
                              <option key={idx} value={fileType.id}>
                                {fileType.name}
                              </option>
                            ))}
                          </select>
                        </CCol>
                        <CCol md={4}>
                          <CFormLabel htmlFor="validationCustomUsername">
                            Report Attachment
                          </CFormLabel>
                          <CInputGroup className="has-validation">
                            <input
                              defaultValue={row.doc_url}
                              onChange={(e) =>
                                handleFileChange(index, e.target.files[0])
                              }
                              type="file"
                              aria-describedby="inputGroupPrepend"
                              name="document"
                            />
                          </CInputGroup>
                        </CCol>
                        <CCol md={3} className="mt-3">
                          <CFormLabel htmlFor="validationCustomUsername">
                            {/* Attachment */}
                          </CFormLabel>
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
                          <span className="fa fa-plus"></span> More Report
                          Attachment
                        </button>
                      </CCol>
                    </div>
                    <CCol md={12} className="text-center">
                      <CButton type="submit" color="primary">
                        Add Report
                      </CButton>
                    </CCol>
                  </CForm>

                  {/* <div className="mt-4">
                    <h5>Existing Reports</h5>
                    {reports.length > 0 ? (
                      <div className="table-responsive">
                        <table className="table table-bordered table-striped">
                          <thead>
                            <tr>
                              <th>S/N</th>
                              <th>Date</th>
                              <th>Description</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {reports.map((report, index) => (
                              <tr key={report.id}>
                                <td>{index + 1}</td>
                                <td>{report.date}</td>
                                <td>{report.description}</td>
                                <td>
                                  <Button
                                    variant="info"
                                    onClick={() => handleViewReport(report.id)}
                                  >
                                    View
                                  </Button>
                                  <Button
                                    variant="secondary"
                                    onClick={() => handleEditReport(report.id)}
                                  >
                                    Edit
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p>No reports available.</p>
                    )}
                  </div> */}
                </div>
              </Card.Body>
            )}
          </Card>
        </Col>

        <Modal show={LegalModal}>
          <Modal.Header>
            <Button onClick={closeLegalModal} className="btn-close" variant="">
              x
            </Button>
          </Modal.Header>

          <Modal.Body>
            <div>
              <Card>
                <Card.Header>
                  <Card.Title as="h3">Attach legal Officer </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Col lg={12} md={12}>
                    <p>Please select legal Officers</p>
                    <Select
                      isMulti
                      options={legalOfficers.map((judge) => ({
                        value: judge.id,
                        label: `${
                          judge.surname +
                          " " +
                          judge.first_name +
                          " " +
                          judge.middle_name
                        }`,
                      }))}
                      value={legalOfficerId}
                      onChange={setSelectedCouncil}
                      getOptionLabel={(option) => option.label}
                    />
                  </Col>
                </Card.Body>
              </Card>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" className="me-1" onClick={closeLegalModal}>
              Close
            </Button>
            <Button
              variant="primary"
              className="me-1"
              onClick={(e) => handleAddLegalOfficer(e, params.id)}
            >
              Assign
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={ChamberModal}>
          <Modal.Header>
            <Button
              onClick={closeChamberModal}
              className="btn-close"
              variant=""
            >
              x
            </Button>
          </Modal.Header>

          <Modal.Body>
            <div>
              <Card>
                <Card.Header>
                  <Card.Title as="h3">Attach Chamber </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Col lg={12} md={12}>
                    <p>Please select Chamber</p>
                    <Select
                      isMulti
                      options={chambers.map((chamber) => ({
                        value: chamber.id,
                        label: `${chamber.chamber_name}`,
                      }))}
                      value={legalOfficerId}
                      onChange={setSelectedChamber}
                      getOptionLabel={(option) => option.label}
                    />
                  </Col>
                </Card.Body>
              </Card>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="dark" className="me-1" onClick={closeChamberModal}>
              Close
            </Button>
            <Button
              variant="primary"
              className="me-1"
              onClick={(e) => handleAddChamberOfficer(e)}
            >
              Assign
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={motionModal} size="lg">
          <Modal.Header>
            <Button onClick={closeMotionModal} className="btn-close" variant="">
              x
            </Button>
          </Modal.Header>

          <Modal.Body>
            <div>
              <Card>
                <Card.Header>
                  <Card.Title as="h3">Attach Motion </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Col lg={12} md={12}>
                    <p>
                      Please complete the details to assign motion to{" "}
                      {motionData && motionData.suite_no}
                    </p>
                  </Col>
                  <Row className="my-5">
                    <Col md={6}>
                      <label htmlFor="document type">Document Type</label>
                      <select
                        className="form-select"
                        name=""
                        id=""
                        onChange={(e) =>
                          setMotionDetails({
                            ...motionDetails,
                            doc_type_id: e.target.value,
                          })
                        }
                      >
                        <option value="">--select--</option>
                        {fileType &&
                          fileType.map((file) => (
                            <option value={file.id} key={file.id}>
                              {file.name}
                            </option>
                          ))}
                      </select>
                    </Col>
                    <Col md={6}>
                      <label htmlFor="document type">Document </label>
                      <input
                        onChange={(e) =>
                          setMotionDetails({
                            ...motionDetails,
                            doc_url: e.target.files[0],
                          })
                        }
                        className="form-control"
                        type="file"
                        name=""
                        id=""
                      />
                    </Col>
                  </Row>
                  <Row className="my-5">
                    <Col md={12}>
                      <label htmlFor="document type">Motion Description</label>
                      <textarea
                        className="form-control"
                        onChange={(e) =>
                          setMotionDetails({
                            ...motionDetails,
                            motion_description: e.target.value,
                          })
                        }
                      ></textarea>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="warning"
              className="me-1"
              onClick={closeMotionModal}
            >
              Close
            </Button>
            <Button
              variant="primary"
              className="me-1"
              onClick={(e) => handleAddMotion(e)}
            >
              Assign
            </Button>
          </Modal.Footer>
        </Modal>

        {openCaseModalData && (
          <Modal show={caseModal} size="lg">
            <Modal.Header></Modal.Header>

            <Modal.Body>
              <div>
                <Card>
                  <Card.Header>
                    <Card.Title as="h3">
                      {openCaseModalData.status === 2
                        ? "Reopen Case"
                        : "Close Case"}{" "}
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Col lg={12} md={12}>
                      <p>
                        Are you sure you want to{" "}
                        {openCaseModalData.status === 2
                          ? "Reopen Case"
                          : "Close Case"}
                        ?
                      </p>
                      {openCaseModalData.status !== 2 && (
                        <form className="row g-3 needs-validation">
                          <Col md={12}>
                            <label
                              htmlFor="validationCustomUsername"
                              className="form-label"
                            >
                              Comment
                            </label>
                            <textarea
                              className="form-control has-validation"
                              defaultValue=""
                              onChange={(e) => setComment(e.target.value)}
                              aria-describedby="inputGroupPrepend"
                              name="comment"
                            ></textarea>
                          </Col>
                        </form>
                      )}
                    </Col>
                  </Card.Body>
                </Card>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="warning"
                className="me-1"
                onClick={closeCaseModal}
              >
                Cancel
              </Button>

              <button
                className={`btn ${
                  openCaseModalData.status === 2
                    ? "btn-danger bright-btn btn-danger-bright"
                    : "btn-danger bright-btn btn-danger-bright"
                } mx-5`}
                onClick={
                  openCaseModalData.status === 2
                    ? () => handleReopenCaseClick(openCaseModalData.id)
                    : handleCloseCase
                }
              >
                {openCaseModalData.status === 2 ? `Reopen Case` : "Close Case"}
              </button>
            </Modal.Footer>
          </Modal>
        )}

        <Modal show={adjournCaseModal} size="md">
          <Modal.Header>
            <Button
              onClick={closeAdjournCaseModal}
              className="btn-close"
              variant=""
            >
              x
            </Button>
          </Modal.Header>

          <Modal.Body>
            <div>
              <Card>
                <Card.Header>
                  <Card.Title as="h3">Adjourn Case </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Row className="my-5">
                    <Col md={12}>
                      <label htmlFor="For date">Date </label>
                      <input
                        // onChange={(e) =>
                        //   setMotionDetails({
                        //     ...motionDetails,
                        //     doc_url: e.target.files[0],
                        //   })
                        // }
                        className="form-control"
                        type="date"
                      />
                    </Col>
                  </Row>
                  <Row className="my-5">
                    <Col md={12}>
                      <label htmlFor="For comment">Comment</label>
                      <textarea
                        className="form-control"
                        placeholder="Add a reason for the adjournment"
                        // onChange={(e) =>
                        //   setMotionDetails({
                        //     ...motionDetails,
                        //     motion_description: e.target.value,
                        //   })
                        // }
                      ></textarea>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="warning"
              className="me-1"
              onClick={closeAdjournCaseModal}
            >
              Close
            </Button>
            <Button
              variant="primary"
              className="me-1"
              onClick={(e) => handleAdjournCase(e)}
            >
              Adjourn
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
