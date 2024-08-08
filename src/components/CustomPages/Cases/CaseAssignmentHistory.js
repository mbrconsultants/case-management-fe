import React, { useState, useContext, useEffect } from "react";
import {
  Breadcrumb,
  Col,
  Row,
  Card,
  FormGroup,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
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
import endpoint from "../../../context/endpoint";
import { useForm } from "react-hook-form";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";
import "./styles.css";
import Select from "react-select";
import { Context } from "../../../context/Context";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./CaseAssignmentHistory.css";

export default function CaseAssignmentHistory() {
  const [caseList, setCaseList] = useState([]);
  const [singlecaseAssignmentHistory, setSingleCaseAssignmentHistory] =
    useState([]);
  const [assignmentHistory, setAssignmentHistory] = useState([]);
  const [selectedSuitNo, setSelectedSuitNo] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  //# Tab State and Functions
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //##

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    getCaseList();
    totalAssignmentHistory();
  }, []);

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
  console.log("CaseList", caseList);

  //case-assignment-history
  const totalAssignmentHistory = async () => {
    setLoading(true);
    try {
      const res = await endpoint.get("/case/assignment-history");
      setAssignmentHistory(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  console.log("Total Assignment History", assignmentHistory);

  // Function to fetch single case assignment history
  const handleGetHistory = async () => {
    if (!selectedSuitNo) {
      ErrorAlert("Please select a suite number.");
      return;
    }
    setLoading(true);
    try {
      const caseId = selectedSuitNo.value;
      console.log("Selected Case ID:", caseId);

      const response = await endpoint.get(
        `/case/get-assignment-history/${caseId}`
      );

      setSingleCaseAssignmentHistory(response.data.data);
      setDataLoaded(true);
    } catch (err) {
      if (err.response?.data?.message) {
        ErrorAlert(err.response.data.message);
      } else {
        ErrorAlert("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
      // Reset form only if the API call was successful
      if (dataLoaded) {
        reset();
        setSelectedSuitNo(null);
      }
    }
  };

  console.log("Start ************************************************");
  console.log("Single  Case Data", singlecaseAssignmentHistory);
  console.log("End ##################################################");

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

  // Case Description Ellipses Block
  const [showModal, setShowModal] = useState(false);

  const handleViewMore = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const groupedAssignments =
    singlecaseAssignmentHistory?.AllAssignments?.reduce((acc, assignment) => {
      const { group_unique_code } = assignment;
      if (!acc[group_unique_code]) {
        acc[group_unique_code] = [];
      }
      acc[group_unique_code].push(assignment);
      return acc;
    }, {});

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Case Assignment History</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Registry
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Assignment History
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
      <div className="d-flex justify-content-center align-items-center">
        <div className="container-fluid">
          <br />
          <br />
          <Row className="row g-0 justify-content-center">
            <Col xs={12} sm={8} md={6} lg={6}>
              <Card>
                <Card.Header>
                  <Card.Title
                    as="h3"
                    className="text-nowrap"
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    Select Suite Number to View Case Assignment History
                  </Card.Title>
                </Card.Header>
                <CForm onSubmit={handleSubmit(handleGetHistory)}>
                  <Card.Body>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ flexGrow: 1, marginRight: "10px" }}>
                        <CFormLabel htmlFor="suite_no">Suite Number</CFormLabel>
                        <Select
                          id="suite_no"
                          options={caseList.map((caseItem) => ({
                            value: caseItem.id,
                            label: caseItem.suite_no,
                          }))}
                          value={selectedSuitNo}
                          onChange={setSelectedSuitNo}
                          menuPortalTarget={document.body}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            container: (base) => ({
                              ...base,
                              position: "relative",
                              overflow: "visible",
                            }),
                            control: (base) => ({ ...base, zIndex: 1 }),
                          }}
                        />
                      </div>
                      <CButton className="mt-6" type="submit" color="primary">
                        Get History
                      </CButton>
                    </div>
                  </Card.Body>
                </CForm>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div>
        <Box sx={{ width: "100%", marginTop: "1rem" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Active Assignment" />
              <Tab label="Previous Assignment" />
              <Tab label="Assignment History" />
            </Tabs>
          </Box>
          {value === 0 && (
            <Box sx={{ p: 3 }}>
              {dataLoaded &&
              Object.keys(singlecaseAssignmentHistory).length > 0 ? (
                <div>
                  {/* <div className="text-center">
                    <div className="d-inline-block py-3">
                      <h3
                        className="text-center text-primary bg-white"
                        style={{
                          paddingRight: "30px",
                          paddingLeft: "30px",
                          paddingTop: "30px",
                          paddingBottom: "30px",
                          border: "1px solid",
                          borderColor: "green",
                          borderStyle: "solid",
                        }}
                      >
                        Active Assignment for Case:{" "}
                        {singlecaseAssignmentHistory?.suite_no}
                      </h3>
                    </div>
                  </div> */}
                  {/* <div className="text-center">
                    <div className="d-inline-block py-3">
                      <h3
                        className="text-center text-white bg-primary border-success  py-1"
                        style={{ paddingRight: "30px", paddingLeft: "30px" }}
                      >
                        Active Assignment for Case:{" "}
                        {singlecaseAssignmentHistory?.suite_no}
                      </h3>
                    </div>
                  </div> */}
                  <h3 className="text-center text-white bg-primary border border-success px-2 py-1">
                    Active Assignment for Case:{" "}
                    {singlecaseAssignmentHistory?.suite_no}
                  </h3>

                  <div className="row m-5">
                    {singlecaseAssignmentHistory && (
                      <div className="col-md-12">
                        <div className="row border">
                          <div className="fw-bold col-md-6">Court:</div>
                          <div className="col-md-6">
                            {singlecaseAssignmentHistory?.Court?.name || ""}
                          </div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">Parties:</div>
                          <div className="col-md-6">
                            {singlecaseAssignmentHistory?.parties}
                          </div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">Case Type:</div>
                          <div className="col-md-6">
                            <span
                              className="btn bright-btn btn-secondary-bright m-1"
                              style={{
                                backgroundColor: `${
                                  singlecaseAssignmentHistory?.CaseType
                                    ?.case_color || ""
                                }`,
                                color: "white",
                                paddingTop: "5px",
                                paddingLeft: "7px",
                                paddingRight: "7px",
                                paddingBottom: "5px",
                                borderRadius: "7px",
                                boxShadow: "6px 6px 15px rgba(0, 0, 0, 0.7)",
                              }}
                            >
                              {singlecaseAssignmentHistory?.CaseType
                                ?.case_type || ""}
                            </span>
                          </div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">
                            Case Description:
                          </div>
                          <div className="col-md-6">
                            <div className="ellipsis-text casedesc-txt">
                              {singlecaseAssignmentHistory?.case_description}
                            </div>
                            <div className="casedesc-txt text-end">
                              {singlecaseAssignmentHistory?.case_description
                                ?.length > 200 && ( // Adjust this condition based on content length
                                <button
                                  className="btn btn-sm btn-primary bright-btn btn-secondary-bright m-1 mt-2"
                                  onClick={() => setShowModal(true)}
                                >
                                  View More
                                </button>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">Hearing Date:</div>
                          <div className="col-md-6">
                            {singlecaseAssignmentHistory?.hearing_date
                              ? formatDate(
                                  singlecaseAssignmentHistory?.hearing_date
                                )
                              : ""}
                          </div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">
                            Legal Officer(s):
                          </div>
                          <div className="col-md-6">
                            {singlecaseAssignmentHistory?.ActiveRoster?.length >
                            0 ? (
                              singlecaseAssignmentHistory.ActiveRoster.map(
                                (council, index) => (
                                  <span key={index}>
                                    <h3
                                      className="btn btn-sm btn-primary bright-btn btn-secondary-bright m-1"
                                      style={{ fontSize: "16px" }}
                                    >
                                      {council?.LegalOfficer?.surname}{" "}
                                      {council?.LegalOfficer?.first_name}
                                    </h3>
                                  </span>
                                )
                              )
                            ) : (
                              <p>No Active Assignment for this Case</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="mt-3" style={{ textAlign: "center" }}>
                  <img
                    src="/img/folder_icn.png"
                    alt="No record icon"
                    height="50"
                    width="50"
                  />
                  No record available, select case to view data
                </p>
              )}
            </Box>
          )}

          {value === 1 && (
            <Box sx={{ p: 3 }}>
              {dataLoaded &&
              Object.keys(singlecaseAssignmentHistory).length > 0 ? (
                <div>
                  <h3 className="text-center text-white bg-primary border border-success px-2 py-1">
                    Previous Assignment for Case:{" "}
                    {singlecaseAssignmentHistory?.suite_no}
                  </h3>
                  <div className="row m-5">
                    {singlecaseAssignmentHistory && (
                      <div className="col-md-12">
                        <div className="row border">
                          <div className="fw-bold col-md-6">
                            Legal Officer(s):
                          </div>
                          <div className="col-md-6">
                            {singlecaseAssignmentHistory?.InactiveRoster
                              ?.length > 0 ? (
                              singlecaseAssignmentHistory.InactiveRoster.map(
                                (council, index) => (
                                  <span key={index}>
                                    <h3
                                      className="btn btn-sm btn-primary bright-btn btn-secondary-bright m-1"
                                      style={{ fontSize: "16px" }}
                                    >
                                      {council?.LegalOfficer?.surname}{" "}
                                      {council?.LegalOfficer?.first_name}
                                    </h3>
                                  </span>
                                )
                              )
                            ) : (
                              <p>No Previous Assignment for this Case</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <p className="mt-3" style={{ textAlign: "center" }}>
                  <img
                    src="/img/folder_icn.png"
                    alt="No record icon"
                    height="50"
                    width="50"
                  />
                  No record available, select case to view data
                </p>
              )}
            </Box>
          )}

          {value === 2 && (
            <Box sx={{ p: 3 }}>
              {dataLoaded &&
              Object.keys(singlecaseAssignmentHistory).length > 0 ? (
                <div>
                  <h3 className="text-center text-white bg-primary border border-success px-2 py-1">
                    Assignment History for Case:{" "}
                    {singlecaseAssignmentHistory?.suite_no}
                  </h3>
                  <div className="row m-5">
                    <div className="col-md-12">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">S/N</th>
                            <th scope="col">Assignment</th>
                            <th scope="col">Date Assigned</th>
                          </tr>
                        </thead>
                        <tbody>
                          {groupedAssignments &&
                          Object.keys(groupedAssignments).length > 0 ? (
                            Object.keys(groupedAssignments).map(
                              (groupUniqueCode, index) => (
                                <tr key={groupUniqueCode}>
                                  <th scope="row">{index + 1}</th>
                                  <td>
                                    {groupedAssignments[groupUniqueCode].map(
                                      (assignment, idx) => (
                                        <div key={idx}>
                                          <h3
                                            className="btn btn-sm btn-primary bright-btn btn-secondary-bright m-1"
                                            style={{ fontSize: "16px" }}
                                          >
                                            {assignment?.LegalOfficer?.surname}{" "}
                                            {
                                              assignment?.LegalOfficer
                                                ?.first_name
                                            }
                                          </h3>
                                        </div>
                                      )
                                    )}
                                  </td>
                                  <td>
                                    {new Date(
                                      groupedAssignments[
                                        groupUniqueCode
                                      ][0].createdAt
                                    ).toLocaleDateString()}
                                  </td>
                                </tr>
                              )
                            )
                          ) : (
                            <tr>
                              <td colSpan="3">
                                This Case has no Assignment History
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="mt-3" style={{ textAlign: "center" }}>
                  <img
                    src="/img/folder_icn.png"
                    alt="No record icon"
                    height="50"
                    width="50"
                  />
                  No record available, select case to view data
                </p>
              )}
            </Box>
          )}
        </Box>
      </div>
      {/* Modal to show full case description */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Full Case Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="casedesc-txt">
            {singlecaseAssignmentHistory.case_description}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
