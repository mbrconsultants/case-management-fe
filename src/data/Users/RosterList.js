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

  const handleReopenCase = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("suite_no", selectedSuitNo?.value || "");
    formData.append(
      "legal_officer_id",
      JSON.stringify(selectedCouncils.map((council) => council.value))
    );
    formData.append("case_id", id);

    try {
      const response = await endpoint.post(`/case/reopen`, formData);
      SuccessAlert(response.data.message);
      navigate(`${process.env.PUBLIC_URL}/cases`);
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response && err.response.data && err.response.data.description) {
        ErrorAlert(err.response.data.description);
      } else {
        ErrorAlert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <div className="box box-default">
        <Button onClick={openRoasterModal} style={{ marginBottom: "20px" }}>
          Create Roaster
        </Button>
        <div className="container-fluid">
          <div className="col-md-12 text-success"></div>
          {/* <br /> */}
          {/* <hr /> */}
          <Row className="">
            <Col xs={2} md={2}></Col>
            <Col xs={8} md={8}>
              <br />
              <Card>
                <Card.Body>
                  <div className="form-horizontal">
                    <div className="form-group">
                      <label className="col-md-6 cecontrol-label">
                        Hearing Date
                      </label>
                      <div className="col-md-12">
                        <input
                          type="date"
                          className="form-control"
                          value={hearingdate.hearing_date}
                          onChange={(e) =>
                            setHearingdate({
                              ...hearingdate,
                              hearing_date: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-sm-offset-2 text-center col-sm-9">
                        <button
                          className={
                            isLoading
                              ? "btn btn-success pull-right btn-loading"
                              : "btn btn-success pull-right"
                          }
                          disabled={isLoading}
                          onClick={handleGetCases}
                        >
                          Get All Cases
                        </button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={3} md={4}></Col>
          </Row>
        </div>

        {data.length > 0 ? (
          <Card id="divToPrint">
            <div>
              <Button
                onClick={window.print}
                style={{ marginBottom: "20px" }}
                id="hideBtn"
              >
                Print
              </Button>
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
                          {row.LegalOfficer ? row.LegalOfficer.surname : ""}
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

        <Modal.Body>
          <div>
            <Card>
              <Card.Header>
                <Card.Title as="h3">
                  Select Suit No. and Legal Officer(s) to Create Roaster{" "}
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <CForm
                  onSubmit={handleSubmit(handleReopenCase)}
                  className="row g-3 needs-validation"
                >
                  <CCol md={6}>
                    <CFormLabel htmlFor="suite_no">Suit Number</CFormLabel>
                    <Select
                      id="suite_no"
                      options={caseList.map((caseItem) => ({
                        value: caseItem.suite_no,
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
                </CForm>
              </Card.Body>
            </Card>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" className="me-1" onClick={closeRoasterModal}>
            Close
          </Button>
          <CButton color="primary" type="submit">
            <span className="fe fe-plus"></span>
            Create Roaster
          </CButton>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
