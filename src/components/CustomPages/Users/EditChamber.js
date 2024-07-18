import React, { useState, useEffect } from "react";
import { Breadcrumb, Col, Row, Card, Modal, Button, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CForm, CCol, CFormLabel, CFormInput, CButton } from "@coreui/react";
import endpoint from "../../../context/endpoint";
import { useForm } from "react-hook-form";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";

export default function EditChamber() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentChamber, setCurrentChamber] = useState(null);
  const [selectedLawyer, setSelectedLawyer] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  const [editDetails, setEditDetails] = useState({
    chamber_head: "",
    chamber_name: "",
    address: "",
    signature: null,
    phone: "",
    phone_2: "",
    email: "",
    email_2: "",
  });

  const [editCounsel, setEditCounsel] = useState({
    lawyer_name: "",
    lawyer_phone: "",
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const params = useParams();

  const id = params?.id;

  const getSingleStaff = async () => {
    setLoading(true);
    try {
      const res = await endpoint.get(`/solicitor/show/${id}`);
      console.log("single chamber",res.data.data);
      const data = res.data.data;
      setEditDetails({
        ...data,
        lawyer_name: Array.isArray(data.lawyer_name) ? data.lawyer_name : [],
        lawyer_phone: Array.isArray(data.lawyer_phone) ? data.lawyer_phone : [],
      });


      // setEditCounsel({
      //   lawyer_name: Array.isArray(data.lawyer_name) ? data.lawyer_name : [],
      //   lawyer_phone: Array.isArray(data.lawyer_phone) ? data.lawyer_phone : [],
      // });

      setData(data); // Set the data state
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    getSingleStaff();
  }, []);

  const handleEditChamber = async () => {
    const data = new FormData();
    data.append("chamber_name", editDetails.chamber_name);
    data.append("chamber_head", editDetails.chamber_head);
    data.append("address", editDetails.address);
    data.append("email", editDetails.email);
    data.append("email_2", editDetails.email_2);
    data.append("phone", editDetails.phone);
    data.append("phone_2", editDetails.phone_2);

    try {
      if (id) {
        await endpoint.put(`/solicitor/edit/${id}`, data);
      } else {
        navigate(`${process.env.PUBLIC_URL}/chamber-list`);
      }
    } catch (err) {
      setLoading(false);
      // ErrorAlert(err.response?.data?.description);
    }
  };


  const handleShowEditModal = (lawyer) => {
    console.log("lawyer", lawyer);
    setSelectedLawyer(lawyer);
    setShowEditModal(true);
  };

  const handleShowDeleteModal = (lawyer) => {
    // setCurrentChamber(chamber);
    setShowDeleteModal(true);
  };

  const handleLawyerChange = (index, value, field) => {
    const newLawyerDetails = [...editDetails[field]];
    newLawyerDetails[index] = value;
    setEditDetails((prevState) => ({
      ...prevState,
      [field]: newLawyerDetails,
    }));
  };

  const parseJSON = (jsonString) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error("Error parsing JSON string:", error);
      return [];
    }
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setSelectedLawyer({
      ...selectedLawyer,
      [name]: value,
    });
  };

  // const handleSaveModal = () => {
  //   const index = editDetails.lawyer_name.indexOf(selectedLawyer.name);
  //   handleLawyerChange(index, selectedLawyer.name, 'lawyer_name');
  //   handleLawyerChange(index, selectedLawyer.phone, 'lawyer_phone');
  //   setShowEditModal(false);
  // };

  const handleSaveModal = () => {
    const index = editDetails.lawyer_name.indexOf(selectedLawyer.name);
    handleLawyerChange(index, selectedLawyer.name, 'lawyer_name');
    handleLawyerChange(index, selectedLawyer.phone, 'lawyer_phone');
    setShowEditModal(false);
    updateCounselDetails(selectedLawyer);
  };

  const handleDelete = () => {
    const index = editDetails.lawyer_name.indexOf(selectedLawyer.name);
    handleLawyerChange(index, selectedLawyer.name, 'lawyer_name');
    handleLawyerChange(index, selectedLawyer.phone, 'lawyer_phone');
    deleteCounsel(selectedLawyer);
  };

  const updateCounselDetails = async (data) => {
    try {
      const res = await endpoint.post(`/solicitor/counsel/edit/${id}`, { data });
      // setLoading(false);
      SuccessAlert(res.data.message);
      getSingleStaff();
      setShowEditModal(false);
    } catch (error) {
      if (error.response) {
        ErrorAlert(error.response.data.description);
      }
    }
  };
  
  // const updateCounselDetails = async (data) => {
  //   try {
  //     await endpoint.post(`/solicitor/counsel/edit/${id}`, {data});
  //     setLoading(false);
  //     SuccessAlert(response.data.message);
  //     getSingleStaff();
  //     setShowEditModal(false);
  //     setLoading(false);
  //   } catch (error) {
  //     if (error.response) {
  //       ErrorAlert(error.response.data.description);
  //     }
  //   }
  // };

  const deleteCounsel = async (data) => {
    try {
      const res = await endpoint.post(`/solicitor/counsel/delete/${id}`, { data });
      SuccessAlert(res.data.message);
      setShowDeleteModal(false);
      getSingleStaff();
    } catch (error) {
      if (error.response) {
        ErrorAlert(error.response.data.description);
      }
    }
  };
  

  // const deleteCounsel = async (data) => {
  //   try {
  //     await endpoint.post(`/solicitor/counsel/delete/${id}`, {data});
  //     setLoading(false);
  //     SuccessAlert(res.data.message);
  //     getSingleStaff();
  //     setLoading(false);
  //   } catch (err) {
  //     console.error(err);
  //     ErrorAlert("Failed to delete Counsel.");
  //   } finally {
  //     setLoading(false);
  //     setShowDeleteModal(false);
  //   }
  // };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">New Chamber List</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Registry
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              New Chamber List
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          <Link
            to={`${process.env.PUBLIC_URL}/chamber-list/`}
            className="btn btn-primary btn-icon text-white me-3"
          >
            <span>
              <i className="fe fe-eye"></i>&nbsp;
            </span>
            View Chamber List
          </Link>
        </div>
      </div>

      <Row>
        <Col md={12} lg={12}>
          <Card>
            <Card.Header>
              <Col className="card-title text-center">
                <span> Edit Chamber Credentials </span>
                <span className="fe fe-user"></span>
              </Col>
            </Card.Header>

            <Card.Body>
              <CForm
                onSubmit={handleSubmit(handleEditChamber)}
                className="row g-3 needs-validation"
              >
                <CCol md={6}>
                  <CFormLabel htmlFor="chamberName">
                    Chamber's Name
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    id="chamberName"
                    style={{ border: "1px solid #000", padding: "10px" }}
                    value={editDetails.chamber_name}
                    onChange={(e) =>
                      setEditDetails({
                        ...editDetails,
                        chamber_name: e.target.value,
                      })
                    }
                    type="text"
                    name="chamberName"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="chamberHead">
                    Head of Chamber
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    id="chamberHead"
                    style={{ border: "1px solid #000", padding: "10px" }}
                    value={editDetails.chamber_head}
                    onChange={(e) =>
                      setEditDetails({
                        ...editDetails,
                        chamber_head: e.target.value,
                      })
                    }
                    type="text"
                    name="chamberHead"
                  />
                </CCol>

                <CCol md={6}>
                  <CFormLabel htmlFor="email">
                    Email
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    id="email"
                    style={{ border: "1px solid #000", padding: "10px" }}
                    value={editDetails.email}
                    onChange={(e) =>
                      setEditDetails({ ...editDetails, email: e.target.value })
                    }
                    type="email"
                    name="email"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="email">
                    Alternative Email
                    <span style={{ color: "red", fontSize: "20px" }}></span>
                    </CFormLabel>
                  <CFormInput
                    id="email2"
                    style={{
                      border: "1px solid #000",
                      // marginTop: "15px",
                      padding: "10px",
                    }}
                    value={editDetails.email_2}
                    onChange={(e) =>
                      setEditDetails({ ...editDetails, email_2: e.target.value })
                    }
                    type="email"
                    name="email_2"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="phone">
                    Phone Number
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    id="phone"
                    style={{ border: "1px solid #000", padding: "10px" }}
                    value={editDetails.phone}
                    onChange={(e) =>
                      setEditDetails({ ...editDetails, phone: e.target.value })
                    }
                    type="text"
                    name="phone"
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="phone">
                    Alternative Phone Number
                    <span style={{ color: "red", fontSize: "20px" }}></span>
                  </CFormLabel>
                  <CFormInput
                    id="phone2"
                    style={{
                      border: "1px solid #000",
                      // marginTop: "15px",
                      padding: "10px",
                    }}
                    value={editDetails.phone_2}
                    onChange={(e) =>
                      setEditDetails({ ...editDetails, phone_2: e.target.value })
                    }
                    type="text"
                    name="phone2"
                  />
                </CCol>

                <Card>
                  <Card.Header>
                    <Col className="card-title text-center">
                      <span>Edit Counsel Details</span>
                    </Col>
                  </Card.Header>
                  <Card.Body>
                    {data && data.ChamberLawyers && data.ChamberLawyers.length > 0 && (
                      <Row>
                        <table className="table">
                          <thead>
                            <tr>
                              <th className="fw-bold">S/N</th>
                              <th className="fw-bold">Counsel in Chamber</th>
                              <th className="fw-bold">Counsel's Phone Number</th>
                              <th className="fw-bold">Edit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {editDetails.ChamberLawyers.map((lawyer, index) => {
                              const names = parseJSON(lawyer.lawyer_name);
                              const phones = parseJSON(lawyer.lawyer_phone);
                              return names.map((name, idx) => (
                                <tr key={`${index}-${idx}`}>
                                  <td>{index * names.length + idx + 1}</td>
                                  <td>{name || "N/A"}</td>
                                  <td>{phones[idx] || "N/A"}</td>
                                  <td> 
                                    <button
                                      className="btn btn-warning btn-sm my-1"
                                      onClick={() => handleShowEditModal({ name, phone: phones[idx], index, idx })}
                                    >
                                      <span className="fe fe-edit"> </span>
                                    </button>
                                    <button
                                      className="btn btn-danger btn-sm mx-1"
                                      onClick={() => handleShowDeleteModal()}
                                    >
                                      <span className="fe fe-trash"> </span>
                                    </button>
                                  </td>
                                </tr>
                              ));
                            })}
                          </tbody>
                        </table>
                      </Row>
                    )}
                  </Card.Body>
                </Card>

                <CCol xs={12} className="text-center">
                  <CButton color="primary" type="submit">
                    <span className="fe fe-plus"></span>
                    {isLoading ? "Saving data..." : "Save Update"}
                  </CButton>
                </CCol>
              </CForm>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {selectedLawyer && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Counsel Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Lawyer Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={selectedLawyer.name}
                  onChange={handleModalChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={selectedLawyer.phone}
                  onChange={handleModalChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Chamber</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Col lg={12} md={12}>
                Please confirm you are about to delete the Counsel{" "}
                {selectedLawyer?.lawyer_name}?
              </Col>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => setShowDeleteModal(false)}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}
