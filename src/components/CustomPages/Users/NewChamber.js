import React, { useState, useContext, useEffect } from "react";
import { Breadcrumb, Col, Row, Card, FormGroup, Button } from "react-bootstrap";
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
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CButton,
  CFormCheck,
} from "@coreui/react";
import * as formvalidation from "../../../data/Form/formvalidations/formvalidations";
import endpoint from "../../../context/endpoint";
import { useForm } from "react-hook-form";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";

export default function CreateChamber() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [courtList, setCourtList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [lgasList, setLgasList] = useState([]);
  const [titleList, setTitleList] = useState([]);
  const [sign, setSign] = useState();
  const [url, setUrl] = useState();
  const [details, setDetails] = useState({
    chamber_head: "",
    chamber_name: "",
    address: "",
    signature: null,
    phone: "",
    email: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const params = useParams();



  const id = params?.id;

  //get single staff
  const getSingleStaff = async () => {
    setLoading(true);
    await endpoint
      .get(`/solicitor/show/${id}`)
      .then((res) => {
        console.log("solicitor", res.data.data);
        setDetails(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err)
      });
  };





  useEffect(() => {
    if (id) {
      getSingleStaff();
    }
  }, []);

  const handleCreateUser = async () => {
    // e.preventDefault();
    console.log("====================================");
    console.log("here");
    console.log("====================================");
    setLoading(true);

    const data = new FormData();
    data.append("chamber_name", details.chamber_name);
    data.append("chamber_head", details.chamber_head);
    data.append("address", details.address);
    data.append("email", details.email);
    data.append("phone", details.phone);
    data.append("signature", url);
    if (id) {
      await endpoint
        .put(`/solicitor/edit/${id}`, data)
        .then((res) => navigate(`${process.env.PUBLIC_URL}/chamber-list`))
        .catch((err) => {
          console.log(err);
          setLoading(false);
          ErrorAlert(err.response.data.description);
        });
    } else {
      await endpoint
        .post("/solicitor/create", data)
        .then((res) => navigate(`${process.env.PUBLIC_URL}/chamber-list`))
        .catch((err) => {
          setLoading(false);
          console.log(err);
          ErrorAlert(err.response.data.description);
        });
    }
  };



  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">New Chamber List</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item
              className="breadcrumb-item"
              href="#">
              Registry
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page">
              New Chamber List
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link
            to={`${process.env.PUBLIC_URL}/chamber-list/`}
            className="btn btn-primary btn-icon text-white me-3">
            <span>
              <i className="fe fe-eye"></i>&nbsp;
            </span>
            View Chamber List
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
                <span> Enter Chamber Credentials </span>
                <span className="fe fe-user"></span>
              </Col>
            </Card.Header>

            <Card.Body>
              {/* <formvalidation.CustomValidation /> */}
              <CForm
                onSubmit={handleSubmit(handleCreateUser)}
                className="row g-3 needs-validation">
                <CCol md={6}>
                  <CFormLabel htmlFor="validationCustomUsername">
                    Chamber's Name
                  </CFormLabel>

                  <CFormInput
                    defaultValue={details.chamber_name}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        chamber_name: e.target.value,
                      })
                    }
                    type="text"
                    name="chmabers Name"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="validationCustomUsername">
                    Chamber's Head
                  </CFormLabel>

                  <CFormInput
                    defaultValue={details.chamber_head}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        chamber_head: e.target.value,
                      })
                    }
                    type="text"
                    name="Chamber's Head"
                  />
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="validationCustomUsername">
                    Email
                  </CFormLabel>
                  <CInputGroup className="has-validation">
                    {/* <CInputGroupText id="inputGroupPrepend">@</CInputGroupText> */}
                    <CFormInput
                      defaultValue={details.email}
                      onChange={(e) =>
                        setDetails({
                          ...details,
                          email: e.target.value,
                        })
                      }
                      type="email"
                      aria-describedby="inputGroupPrepend"
                      name="email"
                    />
                  </CInputGroup>
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="validationCustom02">
                    Phone No.
                  </CFormLabel>
                  <CFormInput
                    defaultValue={details.phone}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        phone: e.target.value,
                      })
                    }
                    type="text"
                    name="phone"
                  />
                </CCol>

                {/* <CCol
                  xs={6}
                  className="text-center">
                  <SignatureCanvas
                    ref={(data) => setSign(data)}
                    onEnd={() =>
                      setUrl(sign.getTrimmedCanvas().toDataURL("image/png"))
                    }
                    canvasProps={{
                      width: 500,
                      height: 120,
                      className: "sigCanvas",
                    }}
                  />
                </CCol>
                {id && (
                  <CCol
                    xs={6}
                    className="text-center">
                    <label>Old Signature</label>
                    <br></br>
                    <img
                      src={details.signature}
                      crossOrigin="anonymous"
                      alt="Old Signatory..."
                    />
                  </CCol>
                )} */}
                <CCol md={12}>
                  <CFormLabel htmlFor="validationCustom02">Address</CFormLabel>
                  <CFormTextarea
                    defaultValue={details.address}
                    onChange={(e) =>
                      setDetails({
                        ...details,
                        address: e.target.value,
                      })
                    }
                    type="text"
                    name="phone"
                  />
                </CCol>

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
