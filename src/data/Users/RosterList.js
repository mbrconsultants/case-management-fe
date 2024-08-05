import React, { useState, useContext, useEffect } from "react";
import { Card, Row, Col, Button, Modal } from "react-bootstrap";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
import { ErrorAlert, SuccessAlert } from "../Toast/toast";
import "./RosterList.css";
import Select from "react-select";
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
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";

export const RosterList = () => {
  const { user } = useContext(Context);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [headerText, setHeaderText] = useState("");
  const [hearingdate, setHearingdate] = useState({ hearing_date: "" });
  const [hearingmonth, setHearingmonth] = useState({ hearing_month: "" });
  const [RosterModal, setRosterModal] = useState(false);
  const [caseList, setCaseList] = useState([]);
  const [rosterAssignment, setRosterAssignment] = useState([]);
  const [legalOfficers, setLegalOfficers] = useState([]);
  const [selectedSuitNo, setSelectedSuitNo] = useState(null);
  // const [selectedMonth, setselectedMonth] = useState(null);
  const [selectedCouncils, setSelectedCouncils] = useState([]);

  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const openRosterModal = () => {
    setRosterModal(true);
  };

  const closeRosterModal = () => {
    setRosterModal(false);
  };
  console.log("hearingdate", hearingdate);
  useEffect(() => {
    // getAllData();
    retrieveHeaderText();
    // getRosterAssignment();
    handleGetCases();
    handleGetMonthCases();
    getCaseList();
    getLegalOfficer();
  }, []);

  const getAllData = async () => {
    try {
      const res = await endpoint.post(`/case/list-by-hearing-date`);
      setData(res.data.data);
      setHeaderText(`COURT ROSTER FOR THE MONTH OF ${monthName} ${year}`);
    } catch (err) {
      console.error(err);
    }
  };
  const currentDate = new Date();
  const monthName = currentDate
    .toLocaleString("default", { month: "long" })
    .toUpperCase();
  const year = currentDate.getFullYear();

  const handleGetCases = async () => {
    const date = new Date(hearingdate.hearing_date);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    // console.log(date);
    setHeaderText(
      hearingdate.hearing_date
        ? `COURT ROSTER FOR THE MONTH OF ${month.toUpperCase()}, ${year}`
        : `COURT ROSTER LIST`
    );

    try {
      const res = await endpoint.post(
        `/case/list-by-hearing-date`,
        hearingdate
      );

      setLoading(true);
      setRosterAssignment(res.data.data);
      setLoading(false);
      // SuccessAlert(res.data.message);
      // getRosterAssignment();
    } catch (err) {
      setLoading(false);
      ErrorAlert(err.response.data.message);
      console.error(err);
    }
  };

  const handleGetMonthCases = async () => {
    const date = new Date(hearingdate.hearing_date);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    // console.log(date);
    setHeaderText(
      hearingdate.hearing_date
        ? `COURT ROSTER FOR THE MONTH OF ${month.toUpperCase()}, ${year}`
        : `COURT ROSTER LIST`
    );

    try {
      const res = await endpoint.post(
        `/case/list-by-hearing-month`,
        hearingdate
      );

      setLoading(true);
      setRosterAssignment(res.data.data);
      setLoading(false);
      // SuccessAlert(res.data.message);
      // getRosterAssignment();
    } catch (err) {
      setLoading(false);
      ErrorAlert(err.response.data.message);
      console.error(err);
    }
  };

  //get-roster-assignments
  const getRosterAssignment = async () => {
    setLoading(true);
    try {
      const res = await endpoint.get("/case/get-roster-assignments");
      setRosterAssignment(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  console.log("RosterAssignment", rosterAssignment);

  const retrieveHeaderText = () => {
    const savedHeaderText = localStorage.getItem("headerText");
    if (savedHeaderText) {
      setHeaderText(savedHeaderText);
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
  console.log("CaseList", caseList);

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

  // Function to Create Roster
  const handleCreateRoster = async () => {
    try {
      console.log("Adams", selectedSuitNo);
      const formData = new FormData();
      formData.append("case_id", selectedSuitNo?.value || undefined);
      // formData.append("suite_no", selectedSuitNo?.value || "");
      formData.append(
        "legal_officer_id",
        selectedCouncils.map((council) => council.value)
        // JSON.stringify(selectedCouncils.map((council) => council.value))
      );

      console.log("formData", formData);
      const response = await endpoint.post(`/case/create-roster`, formData);

      console.log("Payload:", response.data);
      SuccessAlert(response.data.message);
      reset();
      setSelectedSuitNo(null);
      setSelectedCouncils(null);
      setRosterModal(false);
      getRosterAssignment();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        ErrorAlert(err.response.data.message); // Display the error message
      } else if (err.message) {
        ErrorAlert(err.message); // Fallback to the generic error message
      } else {
        ErrorAlert("An error occurred. Please try again."); // Default error message
      }
    }
  };
  // Function to parse chamber lawyer name from json data
  // const parseLawyerName = (lawyerName) => {
  //   try {
  //     const parsed = JSON.parse(lawyerName);
  //     // console.log("Parsed lawyer names:", parsed);
  //     return parsed;
  //   } catch (error) {
  //     console.error("Error parsing lawyer_name:", error);
  //     return [];
  //   }
  // };

  const handlePrint = () => {
    const originalTitle = document.title; // Store original document title
    document.title = "Court Roster_NJC-CM"; // Set specific name for the document

    window.print(); // Trigger the print dialog

    document.title = originalTitle; // Restore original document title after printing
  };

  // const monthSearch = [
  //   { id: 1, month_search: "January" },
  //   { id: 2, month_search: "February" },
  //   { id: 3, month_search: "March" },
  //   { id: 4, month_search: "April" },
  //   { id: 5, month_search: "May" },
  //   { id: 6, month_search: "June" },
  //   { id: 7, month_search: "July" },
  //   { id: 8, month_search: "August" },
  //   { id: 9, month_search: "September" },
  //   { id: 10, month_search: "October" },
  //   { id: 11, month_search: "November" },
  //   { id: 12, month_search: "December" },
  // ];

  return (
    <div>
      <div className="box box-default">
        <div className="d-flex justify-content-end mb-3">
          <Button onClick={openRosterModal} style={{ marginTop: "-10px" }}>
            Create Roster
          </Button>
        </div>
        <div
          {...{
            style: {
              borderBottom: "1px solid #eee",
              width: "130%",
              marginLeft: "-30px", // or whatever the parent card's padding is
              marginRight: "-40px", // or whatever the parent card's padding is
            },
          }}
        ></div>
        <div className="container-fluid">
          <br />
          <br />
          <Row className="row g-0">
            <Col xs={6}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-center align-items-center">
                    <label className="me-2 mb-0">Hearing Date</label>
                    <input
                      type="date"
                      className="form-control me-3"
                      value={hearingdate.hearing_date}
                      onChange={(e) =>
                        setHearingdate({
                          hearing_date: e.target.value,
                        })
                      }
                      required
                      style={{ width: "auto" }}
                    />
                    <Button
                      className="btn btn-success"
                      onClick={handleGetCases}
                    >
                      Get Roster
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-center align-items-center">
                    <label className="me-2 mb-0">Search by Month</label>
                    <input
                      type="date"
                      className="form-control me-3"
                      value={hearingdate.hearing_date}
                      onChange={(e) =>
                        setHearingdate({
                          hearing_date: e.target.value,
                        })
                      }
                      required
                      style={{ width: "auto" }}
                    />
                    <Button
                      className="btn btn-success"
                      onClick={handleGetMonthCases}
                    >
                      Get Roster by Month
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        {rosterAssignment.length > 0 ? (
          <Card id="divToPrint">
            <div>
              <div id="table-to-print">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h2 className="rostertable-header text-center flex-grow-1">
                    {headerText}
                  </h2>
                  <Button onClick={handlePrint} id="hideBtn">
                    Print
                  </Button>
                </div>

                <table border="1" className="table-responsive">
                  <colgroup>
                    <col style={{ width: "100px" }} />
                    <col style={{ width: "200px" }} />
                    <col style={{ width: "300px" }} />
                    <col style={{ width: "250px" }} />
                    <col style={{ width: "300px" }} />
                    <col style={{ width: "300px" }} />
                    <col style={{ width: "150px" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th style={{ whiteSpace: "nowrap" }}>S/N</th>
                      <th>DATE</th>
                      <th className="w-15s">CASE</th>
                      <th>COURT</th>
                      <th>COUNSEL</th>
                      <th>EXTERNAL SOLICITOR</th>
                      <th>NEXT ADJOURNED DATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rosterAssignment
                      .filter((row) => row.AssignCouncils.length > 0)
                      .map((row, index) => {
                        // console.log(row);
                        // if (row.AssignCouncils && row.AssignCouncils.length > 0) {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row.hearing_date ? row.hearing_date : ""}</td>
                            <td>
                              <span style={{ fontWeight: "bold" }}>
                                {row.suite_no}
                              </span>
                              <br /> {row.parties}
                            </td>
                            <td>{row.Court ? row.Court.name : ""}</td>
                            <td>
                              {row.AssignCouncils &&
                              row.AssignCouncils.length > 0 ? (
                                <ul
                                  style={{
                                    listStyleType: "disc",
                                    paddingLeft: "10px",
                                  }}
                                >
                                  {row.AssignCouncils.map((council, index) => (
                                    <li key={index}>
                                      {council.LegalOfficer
                                        ? council.LegalOfficer.surname +
                                          " " +
                                          council.LegalOfficer.first_name
                                        : ""}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                ""
                              )}
                            </td>
                            <td>
                              <h4>
                                {row.ChamberOrSolicitor &&
                                  row.ChamberOrSolicitor.chamber_name}
                              </h4>
                            </td>
                            <td>{row.adjournment_date}</td>
                          </tr>
                        );
                        // }
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        ) : (
          <p style={{ textAlign: "center" }}>
            <img
              src="/img/folder_icn.png"
              alt="No records icon"
              height="50"
              width="50"
            />
            No records available.
          </p>
        )}
      </div>
      <Modal show={RosterModal}>
        <Modal.Header>
          <Button onClick={closeRosterModal} className="btn-close" variant="">
            x
          </Button>
        </Modal.Header>
        <CForm onSubmit={handleSubmit(handleCreateRoster)}>
          <Modal.Body>
            <div>
              <Card>
                <Card.Header>
                  <Card.Title as="h3">
                    Select Suite No. and Legal Officer(s) to Create Roster{" "}
                  </Card.Title>
                </Card.Header>
                <Card.Body className="row g-3 needs-validation">
                  <CCol md={12}>
                    <CFormLabel htmlFor="suite_no">Suite Number</CFormLabel>
                    <Select
                      id="suite_no"
                      options={caseList.map((caseItem) => ({
                        value: caseItem.id,
                        label: caseItem.suite_no,
                      }))}
                      value={selectedSuitNo}
                      onChange={setSelectedSuitNo}
                    />
                  </CCol>

                  <CCol md={12}>
                    <CFormLabel htmlFor="legal_officers">
                      Select Legal Officer(s)
                    </CFormLabel>
                    <Select
                      id="legal_officers"
                      isMulti
                      options={legalOfficers.map((officer) => ({
                        value: officer.id,
                        label: `${officer.surname} ${officer.first_name} ${officer.middle_name}`,
                      }))}
                      value={selectedCouncils}
                      onChange={setSelectedCouncils}
                    />
                  </CCol>
                </Card.Body>
              </Card>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <CButton type="submit" color="primary">
              <span className="fe fe-plus"></span>
              Create Roster
            </CButton>
            <Button variant="dark" className="me-1" onClick={closeRosterModal}>
              Close
            </Button>
          </Modal.Footer>
        </CForm>
      </Modal>
    </div>
  );
};
