import React, { useState, useContext, useEffect } from "react";
import {
  Breadcrumb,
  Col,
  Row,
  Card,
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
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";

export default function CreateCase() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [courtList, setCourtList] = useState([]);
  const [courtDivisionList, setCourtDivisionList] = useState([]);
  const [chamberList, setChamberList] = useState([]);
  const [selectedLawyers, setSelectedLawyers] = useState([]);

  const [statesList, setStatesList] = useState([]);
  const [caseTypelist, setCaseTypeList] = useState([]);
  const [appellantList, setAppellantList] = useState([]);
  const [respondentList, setRespondentList] = useState([]);
  const [chamberLawyers, setChamberLawyers] = useState([]);

  const [documentTypeList, setDocumentTypeList] = useState([]);

  const [details, setDetails] = useState({
    case_type_id: "",
    suite_no: "",
    parties: "",
    appellants: "",
    respondent: "",
    court_id: "",
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

  //get single case
  const getSingleCase = async () => {
    setLoading(true);
    await endpoint
      .get(`/case/show/${id}`)
      .then((res) => {
        setDetails(res.data.data);
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

  //get appellant titles
  const getAppellantTitles = async () => {
    setLoading(true);
    await endpoint
      .get("/case-type/list")
      .then((res) => {
        console.log("appellants", res.data.data);
        setAppellantList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
      });
  };

  //get respondent titles
  const getRespondentsTitles = async () => {
    setLoading(true);
    await endpoint
      .get("/case-type/list")
      .then((res) => {
        console.log("respndents", res.data.data);
        setRespondentList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
      });
  };
  //get respondent titles
  const getDocumentTypeList = async () => {
    setLoading(true);
    await endpoint
      .get("/file-type/list")
      .then((res) => {
        console.log("document type", res.data.data);
        setDocumentTypeList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
      });
  };

  //get respondent titles
  const getCourtDivision = async (courtID) => {
    setLoading(true);
    await endpoint
      .get(`/division/search/${courtID}`)
      .then((res) => {
        setCourtDivisionList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
      });
  };
  //get respondent titles
  const getChamberList = async () => {
    setLoading(true);
    await endpoint
      .get(`/solicitor/list`)
      .then((res) => {
        console.log("solicitor", res.data.data);
        setChamberList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
      });
  };

  // Find the chamber Lawyers with the specified ID
  const getChamberLawyers = (id) => {
    const chamber = chamberList.find((chamber) => chamber.id == id);

    if (!chamber) {
      console.error(`Chamber with ID ${id} not found.`);
      return;
    }
    const { ChamberLawyers: lawyers } = chamber;
    setChamberLawyers(
      lawyers.map((lawyer) => ({ value: lawyer.id, label: lawyer.lawyer_name }))
    );
  };

  useEffect(() => {
    getCourtList();
    getChamberList();
    getAppellantTitles();
    getRespondentsTitles();
    getStatestList();
    getDocumentTypeList();
    getCaseType();
    if (id) {
      getSingleCase();
    }
  }, []);

  const handleCreateUser = async () => {
    // e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("case_type_id", details.case_type_id);
    data.append("suite_no", details.suite_no);
    data.append("parties", details.parties);
    data.append("appellants", details.appellants);
    data.append("respondent", details.respondent);
    data.append("court_id", details.court_id);
    data.append("case_description", details.case_description);
    data.append("hearing_date", details.hearing_date);
    data.append("doc_url", details.doc_url);
    if (id) {
      await endpoint
        .put(`/case/edit/${id}`, data)
        .then((res) => {
          SuccessAlert(res.data.message);
          navigate(`${process.env.PUBLIC_URL}/cases`);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          ErrorAlert(err.response.data.description);
        });
    } else {
      await endpoint
        .post("/case/create", data)
        .then((res) => navigate(`${process.env.PUBLIC_URL}/cases`))
        .catch((err) => {
          setLoading(false);
          console.log(err);
          ErrorAlert(err.response.data.description);
        });
    }
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
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">New Case</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item
              className="breadcrumb-item"
              href="#">
              Registry
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page">
              New Case
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link
            to={`${process.env.PUBLIC_URL}/cases/`}
            className="btn btn-primary btn-icon text-white me-3">
            <span>
              <i className="fe fe-eye"></i>&nbsp;
            </span>
            View Case
          </Link>
        </div>
      </div>

      <Row>
        <Col
          md={12}
          lg={12}>
          <Card>
            <Card.Header>
              <Col className="card-title text-center">
                <span> Enter Case Details </span>
                <span className="fe fe-file"></span>
              </Col>
            </Card.Header>

            <Card.Body>
              {/* <formvalidation.CustomValidation /> */}
              <CForm
                onSubmit={handleSubmit(handleCreateUser)}
                className="row g-3 needs-validation">
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">
                    Suite Number
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
                    <select
                      className="form-select"
                      placeholder="Select a court..."
                      name=""
                      id=""
                      defaultValue={details.court_id}
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          court_id: e.target.value,
                        });
                        getCourtDivision(e.target.value);
                      }}>
                      <option value="">--select--</option>
                      {courtList &&
                        courtList.map((court, index) => (
                          <option
                            value={court.id}
                            key={index}>
                            {court.name}
                          </option>
                        ))}
                    </select>
                  </Form.Group>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustomUsername">
                    Court Divisions
                  </CFormLabel>
                  <Form.Group>
                    <select
                      className="form-select"
                      placeholder="Select a court..."
                      name=""
                      id=""
                      defaultValue={details.court_id}
                      onChange={(e) =>
                        setDetails({
                          ...details,
                          court_id: e.target.value,
                        })
                      }>
                      <option value="">--select--</option>
                      {courtDivisionList &&
                        courtDivisionList.map((court, index) => (
                          <option
                            value={court.id}
                            key={index}>
                            {court.division}
                          </option>
                        ))}
                    </select>
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
                    }>
                    <option value="">--select-</option>
                    {caseTypelist.map((caseType, index) => (
                      <option
                        key={index + 1}
                        value={caseType.id}
                        selected={details.case_type_id === caseType.id}
                        className="text-dark">
                        {caseType.case_type}
                      </option>
                    ))}
                  </select>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">
                    Appellant Title
                  </CFormLabel>
                  <select
                    className="form-select"
                    defaultValue={details.appellants}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        appellants: e.target.value,
                      })
                    }
                    name=""
                    id="">
                    <option value="">--select--</option>
                    <option value="">--select--</option>
                  </select>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">
                    Appellant Name
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
                    name="appellants name"
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustomUsername">
                    Respondent Title
                  </CFormLabel>
                  <CInputGroup className="has-validation">
                    <select
                      className="form-select"
                      defaultValue={details.respondent}
                      onChange={(e) =>
                        setDetails({
                          ...details,
                          respondent: e.target.value,
                        })
                      }
                      name=""
                      id="">
                      <option value="">--select--</option>
                      <option value="">--select--</option>
                    </select>
                  </CInputGroup>
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom02">
                    Respondent Name
                  </CFormLabel>
                  <CFormInput
                    defaultValue={details.respondent}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        respondent: e.target.value,
                      })
                    }
                    type="text"
                    name="respondent name"
                  />
                </CCol>
                <CCol md={4}>
                  <CFormLabel htmlFor="validationCustom01">Parties</CFormLabel>
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
                <CCol md={6}>
                  <CFormLabel htmlFor="validationCustomUsername">
                    Chamber Name
                  </CFormLabel>
                  <Form.Group>
                    <select
                      className="form-select"
                      placeholder="Select a chamber..."
                      name=""
                      id=""
                      defaultValue={details.chamber_id}
                      onChange={(e) => {
                        setDetails({
                          ...details,
                          chamber_id: e.target.value,
                        });
                        getChamberLawyers(e.target.value);
                      }}>
                      <option value="">--select--</option>
                      {chamberList &&
                        chamberList.map((chamber, index) => (
                          <option
                            value={chamber.id}
                            key={index}>
                            {chamber.chamber_name}
                          </option>
                        ))}
                    </select>
                  </Form.Group>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="validationCustomUsername">
                    Legal Council
                  </CFormLabel>
                  <Form.Group>
                    <Select
                      isMulti
                      options={chamberLawyers}
                      value={selectedLawyers}
                      onChange={setSelectedLawyers}
                      placeholder="Select Chamber Lawyers"
                    />
                  </Form.Group>
                </CCol>
                <CCol md={8}>
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
                    name="case_description">
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
                {rows.map((row, index) => (
                  <div
                    className="row"
                    key={index}>
                    <CCol md={4}>
                      <CFormLabel htmlFor="validationCustomUsername">
                        Attachment Type
                      </CFormLabel>
                      <select className="form-select">
                        <option value="">--select--</option>
                        {documentTypeList.map((fileType, idx) => (
                          <option
                            key={idx}
                            value={fileType.id}>
                            {fileType.name}
                          </option>
                        ))}
                      </select>
                    </CCol>
                    <CCol md={4}>
                      <CFormLabel htmlFor="validationCustomUsername">
                        Attachment
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
                    <CCol
                      md={3}
                      className="mt-3">
                      <CFormLabel htmlFor="validationCustomUsername">
                        {/* Attachment */}
                      </CFormLabel>
                      {index > 0 && (
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleRemoveRow(index)}>
                          <span className="fa fa-trash"></span>
                        </button>
                      )}
                    </CCol>
                  </div>
                ))}
                <div className="row">
                  <CCol
                    md={12}
                    className="mt-3 text-right">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleAddRow}>
                      <span className="fa fa-plus"></span> More Attachment
                    </button>
                  </CCol>
                </div>

                <CCol
                  xs={12}
                  className="text-center">
                  <CButton
                    color="primary"
                    type="submit">
                    <span className="fe fe-plus"></span>
                    {isLoading ? "Saving data..." : "Save"}
                  </CButton>
                </CCol>
              </CForm>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
