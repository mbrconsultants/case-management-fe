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
  const [legalOfficers, setLegalOfficers] = useState([]);
  const [chambers, setChambers] = useState([]);
  const [legalOfficerId, setLegalOfficerId] = useState();
  const [chamberId, setChamberId] = useState();
  const [attachment, setCaseAttachment] = useState([]);
  const [assigncouncils, setAssignCouncils] = useState([]);
  const [assignsolicitors, setAssignSolicitors] = useState([]);
  const [fileType, setFileType] = useState();
  const [selectedCouncil, setSelectedCouncil] = useState(null);
  const [selectedChamber, setSelectedChamber] = useState(null);
  const [ChamberModal, setChamberModal] = useState(false);
  const [LegalModal, setLegalModal] = useState(false);
  const [caseList, setCaseList] = useState([]);
  const [selectedSuiteNo, setSelectedSuiteNo] = useState(null);

  const [reportDetails, setReportDetails] = useState({
    hearing_date: "",
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

  const params = useParams();
  const id = params.id;

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

  useEffect(() => {
    // getCase();
    getCaseList();
    getLegalOfficer();
    getChambers();
    getFileType();
    getReportDocumentTypeList();
  }, []);

  //   const getCase = async () => {
  //     setLoading(true);
  //     await endpoint
  //       .get(`/case/show/${id}`)
  //       .then(({ data }) => {
  //         console.log("case", data.data);
  //         setData(data.data);
  //         setAssignCouncils(data.data.AssignCouncils);
  //         setAssignSolicitors(data.data.AssignSolicitors);
  //         setCaseAttachment(data.data.CaseAttachments);
  //         setReports(data.data.Reports); // Assuming `Reports` is the array of reports from the API
  //         setLoading(false);
  //       })
  //       .catch((err) => console.log(err));
  //   };

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
      //   getCase();
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
      //   getCase();
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

  const getCaseList = async () => {
    setLoading(true);
    try {
      const res = await endpoint.get("/case/list");
      setCaseList(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReport = async () => {
    try {
      const formData = new FormData();
      formData.append("suite_no", selectedSuiteNo?.value || "");
      formData.append("hearing_date", reportDetails.hearing_date);
      formData.append("report_description", reportDetails.reportDescription);
      formData.append("report_doc_type", reportDetails.reportDocType);
      for (let i = 0; i < reportDetails.reportFiles.length; i++) {
        formData.append("report_files", reportDetails.reportFiles[i]);
      }
      console.log("Payload:", formData);
      for (let pair of formData.entries()) {
        console.log("Payload Key Value Pair", pair[0] + ": " + pair[1]);
      }

      const response = await endpoint.post(`/report/create`, formData);
      SuccessAlert(response.data.message);
      //   getCase(); // Refresh case data to show the new report
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
    setReportDetails((prevState) => {
      const newReportFiles = [...prevState.reportFiles];
      newReportFiles[index] = file;
      return { ...prevState, reportFiles: newReportFiles };
    });
  };

  const handleDocTypeChange = (index, docType) => {
    setReportDetails((prevState) => {
      const newReportDocTypes = [...prevState.reportDocType];
      newReportDocTypes[index] = docType;
      return { ...prevState, reportDocType: newReportDocTypes };
    });
  };

  return (
    <>
      <div>
        <Col xl={12} md={12}>
          <Card className="card border">
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
                  <h6 className="text-center pt-3">Create Case Report</h6>
                </div>
                <CForm
                  onSubmit={handleSubmit(handleAddReport)}
                  className="row g-3 needs-validation"
                >
                  <CCol md={6}>
                    <CFormLabel htmlFor="suite_no">Suite Number</CFormLabel>
                    <Select
                      id="suite_no"
                      options={caseList.map((caseItem) => ({
                        value: caseItem.suite_no,
                        label: caseItem.suite_no,
                      }))}
                      value={selectedSuiteNo}
                      onChange={setSelectedSuiteNo}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="hearing_date">Hearing Date</CFormLabel>
                    <CFormInput
                      type="date"
                      id="hearing_date"
                      value={reportDetails.hearing_date}
                      onChange={(e) =>
                        setReportDetails({
                          ...reportDetails,
                          hearing_date: e.target.value,
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
                  {rows.map((row, index) => (
                    <div className="row" key={index}>
                      <CCol md={6}>
                        <CFormLabel htmlFor="validationCustomUsername">
                          Report Attachment Type
                        </CFormLabel>
                        <select
                          className="form-select"
                          onChange={(e) =>
                            handleDocTypeChange(index, e.target.value)
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
                      <CCol md={2} className="mt-3">
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
          </Card>
        </Col>
      </div>
    </>
  );
}
