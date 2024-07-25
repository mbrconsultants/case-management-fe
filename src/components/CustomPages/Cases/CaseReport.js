import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import endpoint from "../../../context/endpoint";
import Select from "react-select";
import Loader from "../../../data/Loader/loader";
import {
  Breadcrumb,
  Row,
  Card,
  Col,
  Button,
  Modal,
  Form,
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
import { useForm } from "react-hook-form";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";
import "./styles.css";
import "./SingleCaseReports.css";

export default function CaseReport() {
  const [loading, setLoading] = useState(false);
  const [caseList, setCaseList] = useState([]);
  const [reports, setReports] = useState([]);
  const [data, setData] = useState();
  const [documentTypeList, setReportDocumentTypeList] = useState([]);
  const [selectedSuiteNo, setSelectedSuiteNo] = useState(null);
  const [reportDetails, setReportDetails] = useState({
    sitting_date: "",
    description: "",
    doc_urls: [],
    doc_type_id: "",
  });
  const [rows, setRows] = useState([{ doc_url: "" }]);

  const [reportUpdate, setReportUpdate] = useState({
    doc_urls: [],
    doc_type_id: "",
  });
  const [lines, setLines] = useState([{ doc_url: "" }]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const { register, handleSubmit, reset } = useForm();
  const [attachmentsModal, setAttachmentsModal] = useState({
    show: false,
    attachments: [],
    // report: null,
    doc_urls: [],
    doc_type_id: "",
  });

  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const iframeRef = useRef(null);

  useEffect(() => {
    getCaseList();
    getReportDocumentTypeList();
    getUserReports();
  }, []);

  // Pagination Functions
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Function to Filter Reports
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  const filteredReports = reports.filter((report) =>
    `${report.Case.suite_no}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = filteredReports.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReports = filteredReports.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to get suite number and case id
  // const getCaseList = async () => {
  //   setLoading(true);
  //   try {
  //     const res = await endpoint.get("/case/list/");
  //     setCaseList(res.data.Case);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // console.log("CaseList", data);

  const getCaseList = async () => {
    setLoading(true);
    try {
      const res = await endpoint.get(`/user/case-roster/show/${id}`);
      console.log("Response Data:", res.data);
      console.log("Response Data:", res);
      setCaseList(res.data.data); // Setting the entire data array
    } catch (err) {
      console.error("Error fetching case list:", err);
    } finally {
      setLoading(false);
    }
  };

  //Get user reports
  const getUserReports = async () => {
    setLoading(true);
    try {
      const { data } = await endpoint.get(`/user/case-reports/show/${id}`);
      setData(data.data);
      setReports(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  // console.log("User Report", data);

  //Function to get document type list
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
      });
  };

  //Function to add report
  const handleAddReport = async () => {
    try {
      const formData = new FormData();
      formData.append("case_id", selectedSuiteNo?.value || "");
      formData.append("sitting_date", reportDetails.sitting_date);
      formData.append("description", reportDetails.description);
      formData.append("doc_type_id", reportDetails.doc_type_id);
      for (let i = 0; i < reportDetails.doc_urls.length; i++) {
        formData.append("doc_urls", reportDetails.doc_urls[i]);
      }
      console.log("Add Report Payload:", formData);
      for (let pair of formData.entries()) {
        console.log("Payload Key Value Pair", pair[0] + ": " + pair[1]);
      }

      const response = await endpoint.post(`/case/submit-report`, formData);
      SuccessAlert(response.data.message);
      getUserReports();

      // Reset form fields
      reset();
      setReportDetails({
        sitting_date: "",
        description: "",
        doc_urls: [],
        doc_type_id: "",
      });
      setSelectedSuiteNo(null);
      setRows([{ doc_url: "" }]); // Reset the rows state to its initial value
    } catch (err) {
      console.log("Create Report Error", err);
      ErrorAlert("An error occurred. Please try again.");
    }
  };

  //Function to handle file change
  const handleFileChange = (index, file) => {
    const updatedRows = [...rows];
    updatedRows[index].doc_url = file;
    setRows(updatedRows);

    // Update reportFiles state
    const updatedFiles = [...reportDetails.doc_urls];
    updatedFiles[index] = file;
    setReportDetails({ ...reportDetails, doc_urls: updatedFiles });
  };

  //Function to handle document type change
  const handleDocTypeChange = (index, docType) => {
    setReportDetails((prevState) => {
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

    const updatedFiles = reportDetails.doc_urls.filter((_, i) => i !== index);
    setReportDetails({ ...reportDetails, doc_urls: updatedFiles });
  };

  //Function to view attachments
  const handleViewAttachments = (reportId) => {
    const report = reports.find((report) => report.id === reportId);
    if (report && report.CaseReportAttachments) {
      setAttachmentsModal({
        show: true,
        attachments: report.CaseReportAttachments,
        report,
      });
    }
  };

  //Function to format date to requested format
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const getDayWithSuffix = (day) => {
      const suffixes = ["th", "st", "nd", "rd"];
      const value = day % 100;
      return (
        day + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0])
      );
    };

    const day = getDayWithSuffix(date.getDate());
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month}, ${year}`;
  };

  //Function to handle print report
  const handlePrint = (contentId) => {
    const printContent = document.getElementById(contentId).innerHTML;
    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    doc.open();
    doc.write(`
      <html>
        <head>
          <style>
  @media print {
    .no-print { display: none; }
    body { margin: 20px; }
    .print-header {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      line-height: 1;
      margin-bottom: 40px;
    }
    .print-header * {
      margin: 0;
      padding: 0;
    }
    .print-header h4, .print-header h5 {
      text-align: center;
      color: #006400;
      font-weight: bold;
    }
    .page-break { page-break-before: always; }

    /* Add styles for rows and columns */
    .row {
      display: flex;
      flex-wrap: wrap;
      margin-right: -15px;
      margin-left: -15px;
    }
    .col-md-6 {
      position: relative;
      width: 50%;
      padding-right: 15px;
      padding-left: 15px;
      box-sizing: border-box;
    }
    /*.mb-1 {
      margin-bottom: 0.25rem !important;
    }*/
    .fw-bold {
      font-weight: 700 !important;
    }
    .description-body {
      margin-bottom: 1em;
      text-align: justify;
      text-justify: inter-word;
      width: 100%;
      max-width: 100%;
      margin: auto;
      padding-right: 1em;
      box-sizing: content-box;
    }
  }
</style>
        </head>
        <body>
          ${document.querySelector(".print-header").outerHTML}
          ${printContent}
        </body>
      </html>
    `);
    doc.close();
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  };

  const handlePrintAllReports = () => {
    const printHeader = document.querySelector(".print-header").outerHTML;
    const printContent = reports
      .map(
        (report, index) => `
        <div id="report-${report.id}" class="${
          index !== 0 ? "page-break" : ""
        }">
          <div class="card border border-success">
            <div class="card-body">
              <hr class="my-4" />
              <div class="rpt-head row mt-7">
                <div class="fw-bold col-md-6 mb-1">
                  Suite Number:
                </div>
                <div class="col-md-6">
                 ${report.Case.suite_no}
                </div>
              </div>
              <hr />
              <div class="rpt-head row">
                <div class="fw-bold col-md-6 mb-1">
                  Sitting Date:
                </div>
                <div class="col-md-6">
                  ${formatDate(report.sitting_date)}
                </div>
              </div>
              <hr />
              <div class="rpt-head row">
                <div class="fw-bold col-md-6">
                  Created At:
                </div>
                <div class="col-md-6">
                  ${formatDate(report.createdAt)}
                </div>
              </div>
              <hr />
              <br />
              <p class="">
                <strong>Description:</strong>
              </p>
              <div class="description-body">
                ${report.description}
              </div>
            </div>
          </div>
        </div>
      `
      )
      .join("");

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow.document;

    doc.open();
    doc.write(`
      <html>
        <head>
          <style>
            @media print {
              .no-print { display: none; }
              body { margin: 20px; }
              .print-header {
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                line-height: 1;
                margin-bottom: 40px;
              }
              .print-header * {
                margin: 0;
                padding: 0;
              }
              .print-header h4, .print-header h5 {
                text-align: center;
                color: #006400;
                font-weight: bold;
              }
              .rpt-head {
                display: flex;
                flex-wrap: wrap;
                margin-right: -15px;
                margin-left: -15px;
              }
              .row {
                display: flex;
                flex-wrap: wrap;
                margin-right: -15px;
                margin-left: -15px;
              }
              .col-md-6 {
                position: relative;
                width: 50%;
                padding-right: 15px;
                padding-left: 15px;
                box-sizing: border-box;
              }
              /*.mb-1 {
                margin-bottom: 0.25rem !important;
              }*/
              .fw-bold {
                font-weight: 700 !important;
              }
              .description-body {
                margin-bottom: 1em;
                text-align: justify;
                text-justify: inter-word;
                width: 100%;
                max-width: 100%;
                margin: auto;
                padding-right: 1em;
                box-sizing: content-box;
              }
              .page-break { page-break-before: always; }
            }
          </style>
        </head>
        <body>
          ${printHeader}
          ${printContent}
        </body>
      </html>
    `);
    doc.close();
    iframe.contentWindow.focus();
    iframe.contentWindow.print();
  };

  const [editModal, setEditModal] = useState({ show: false, report: null });
  const [editReportDetails, setEditReportDetails] = useState({
    sitting_date: "",
    description: "",
    doc_urls: [],
    doc_type_id: "",
  });
  const [editRows, setEditRows] = useState([{ doc_url: "" }]);

  //Function to populate fields to edit report
  const handleEditReport = (report) => {
    setEditReportDetails({
      sitting_date: report.sitting_date,
      description: report.description,
      // doc_urls: report.CaseReportAttachments.map((att) => att.doc_url),
      // doc_type_id: report.CaseReportAttachments.map((att) => att.doc_type_id),
    });
    // setEditRows(
    //   report.CaseReportAttachments.map((att) => ({ doc_url: att.doc_url }))
    // );
    setEditModal({ show: true, report });
  };

  //Function to handle file change in report edit modal
  const handleEditFileChange = (index, file) => {
    const updatedRows = [...editRows];
    updatedRows[index].doc_url = file;
    setEditRows(updatedRows);

    const updatedFiles = [...editReportDetails.doc_urls];
    updatedFiles[index] = file;
    setEditReportDetails({ ...editReportDetails, doc_urls: updatedFiles });
  };

  //Function to handle document type change in report edit modal
  const handleEditDocTypeChange = (index, docType) => {
    setEditReportDetails((prevState) => {
      const newdoc_type_id = [...prevState.doc_type_id];
      newdoc_type_id[index] = docType;
      return { ...prevState, doc_type_id: newdoc_type_id };
    });
  };

  //Function to add row for report attachment in edit report modal
  const handleEditAddRow = () => {
    setEditRows([...editRows, { doc_url: "" }]);
  };

  //Function to remove row for report attachment in edit report modal
  const handleEditRemoveRow = (index) => {
    const updatedRows = editRows.filter((_, i) => i !== index);
    setEditRows(updatedRows);

    const updatedFiles = editReportDetails.doc_urls.filter(
      (_, i) => i !== index
    );
    setEditReportDetails({ ...editReportDetails, doc_urls: updatedFiles });
  };

  // Function to delete attachment
  const handleDeleteAttachment = async (attachmentId) => {
    await endpoint
      .delete(`/case/reports/delete-attachment/${attachmentId}`)
      .then((res) => {
        // console.log(res.data)
        SuccessAlert(res.data.message);
        getUserReports();
        setLoading(false);
      })
      .catch((err) => {
        ErrorAlert(err.response.data.message);
        // console.log(err)
      });
    // Block to update the state to remove the deleted attachment from the list
    // setAttachmentsModal((prevState) => ({
    //   ...prevState,
    //   attachments: prevState.attachments.filter(
    //     (attachment) => attachment.id !== attachmentId
    //   ),
    // }));
    // Reset form fields
    reset();
    setAttachmentsModal({ show: false, attachments: [] });
  };

  //Function to update report attachment
  const handleUpdateAttachment = async (data) => {
    try {
      const formData = new FormData();
      formData.append("doc_type_id", reportUpdate.doc_type_id);
      for (let i = 0; i < reportUpdate.doc_urls.length; i++) {
        formData.append("doc_urls", reportUpdate.doc_urls[i]);
      }
      console.log("Update Attachment Payload:", formData);
      for (let pair of formData.entries()) {
        console.log("Payload Key Value Pair", pair[0] + ": " + pair[1]);
      }

      const response = await endpoint.post(
        `/case/reports/add-more-attachment/${attachmentsModal.report.id}`,
        formData
      );
      SuccessAlert(response.data.message);

      // Fetch updated report data
      const updatedReport = await endpoint.get(
        `/case/reports/show/${attachmentsModal.report.id}`
      );

      // Close modal and reset form fields
      reset();
      setAttachmentsModal({
        show: false,
        attachments: updatedReport.data.CaseReportAttachments,
        report: null,
      });
      setReportUpdate({
        doc_urls: [],
        doc_type_id: "",
      });
      setLines([{ doc_url: "" }]);
      getUserReports();
    } catch (err) {
      console.log("Update Report Error", err);
      ErrorAlert("An error occurred. Please try again.");
    }
  };

  //Function to update report
  const handleUpdateReport = async () => {
    try {
      const formData = new FormData();
      formData.append("sitting_date", editReportDetails.sitting_date);
      formData.append("description", editReportDetails.description);
      // formData.append("doc_type_id", editReportDetails.doc_type_id);
      // for (let i = 0; i < editReportDetails.doc_urls.length; i++) {
      //   formData.append("doc_urls", editReportDetails.doc_urls[i]);
      // }

      const response = await endpoint.post(
        `/case/reports/edit/${editModal.report.id}`,
        formData
      );
      SuccessAlert(response.data.message);

      // Close modal and reset form fields
      setEditModal({ show: false, report: null });
      getUserReports();
    } catch (err) {
      console.log("Update Report Error", err);
      ErrorAlert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Case Report</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Create/View/Edit Case Report
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        {/* <div className="ms-auto pageheader-btn">
          <Link
            to={`${process.env.PUBLIC_URL}/cases/`}
            className="btn btn-primary btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-eye"></i>&nbsp;
            </span>
            View Case
          </Link>
        </div> */}
      </div>
      <div>
        <Col xl={12} md={12}>
          <Card className="card border">
            <Card.Body>
              <div>
                {/* <div
                  className="container bg-primary text-white custom-height"
                  style={{ height: "50px", borderRadius: "5px" }}
                >
                  <h4 className="text-center text-uppercase pt-3">
                    Create Case Report
                  </h4>
                </div> */}
                <CForm
                  onSubmit={handleSubmit(handleAddReport)}
                  className="row g-3 needs-validation"
                >
                  <CCol md={6}>
                    <CFormLabel htmlFor="suite_no">Suite Number</CFormLabel>
                    <Select
                      id="suite_no"
                      options={caseList.map((caseItem) => ({
                        value: caseItem.Case.id,
                        label: caseItem.Case.suite_no,
                      }))}
                      value={selectedSuiteNo}
                      onChange={setSelectedSuiteNo}
                    />
                  </CCol>
                  <CCol md={6}>
                    <CFormLabel htmlFor="sitting_date">Sitting Date</CFormLabel>
                    <CFormInput
                      type="date"
                      id="sitting_date"
                      value={reportDetails.sitting_date}
                      onChange={(e) =>
                        setReportDetails({
                          ...reportDetails,
                          sitting_date: e.target.value,
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
                      value={reportDetails.description}
                      onChange={(e) =>
                        setReportDetails({
                          ...reportDetails,
                          description: e.target.value,
                        })
                      }
                      rows="6" // increase the height of the textarea
                    ></CFormTextarea>
                  </CCol>
                  {rows.map((row, index) => (
                    <div key={index}>
                      <div className="row">
                        <CCol md={6}>
                          <CFormLabel htmlFor="validationCustomUsername">
                            Report Attachment Type
                          </CFormLabel>
                          <select
                            className="form-select"
                            value={reportDetails.doc_type_id[index] || ""}
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
                      </div>
                      <div className="row mt-2">
                        <CCol md={12} className="d-flex justify-content-start">
                          {index !== 0 && (
                            <CButton
                              className="me-2"
                              size="sm"
                              color="red"
                              onClick={() => handleRemoveRow(index)}
                            >
                              Remove
                            </CButton>
                          )}
                          {index === rows.length - 1 && (
                            <CButton
                              className="btn btn-secondary"
                              size="sm"
                              onClick={handleAddRow}
                            >
                              Add
                            </CButton>
                          )}
                        </CCol>
                      </div>
                    </div>
                  ))}
                  <CCol xs={12} className="d-flex justify-content-center">
                    <CButton color="primary" type="submit">
                      Submit Report
                    </CButton>
                  </CCol>
                </CForm>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <div>
          <Col xl={12} md={12}>
            <Card className="card border">
              <div className="mt-5 print-header">
                <div className="d-flex justify-content-center">
                  <img
                    src="/img/njc-logo.png"
                    alt="NJC Logo"
                    height="120"
                    width="185"
                  />
                </div>
                <div
                  className="container custom-height"
                  style={{ height: "auto", borderRadius: "5px" }}
                >
                  <div className="text-center">
                    <h4
                      className="pt-3"
                      style={{
                        color: `#006400`,
                        fontSize: `25px`,
                        fontWeight: `bold`,
                      }}
                    >
                      My Reports
                    </h4>
                    {/* <h5
                      style={{
                        color: `#006400`,
                        fontSize: `20px`,
                        fontWeight: `bold`,
                      }}
                    >
                      Court: {data && data.Court.name}
                    </h5>
                    <h5
                      style={{
                        color: `#006400`,
                        fontSize: `20px`,
                        fontWeight: `bold`,
                      }}
                    >
                      Parties Involved: {data && data.parties} 
                    </h5>*/}
                  </div>
                </div>
                <hr className="my-4" />
              </div>
              <Card.Body>
                <div className="mt-4">
                  {loading ? (
                    <Loader />
                  ) : (
                    <>
                      {reports && reports.length > 0 ? (
                        <>
                          <div className="d-flex justify-content-between mb-4">
                            <Form.Control
                              type="text"
                              placeholder="Search by: Suite Number"
                              value={searchQuery}
                              onChange={handleSearch}
                              className="no-print"
                              style={{ width: "300px" }}
                            />
                            <Button
                              variant="primary"
                              onClick={handlePrintAllReports}
                              className="no-print"
                            >
                              Print All Reports
                            </Button>
                          </div>
                          <div id="all-reports">
                            <Row>
                              {currentReports.map((report, index) => (
                                <Col
                                  xl={12}
                                  md={12}
                                  key={report.id}
                                  id={`report-${report.id}`}
                                  className={index !== 0 ? "page-break" : ""}
                                >
                                  <Card className="card border border-success">
                                    <Card.Body>
                                      <div
                                        className="d-flex justify-content-end align-items-center mb-2"
                                        style={{ marginTop: "-30px" }}
                                      >
                                        {/* <p>
                                          <strong>Submitted By:</strong>{" "}
                                          {report.User.surname}{" "}
                                          {report.User.first_name}{" "}
                                          {report.User.middle_name}
                                        </p> */}
                                        <div className="d-flex no-print">
                                          <Button
                                            variant="blue"
                                            onClick={() =>
                                              handleViewAttachments(
                                                report.id,
                                                report
                                              )
                                            }
                                            className="me-2"
                                          >
                                            Edit/View Attachments
                                          </Button>
                                          <Button
                                            variant="primary"
                                            onClick={() =>
                                              handlePrint(`report-${report.id}`)
                                            }
                                          >
                                            Print Report
                                          </Button>
                                          <Button
                                            variant="red"
                                            onClick={() =>
                                              handleEditReport(report)
                                            }
                                            className="me-2 ms-2 no-print"
                                          >
                                            Edit Report
                                          </Button>
                                        </div>
                                      </div>
                                      <hr className="my-2" />
                                      <div className="rpt-head row mt-7">
                                        <div className="fw-bold col-md-6 mb-1">
                                          Suite Number:
                                        </div>
                                        <div className="col-md-6">
                                          {report.Case.suite_no}
                                        </div>
                                      </div>
                                      <hr />
                                      {/* <p>
                                        <strong>Suite Number:</strong>{" "}
                                        {formatDate(report.Case.suite_no)}
                                      </p> */}
                                      <div className="rpt-head row">
                                        <div className="fw-bold col-md-6 mb-1">
                                          Sitting Date:
                                        </div>
                                        <div className="col-md-6">
                                          {formatDate(report.sitting_date)}
                                        </div>
                                      </div>
                                      <hr />
                                      {/* <p>
                                        <strong>Sitting Date:</strong>{" "}
                                        {formatDate(report.sitting_date)}
                                      </p> */}
                                      <div className="rpt-head row">
                                        <div className="fw-bold col-md-6">
                                          Created At:
                                        </div>
                                        <div className="col-md-6">
                                          {formatDate(report.createdAt)}
                                        </div>
                                      </div>
                                      <hr />
                                      {/* <p>
                                        <strong>Created At:</strong>{" "}
                                        {formatDate(report.createdAt)}
                                      </p> */}
                                      <br />
                                      <p className="fw-bold">
                                        <strong>Description:</strong>
                                      </p>
                                      <div className="description-body">
                                        {report.description}
                                      </div>
                                    </Card.Body>
                                  </Card>
                                </Col>
                              ))}
                            </Row>
                          </div>
                        </>
                      ) : (
                        <p style={{ textAlign: "center" }}>
                          <img
                            src="/img/folder_icn.png"
                            alt="No reports icon"
                            height="50"
                            width="50"
                          />
                          No reports available.
                        </p>
                      )}
                    </>
                  )}
                  {/* Pagination controls */}
                  <div className="pagination-controls">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    <span>
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          {/* Attachment Modal */}
          {attachmentsModal.show && (
            <Modal
              show={attachmentsModal.show}
              onHide={() => {
                setAttachmentsModal({
                  ...attachmentsModal,
                  show: false,
                  report: null,
                });
              }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Attachments</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="table-responsive">
                  {attachmentsModal.attachments.length > 0 ? (
                    <table className="table table-bordered table-striped">
                      <thead style={{ background: "#0A7E51" }}>
                        <tr>
                          <th style={{ color: "#fff", fontWeight: 900 }}>
                            S/N
                          </th>
                          <th style={{ color: "#fff", fontWeight: 900 }}>
                            Attachment Type
                          </th>
                          <th style={{ color: "#fff", fontWeight: 900 }}>
                            Attachment
                          </th>
                          <th style={{ color: "#fff", fontWeight: 900 }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {attachmentsModal.attachments.map(
                          (attachment, index) => (
                            <tr key={attachment.id}>
                              <td>{index + 1}</td>
                              <td>
                                {attachment.FileType
                                  ? attachment.FileType.name
                                  : "N/A"}
                              </td>
                              <td>
                                <a
                                  href={`${process.env.REACT_APP_UPLOAD_URL}${attachment.doc_url}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn btn-sm btn-primary bright-btn btn-secondary-bright m-1"
                                >
                                  <span className="fa fa-eye"></span>{" "}
                                  View/Download
                                </a>
                              </td>
                              <td>
                                <button
                                  className="btn btn-dark btn-sm bright-btn btn-dark-bright"
                                  onClick={() =>
                                    handleDeleteAttachment(attachment.id)
                                  }
                                >
                                  <span className="fe fe-trash"></span>
                                </button>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <p className="mt-3" style={{ textAlign: "center" }}>
                      <img
                        src="/img/folder_icn.png"
                        alt="No attachments icon"
                        height="50"
                        width="50"
                      />
                      No attachments available.
                    </p>
                  )}
                </div>

                <CForm onSubmit={handleSubmit(handleUpdateAttachment)}>
                  {lines.map((row, index) => (
                    <div key={index}>
                      <div className="row">
                        <CCol md={6}>
                          <CFormLabel htmlFor="edit_validationCustomUsername">
                            Report Attachment Type
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
                            Report Attachment
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
                  <Modal.Footer>
                    <CButton color="primary" type="submit">
                      Update
                    </CButton>
                    <Button
                      variant="red"
                      onClick={() =>
                        setAttachmentsModal({
                          ...attachmentsModal,
                          show: false,
                        })
                      }
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </CForm>
              </Modal.Body>
            </Modal>
          )}

          {editModal.show && (
            <Modal
              show={editModal.show}
              onHide={() => setEditModal({ show: false, report: null })}
            >
              <Modal.Header closeButton>
                <Modal.Title>Edit Report</Modal.Title>
              </Modal.Header>
              <CForm
                onSubmit={handleSubmit(handleUpdateReport)}
                className="row g-3 needs-validation"
              >
                <Modal.Body>
                  <CCol md={12}>
                    <CFormLabel htmlFor="edit_sitting_date">
                      Sitting Date
                    </CFormLabel>
                    <CFormInput
                      type="date"
                      id="edit_sitting_date"
                      defaultValue={editReportDetails.sitting_date}
                      onChange={(e) =>
                        setEditReportDetails({
                          ...editReportDetails,
                          sitting_date: e.target.value,
                        })
                      }
                    />
                  </CCol>
                  <CCol md={12}>
                    <CFormLabel htmlFor="edit_reportDescription">
                      Report Description
                    </CFormLabel>
                    <CFormTextarea
                      id="edit_reportDescription"
                      value={editReportDetails.description}
                      onChange={(e) =>
                        setEditReportDetails({
                          ...editReportDetails,
                          description: e.target.value,
                        })
                      }
                      rows="6"
                    ></CFormTextarea>
                  </CCol>

                  {/* <CCol
                    xs={12}
                    className="d-flex justify-content-center"
                  ></CCol> */}
                </Modal.Body>
                <Modal.Footer>
                  <CButton color="primary" type="submit">
                    Update Report
                  </CButton>
                  <Button
                    variant="red"
                    onClick={() => setEditModal({ show: false, report: null })}
                  >
                    Close
                  </Button>
                </Modal.Footer>
              </CForm>
            </Modal>
          )}
        </div>
      </div>
      <iframe
        ref={iframeRef}
        style={{ display: "none" }}
        title="Print Frame"
      ></iframe>
    </>
  );
}
