import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import endpoint from "../../../context/endpoint";
import { Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import Loader from "../../../data/Loader/loader";
import "./SingleCaseReports.css";

export default function SingleCaseReport() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [reports, setReports] = useState([]);
  // const [reportsTypeTwo, setReportsTypeTwo] = useState([]);
  const [attachmentsModal, setAttachmentsModal] = useState({
    show: false,
    attachments: [],
  });
  const [searchQuery, setSearchQuery] = useState("");

  const params = useParams();
  const id = params.id;

  const iframeRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // const totalItems = reports.length;
  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentReports = reports.slice(indexOfFirstItem, indexOfLastItem);

  // Function for Pagination
  // const handleNextPage = () => {
  //   if (currentPage < totalPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // Function for Pagination
  // const handlePrevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // Function to Get Case Data
  const getCase = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await endpoint.get(`/case/show/${id}`);
      setData(data.data);
      setReports(data.data.CaseReports);
      console.log("Start ************************************************");
      console.log("Report", data.data.CaseReports);
      console.log("End ##################################################");

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }, [id, endpoint, setLoading, setData, setReports]);
  // console.log("Console Start");
  // console.log("Case Reports", reports);
  // console.log("Console End");

  // Function 2 to Get Case Data
  // const getCaseTypeTwo = async () => {
  //   setLoading(true);
  //   try {
  //     const { data } = await endpoint.get(`/case/show/${id}`);
  //     setData(data.data);
  //     setReportsTypeTwo(data.data.CaseReports);
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false);
  //   }
  // };
  // console.log("Console Start");
  // console.log("Case Reports Type 2", reportsTypeTwo);
  // console.log("Console End");

  useEffect(() => {
    getCase();
    // getCaseTypeTwo();
  }, [getCase]);

  // Function to View Attachment
  const handleViewAttachments = (reportId) => {
    const report = reports.find((report) => report.id === reportId);
    if (report && report.CaseReportAttachments) {
      setAttachmentsModal({
        show: true,
        attachments: report.CaseReportAttachments,
      });
    }
  };

  // Function to Formate Date
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

  // Function to Handle Print Fumctionality
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
    .mb-1 {
      margin-bottom: 0.25rem !important;
    }
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
              <div class="d-flex justify-content-between align-items-center mb-3">
                <p>
                  <strong>Submitted By:</strong> 
                  ${report.User.surname} ${report.User.first_name} ${
          report.User.middle_name
        }
                </p>
              </div>
              <hr class="my-4" />
              <div class="rpt-head row mt-7">
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
              .col-md-6 {
                position: relative;
                width: 50%;
                padding-right: 15px;
                padding-left: 15px;
                box-sizing: border-box;
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

  // Function to Filter Reports
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page when search query changes
  };

  const filteredReports = reports.filter((report) =>
    `${report.User.surname} ${report.User.first_name} ${report.User.middle_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
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

  return (
    <>
      <div>
        <Col xl={12} md={12}>
          <Card className="card border">
            <div className="mt-5 print-header">
              <div className="d-flex justify-content-center">
                <img
                  src="/img/njc-logo.png"
                  alt="NJC Logo"
                  height="150"
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
                    Case Reports for: {data && data.suite_no.toUpperCase()}
                  </h4>
                  <h5
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
                  </h5>
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
                            placeholder="Search by: Submitted By"
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
                                      className="d-flex justify-content-between align-items-center mb-3"
                                      style={{ marginTop: "-30px" }}
                                    >
                                      <p
                                        style={{
                                          marginTop: "20px",
                                          marginBottom: "-5px",
                                        }}
                                      >
                                        <strong>Submitted By:</strong>{" "}
                                        {report.User.surname}{" "}
                                        {report.User.first_name}{" "}
                                        {report.User.middle_name}
                                      </p>
                                      <div className="d-flex no-print">
                                        <Button
                                          variant="blue"
                                          onClick={() =>
                                            handleViewAttachments(report.id)
                                          }
                                          className="me-2"
                                        >
                                          View Attachments
                                        </Button>
                                        <Button
                                          variant="primary"
                                          onClick={() =>
                                            handlePrint(`report-${report.id}`)
                                          }
                                        >
                                          Print Report
                                        </Button>
                                      </div>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="rpt-head row mt-7">
                                      <div className="fw-bold col-md-6 mb-1">
                                        Sitting Date:
                                      </div>
                                      <div className="col-md-6">
                                        {formatDate(report.sitting_date)}
                                      </div>
                                    </div>
                                    <hr />
                                    {/* <p className="mt-7">
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
                                    <p className="">
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
                  <button onClick={handlePrevPage} disabled={currentPage === 1}>
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

        {/* Attachments Modal */}
        {attachmentsModal.show && (
          <Modal
            show={attachmentsModal.show}
            onHide={() =>
              setAttachmentsModal({ ...attachmentsModal, show: false })
            }
          >
            <Modal.Header closeButton>
              <Modal.Title
              // className="mx-auto !important"
              >
                Attachments
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="table-responsive">
                {attachmentsModal.attachments.length > 0 ? (
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
                      {attachmentsModal.attachments.map((attachment, index) => (
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
                              <span className="fa fa-eye"></span> View/Download
                            </a>
                          </td>
                        </tr>
                      ))}
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
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="red"
                onClick={() =>
                  setAttachmentsModal({ ...attachmentsModal, show: false })
                }
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
      <iframe
        ref={iframeRef}
        style={{ display: "none" }}
        title="Print Frame"
      ></iframe>
    </>
  );
}
