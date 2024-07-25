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
  const [showAddLawyerModal, setShowAddLawyerModal] = useState(false);
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
    ChamberLawyers: [],
  });
  const [addNewLawyer, setAddNewLawyer] = useState({
    lawyer_name: '', 
    lawyer_phone: '',
    // chamber_id: null
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const params = useParams();
  const id = params?.id;

  const getSingleStaff = async () => {
    setLoading(true);
    try {
      const res = await endpoint.get(`/solicitor/show/${id}`);
      console.log("single chamber", res.data.data);
      const data = res.data.data;
      setEditDetails({
        ...data,
        ChamberLawyers: Array.isArray(data.ChamberLawyers) ? data.ChamberLawyers : [],
      });
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
       const resp = await endpoint.put(`/solicitor/edit/${id}`, data);
        SuccessAlert(resp.data.message);
        // window.location.reload(); // Reload the page after successful edit
      } else {
        navigate(`${process.env.PUBLIC_URL}/chamber-list`);
      }
    } catch (err) {
      setLoading(false);
      ErrorAlert(err.response?.data?.description);
    }
  };
  

  const handleShowEditModal = (lawyer) => {
    console.log("lawyer Details", lawyer);
    setSelectedLawyer(lawyer);
    setShowEditModal(true);
  };

  const handleShowDeleteModal = (lawyer) => {
    setSelectedLawyer(lawyer);
    setShowDeleteModal(true);
  };

  const handleLawyerChange = (index, value, field) => {
    const newLawyerDetails = [...editDetails.ChamberLawyers];
    newLawyerDetails[index] = { ...newLawyerDetails[index], [field]: value };
    setEditDetails((prevState) => ({
      ...prevState,
      ChamberLawyers: newLawyerDetails,
    }));
  };
  
  const handleShowAddModal = () => {
    console.log("B11", id);
    // setSelectedLawyer({ lawyer_name: '', lawyer_phone: '', chamber_id: id });
    setSelectedLawyer(id);
    setShowAddLawyerModal(true);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setSelectedLawyer({
      ...selectedLawyer,
      [name]: value,
    });
  };

  const handleSaveModal = () => {
    // Assuming you have a unique 'id' field
    const index = editDetails.ChamberLawyers.findIndex(
      (lawyer) => lawyer.id === selectedLawyer.id
    );
    
    if (index !== -1) {
      handleLawyerChange(index, selectedLawyer.id, "id");
      handleLawyerChange(index, selectedLawyer.lawyer_name, "lawyer_name");
      handleLawyerChange(index, selectedLawyer.lawyer_phone, "lawyer_phone");
      updateCounselDetails(selectedLawyer);
    } else {
      console.error("Lawyer not found");
    }
    
    setShowEditModal(false);
  };
  
  

  const handleDelete = () => {
    const index = editDetails.ChamberLawyers.findIndex(
      (lawyer) => lawyer.lawyer_name === selectedLawyer.lawyer_name
    );
    if (index !== -1) {
      handleLawyerChange(index, "", "lawyer_name");
      handleLawyerChange(index, "", "lawyer_phone");
      deleteCounsel(selectedLawyer);
    } else {
      console.error("Lawyer not found");
    }
    setShowDeleteModal(false);
  };

  const updateCounselDetails = async (data) => {
    const data2 = new FormData();
    data2.append("lawyerId", data.id);
    try {
      const res = await endpoint.post(`/solicitor/counsel/edit/${id}`, data);
      console.log("Edit details", res);
      SuccessAlert(res.data.message);
      getSingleStaff();
      setShowEditModal(false);
    } catch (error) {
      if (error.response) {
        ErrorAlert(error.response.data.description);
      }
    }
  };
  
  const handleLawyerModalChange = (e) => {
    const { name, value } = e.target;
    setSelectedLawyer({
      ...selectedLawyer,
      [name]: value,
    });
  };
  
  const handleAddLawyer = async () => {
    // e.preventDefault();
    console.log("addNewLawyer", id);
    addNewLawyer.chamber_id = id;
    console.log(addNewLawyer);
    const data3 = new FormData();
    data3.append("lawyer_name", addNewLawyer.lawyer_name);
    data3.append("lawyer_phone", addNewLawyer.lawyer_phone);
    // data3.append("chamber_id", addNewLawyer.chamber_id);
    
    try {
      const res = await endpoint.post(`/solicitor/add-lawyer-to-chamber/${id}`, data3);
      console.log("Add Lawyer Details", res.data);
      SuccessAlert(res.data.message);
      getSingleStaff();
      setShowAddLawyerModal(false);
    } catch (error) {
      if (error.response) {
        ErrorAlert(error.response.data.description);
      }
    }
  };


  const deleteCounsel = async (data) => {
    try {
      const res = await endpoint.post(`/solicitor/counsel/delete/${id}`, { data });
      SuccessAlert(res.data.message);
      getSingleStaff();
    } catch (error) {
      if (error.response) {
        ErrorAlert(error.response.data.description);
      }
    }
  };

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
                <span>Edit Chamber Credentials</span>
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
                    style={{ border: "1px solid #000", padding: "10px" }}
                    value={editDetails.email_2}
                    onChange={(e) =>
                      setEditDetails({
                        ...editDetails,
                        email_2: e.target.value,
                      })
                    }
                    type="email"
                    name="email2"
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
                    style={{ border: "1px solid #000", padding: "10px" }}
                    value={editDetails.phone_2}
                    onChange={(e) =>
                      setEditDetails({ ...editDetails, phone_2: e.target.value })
                    }
                    type="text"
                    name="phone2"
                  />
                </CCol>
                <CCol md={12}>
                  <CFormLabel htmlFor="address">
                    Address
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </CFormLabel>
                  <CFormInput
                    id="address"
                    style={{ border: "1px solid #000", padding: "10px" }}
                    value={editDetails.address}
                    onChange={(e) =>
                      setEditDetails({ ...editDetails, address: e.target.value })
                    }
                    type="text"
                    name="address"
                  />
                </CCol>

                <CCol md={12} className="mt-5">
                  <CFormLabel htmlFor="counsels" className="d-flex justify-content-between align-items-center">
                    <span style={{ color: "", fontSize: "20px" }}>Edit Counsel Details</span>
                    <button type="button" className="btn btn-primary btn-sm" onClick={handleShowAddModal}>
                      Add Counsel
                    </button>
                  </CFormLabel>
                    <hr style={{border: "1px solid #000"}}/>

                  <table className="table mt-6">
                    <thead>
                      <tr>
                        <th className="fw-bold">S/N</th>
                        <th className="fw-bold">Counsel in Chamber</th>
                        <th className="fw-bold">Counsel's Phone Number</th>
                        <th className="fw-bold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {editDetails.ChamberLawyers.map((lawyer, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{lawyer.lawyer_name || ""}</td>
                          <td>{lawyer.lawyer_phone || ""}</td>
                          <td>
                            <CButton
                              color="primary"
                              onClick={() => handleShowEditModal(lawyer)}
                              className="btn-sm me-2"
                            >
                              Edit
                            </CButton>
                            <CButton
                              color="danger"
                              onClick={() => handleShowDeleteModal(lawyer)}
                              className="btn-sm"
                            >
                              Delete
                            </CButton>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CCol>

                <CCol md={12} className="mt-3 text-center mt-5">
                  <CButton type="submit" color="primary">
                    Update Chamber
                  </CButton>
                </CCol>
              </CForm>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Counsel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formLawyerName">
              <Form.Label>Counsel in Chamber</Form.Label>
              <Form.Control
                type="text"
                name="lawyer_name"
                value={selectedLawyer?.lawyer_name || ""}
                onChange={handleModalChange}
              />
            </Form.Group>
            <Form.Group controlId="formLawyerPhone" className="mt-3">
              <Form.Label>Counsel's Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="lawyer_phone"
                value={selectedLawyer?.lawyer_phone || ""}
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


       {/* Add Counsel  */}
       <Modal
          show={showAddLawyerModal}
          onHide={() => setShowAddLawyerModal(false)}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Counsel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formLawyerName">
                <Form.Label>Counsel in Chamber</Form.Label>
                <Form.Control
                  type="text"
                  name="lawyer_name"
                  value={addNewLawyer.lawyer_name}
                  onChange={(e) =>
                    setAddNewLawyer({ ...addNewLawyer, lawyer_name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formLawyerPhone" className="mt-3">
                <Form.Label>Counsel's Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="lawyer_phone"
                  value={addNewLawyer.lawyer_phone || ""}
                  onChange={(e) =>
                    setAddNewLawyer({ ...addNewLawyer, lawyer_phone: e.target.value })
                  }
                />
              </Form.Group>
              {/* <Form.Group controlId="formLawyerPhone" className="mt-3">
                <Form.Label>Counsel's Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  name="chamber_id"
                  value={selectedLawyer}
                  onChange={(e) =>
                    setAddNewLawyer({ ...addNewLawyer, chamber_id: e.target.value })
                  }
                />
              </Form.Group> */}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddLawyerModal(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit" form="add-lawyer-form" onClick={handleAddLawyer}>
              Add Counsel
            </Button>
          </Modal.Footer>
        </Modal>
      {/* End Add Counsel */}

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Counsel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this counsel?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
