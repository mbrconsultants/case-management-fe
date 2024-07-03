import React, { useState, useContext, useEffect } from "react";
import { Card, Row, Col, Button, Modal } from "react-bootstrap";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
import { ErrorAlert, SuccessAlert } from "../Toast/toast";
import "./RoasterList.css";
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

export const RoasterList = () => {
  const { user } = useContext(Context);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [headerText, setHeaderText] = useState("");
  const [hearingdate, setHearingdate] = useState({ hearing_date: "" });
  const [RoasterModal, setRoasterModal] = useState(false);
  const [caseList, setCaseList] = useState([]);
  const [legalOfficers, setLegalOfficers] = useState([]);
  const [selectedSuitNo, setSelectedSuitNo] = useState(null);
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

  const openRoasterModal = () => {
    setRoasterModal(true);
  };

  const closeRoasterModal = () => {
    setRoasterModal(false);
  };

  useEffect(() => {
    getAllData();
    retrieveHeaderText();
    getCaseList();
    getLegalOfficer();
  }, []);

  const getAllData = async () => {
    try {
      const res = await endpoint.post(`/case/list-by-hearing-date`);
      setData(res.data.data);
      setHeaderText(`COURT ROASTER FOR THE MONTH OF ${monthName} ${year}`);
    } catch (err) {
      console.error(err);
    }
  };
  const currentDate = new Date();
  const monthName = currentDate
    .toLocaleString("default", { month: "long" })
    .toUpperCase();
  const year = currentDate.getFullYear();

  const handleGetCases = async (e) => {
    e.preventDefault();

    const date = new Date(hearingdate.hearing_date);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    setHeaderText(
      `COURT ROSTER FOR THE MONTH OF ${month.toUpperCase()}, ${year}`
    );

    try {
      const res = await endpoint.post(
        `/case/list-by-hearing-date`,
        hearingdate
      );
      setData(res.data.data);
      SuccessAlert(res.data.message);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      ErrorAlert(err.response.data.message);
      console.error(err);
    }
  };

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
  const handleCreateRoaster = async () => {
    try {
      const formData = new FormData();
      formData.append("case_id", selectedSuitNo?.value || "");
      // formData.append("case_id", selectedSuitNo?.value || "");
      formData.append(
        "legal_officer_id",
        JSON.stringify(selectedCouncils.map((council) => council.value))
      );
      // formData.append("case_id", id);
      console.log("Payload:", formData);

      const response = await endpoint.post(`/case/create-roster`, formData);
      SuccessAlert(response.data.message);
      setRoasterModal(false);
    } catch (err) {
      console.log(err);
      // setLoading(false);
      ErrorAlert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="box box-default">
        <div className="d-flex justify-content-end mb-3">
          <Button onClick={openRoasterModal} style={{ marginTop: "-10px" }}>
            Create Roaster
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
          <Row className="justify-content-center">
            <Col xs={12} md={8}>
              <br />
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
                          ...hearingdate,
                          hearing_date: e.target.value,
                        })
                      }
                      required
                      style={{ width: "auto" }}
                    />
                    <button
                      className="btn btn-success"
                      onClick={handleGetCases}
                    >
                      Get All Cases
                    </button>
                  </div>
                </Card.Body>
              </Card>
              <br />
            </Col>
          </Row>
        </div>

        {data.length > 0 ? (
          <Card id="divToPrint">
            <div>
              <div className="d-flex justify-content-end mb-3">
                <Button onClick={window.print} id="hideBtn">
                  Print
                </Button>
              </div>
              <div id="table-to-print">
                <h2 className="rostertable-header">{headerText}</h2>
                <table border="1" className="table-responsive">
                  <colgroup>
                    <col style={{ width: "150px" }} />
                    <col style={{ width: "200px" }} />
                    <col style={{ width: "500px" }} />
                    <col style={{ width: "250px" }} />
                    <col style={{ width: "300px" }} />
                    <col style={{ width: "300px" }} />
                    <col style={{ width: "150px" }} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>DATE</th>
                      <th className="w-15s">CASE</th>
                      <th>COURT</th>
                      <th>COUNSEL</th>
                      <th>EXTERNAL SOLICITOR</th>
                      <th>NEXT ADJOURNED DATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        <td>{rowIndex + 1}</td>
                        <td>{row.hearing_date ? row.hearing_date : ""}</td>
                        <td>
                          {row.suite_no}
                          <br /> {row.parties}
                        </td>
                        <td>{row.Court ? row.Court.name : ""}</td>
                        <td>
                          {row.AssignCouncils && row.AssignCouncils.length > 0
                            ? row.AssignCouncils.map((council, index) => (
                                <span key={index}>
                                  {council.LegalOfficer
                                    ? council.LegalOfficer.surname +
                                      " " +
                                      council.LegalOfficer.first_name
                                    : ""}
                                  <br />
                                </span>
                              ))
                            : ""}
                        </td>
                        <td>
                          {row.externalSolicitor
                            ? row.externalSolicitor
                            : "Not Assigned"}
                        </td>
                        <td>{row.nextAdjournedDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        ) : (
          <div className="text-center"> No Record</div>
        )}
      </div>
      <Modal show={RoasterModal}>
        <Modal.Header>
          <Button onClick={closeRoasterModal} className="btn-close" variant="">
            x
          </Button>
        </Modal.Header>
        <CForm onSubmit={handleSubmit(handleCreateRoaster)}>
          <Modal.Body>
            <div>
              <Card>
                <Card.Header>
                  <Card.Title as="h3">
                    Select Suite No. and Legal Officer(s) to Create Roaster{" "}
                  </Card.Title>
                </Card.Header>
                <Card.Body className="row g-3 needs-validation">
                  <CCol md={6}>
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

                  <CCol md={6}>
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
              Create Roaster
            </CButton>
            <Button variant="dark" className="me-1" onClick={closeRoasterModal}>
              Close
            </Button>
          </Modal.Footer>
        </CForm>
      </Modal>
    </div>
  );
};
