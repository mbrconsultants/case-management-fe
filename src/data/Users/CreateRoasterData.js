import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
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
  Container,
} from "react-bootstrap";
import Loader from "../Loader/loader";
import { ErrorAlert, SuccessAlert } from "../Toast/toast";
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

export default function CreateRoasterData() {
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    getCaseList();
    getLegalOfficer();
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
    <Card className="d-flex h-100vh">
      <Card.Header>
        <Col className="card-title text-center">
          <span> Enter Details to Create Roaster</span>
          <span className="fe fe-file"></span>
        </Col>
      </Card.Header>
      <Card.Body className="h-100 overflow-y-auto min-vh-100">
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

          <CCol xs={12} className="text-center">
            <CButton color="primary" type="submit">
              <span className="fe fe-plus"></span>
              Create Roaster
            </CButton>
          </CCol>
        </CForm>
      </Card.Body>
    </Card>
  );
}
