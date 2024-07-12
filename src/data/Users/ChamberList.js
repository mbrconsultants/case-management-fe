import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { Modal, Card, Button, Row, Col } from "react-bootstrap";
import endpoint from "../../context/endpoint";
import {
  CForm,
  CCol,
  CFormLabel,
  CFormInput,
  CButton,
  CFormTextarea,
} from "@coreui/react";
import { ErrorAlert, SuccessAlert } from "../../data/Toast/toast";
import Loader from "../Loader/loader";
import { useForm, useFieldArray } from "react-hook-form";

const ChamberList = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);
  const [currentChamber, setCurrentChamber] = useState(null);
  // const [editModalDetails, setEditModalDetails] = useState({
  //   chamber_name: "",
  //   chamber_head: "",
  //   address: "",
  //   email: "",
  //   email_2: "",
  //   phone: "",
  //   phone_2: "",
  //   lawyers: [{ lawyer_name: "", lawyer_phone: "" }],
  // });
  

  const { register, handleSubmit, setValue, reset, control } = useForm({
    defaultValues: {
      lawyers: [{ lawyer_name: "", lawyer_phone: "" }],
    },
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "lawyers",
  });

  // Fetch chambers list
  const getChamberList = async () => {
    setLoading(true);
    try {
      const res = await endpoint.get("/solicitor/list");
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChamberList();
  }, []);

  const handleShowDeleteModal = (chamber) => {
    setCurrentChamber(chamber);
    setShowDeleteModal(true);
  };


  // const handleShowEditModal = (chamberDetails) => {
  //   // Ensure `lawyers` is an array and parse the JSON strings
  //   const lawyers = Array.isArray(chamberDetails.lawyers)
  //     ? chamberDetails.lawyers.map((lawyer) => ({
  //         lawyer_name: JSON.parse(lawyer.lawyer_name)[0] || "",
  //         lawyer_phone: JSON.parse(lawyer.lawyer_phone)[0] || "",
  //       }))
  //     : [];

  //   // Initialize editModalDetails with the necessary properties
  //   setEditModalDetails({
  //     chamber_name: chamberDetails.chamber_name || "",
  //     chamber_head: chamberDetails.chamber_head || "",
  //     address: chamberDetails.address || "",
  //     email: chamberDetails.email || "",
  //     email_2: chamberDetails.email_2 || "",
  //     phone: chamberDetails.phone || "",
  //     phone_2: chamberDetails.phone_2 || "",
  //     lawyers,
  //   });

  //   // Set the form values for the edit modal
  //   setValue("chamber_name", chamberDetails.chamber_name || "");
  //   setValue("chamber_head", chamberDetails.chamber_head || "");
  //   setValue("address", chamberDetails.address || "");
  //   setValue("email", chamberDetails.email || "");
  //   setValue("email_2", chamberDetails.email_2 || "");
  //   setValue("phone", chamberDetails.phone || "");
  //   setValue("phone_2", chamberDetails.phone_2 || "");

  //   lawyers.forEach((lawyer, index) => {
  //     setValue(`lawyers.${index}.lawyer_name`, lawyer.lawyer_name);
  //     setValue(`lawyers.${index}.lawyer_phone`, lawyer.lawyer_phone);
  //   });

  //   // Show the edit modal
  //   setShowEditModal(true);
  // };

  
  
  
  

  const deleteChamber = async (id) => {
    setLoading(true);
    try {
      await endpoint.delete(`/solicitor/delete/${id}`);
      getChamberList();
      SuccessAlert("Chamber deleted successfully.");
    } catch (err) {
      console.error(err);
      ErrorAlert("Failed to delete chamber.");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  // const updateChamber = async (formData) => {
  //   setLoading(true);
  //   try {
  //     const data = new FormData();
  //     data.append("chamber_name", formData.chamber_name);
  //     data.append("chamber_head", formData.chamber_head);
  //     data.append("address", formData.address);
  //     data.append("email", formData.email);
  //     data.append("email_2", formData.email_2);
  //     data.append("phone", formData.phone);
  //     data.append("phone_2", formData.phone_2);
  //     data.append(
  //       "lawyers",
  //       JSON.stringify(formData.lawyers.map((lawyer) => ({
  //         lawyer_name: lawyer.lawyer_name,
  //         lawyer_phone: lawyer.lawyer_phone
  //       })))
  //     );

  //     await endpoint.put(`/solicitor/edit/${currentChamber.id}`, data);
  //     console.log("Chamber updated data", data);
  //     getChamberList();
  //     SuccessAlert("Chamber updated successfully.");
  //     setShowEditModal(false);
  //   } catch (err) {
  //     console.error(err);
  //     ErrorAlert("Failed to update chamber.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleAddLawyer = () => {
    append({ lawyer_name: "", lawyer_phone: "" });
  };

  const handleRemoveLawyer = (index) => {
    remove(index);
  };

  const parseAndJoin = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        return parsed.join(", ");
      }
      return parsed;
    } catch (error) {
      console.error("Error parsing JSON string:", error);
      return jsonString;
    }
  };


  const columns = [
    { name: "#", cell: (row, index) => index + 1, width: "65px" },
    {
      name: "Chamber Name",
      selector: (row) => row.chamber_name,
      style: { textAlign: "right" },
      sortable: true,
      width: "200px",
      cell: (row) => (
        <div className="fs-12 fw-bold">{row.chamber_name.toUpperCase()}</div>
      ),
    },
    {
      name: "Head of Chamber",
      selector: (row) => row.chamber_head,
      style: { textAlign: "left" },
      sortable: true,
      width: "200px",
      cell: (row) => (
        <div className="fs-12 fw-bold">{row.chamber_head || ""}</div>
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
      style: { textAlign: "left" },
      sortable: true,
      width: "200px",
      cell: (row) => <div className="fs-12 fw-bold">{row.email || ""}</div>,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      style: { textAlign: "right" },
      sortable: true,
      width: "110px",
      cell: (row) => <div className="fs-12 fw-bold">{row.phone || ""}</div>,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      style: { textAlign: "left" },
      sortable: true,
      width: "200px",
      cell: (row) => <div className="fs-12 fw-bold">{row.address || ""}</div>,
    },
    {
      name: "Action",
      selector: (row) => row.id,
      style: { textAlign: "right" },
      cell: (row) => (
        <div className="fs-12 fw-bold d-flex justify-content-end align-items-center">
          <Link
            to={`/single-chamber/${row.id}`}
            className="btn btn-primary btn-sm mx-1"
          >
            <span className="fe fe-eye"> </span>
          </Link>
          <Link
            to={`/edit-chamber/${row.id}`}
            className="btn btn-warning btn-sm mx-1"
          >
            <span className="fe fe-edit"> </span>
          </Link>
          {/* <button
            className="btn btn-warning btn-sm me-2 my-1"
            onClick={() => handleShowEditModal(row)}
          >
            <span className="fe fe-edit"> </span>
          </button> */}
          <button
            className="btn btn-danger btn-sm my-1"
            onClick={() => handleShowDeleteModal(row)}
          >
            <span className="fe fe-trash"> </span>
          </button>
        </div>
      ),
    },
  ];

  const tableDatas = { columns, data };

  return (
    <>
      <DataTableExtensions {...tableDatas}>
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable
            fixedHeader
            columns={columns}
            data={data}
            persistTableHead
            defaultSortField="id"
            defaultSortAsc={false}
            striped
            center
            pagination
            paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
            highlightOnHover
          />
        )}
      </DataTableExtensions>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Chamber</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Col lg={12} md={12}>
                Please confirm you are about to delete the chamber{" "}
                {currentChamber?.chamber_name}?
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
            onClick={() => deleteChamber(currentChamber.id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Chamber</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CForm
            className="row g-3 needs-validation"
            onSubmit={handleSubmit(updateChamber)}
          >
            <CCol md={6}>
              <CFormLabel htmlFor="chamber_name">Chamber Name</CFormLabel>
              <CFormInput
                defaultValue={editModalDetails ? editModalDetails.chamber_name : ""}
                style={{ border: "1px solid #000", padding: "10px" }}
                id="chamber_name"
                {...register("chamber_name", { required: true })}
                type="text"
                name="chamber_name"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="chamber_head">Head of Chamber</CFormLabel>
              <CFormInput
                defaultValue={editModalDetails ? editModalDetails.chamber_head : ""}
                style={{ border: "1px solid #000", padding: "10px" }}
                id="chamber_head"
                {...register("chamber_head", { required: true })}
                type="text"
                name="chamber_head"
              />
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="address">Address</CFormLabel>
              <CFormTextarea
                defaultValue={editModalDetails ? editModalDetails.address : ""}
                style={{ border: "1px solid #000", padding: "10px" }}
                id="address"
                {...register("address", { required: true })}
                type="text"
                name="address"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="email">Email</CFormLabel>
              <CFormInput
                defaultValue={editModalDetails ? editModalDetails.email : ""}
                style={{ border: "1px solid #000", padding: "10px" }}
                id="email"
                {...register("email", { required: true })}
                type="text"
                name="email"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="email2">Alternate Email</CFormLabel>
              <CFormInput
                defaultValue={editModalDetails ? editModalDetails.email_2 : ""}
                style={{ border: "1px solid #000", padding: "10px" }}
                id="email_2"
                {...register("email_2")}
                type="text"
                name="email_2"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="phone">Phone</CFormLabel>
              <CFormInput
                defaultValue={editModalDetails ? editModalDetails.phone : ""}
                style={{ border: "1px solid #000", padding: "10px" }}
                id="phone"
                {...register("phone", { required: true })}
                type="text"
                name="phone"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="phone2">Alternative Phone</CFormLabel>
              <CFormInput
                defaultValue={editModalDetails ? editModalDetails.phone_2 : ""}
                style={{ border: "1px solid #000", padding: "10px" }}
                id="phone_2"
                {...register("phone_2")}
                type="text"
                name="phone_2"
              />
            </CCol>
           
            {fields.map((item, index) => (
              <div key={item.id} className="row mb-1">
                <CCol md={6}>
                  <CFormLabel htmlFor={`lawyer_name_${index}`}>Counsel in Chamber</CFormLabel>
                  <CFormInput
                    style={{ border: "1px solid #000", padding: "10px" }}
                    id={`lawyer_name_${index}`}
                    {...register(`lawyers.${index}.lawyer_name`, { required: true })}
                    value={editModalDetails?.lawyers[index]?.lawyer_name || ""}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor={`lawyer_phone_${index}`}>Counsel's Phone Number</CFormLabel>
                  <CFormInput
                    style={{ border: "1px solid #000", padding: "10px" }}
                    id={`lawyer_phone_${index}`}
                    {...register(`lawyers.${index}.lawyer_phone`, { required: true })}
                    value={editModalDetails?.lawyers[index]?.lawyer_phone || ""}
                  />
                </CCol>
                <CCol md={12}>
                  {index === fields.length - 1 ? (
                    <div>
                      <Button
                        variant="primary"
                        style={{
                          fontSize: 10,
                          padding: "2px 6px",
                          maxWidth: 52,
                          minWidth: 52,
                        }}
                        onClick={handleAddLawyer}
                        className="mt-2"
                      >
                        Add
                      </Button>
                      {fields.length > 1 && (
                        <Button
                          variant="danger"
                          style={{
                            fontSize: 10,
                            padding: "2px 6px",
                            maxWidth: 52,
                            minWidth: 52,
                          }}
                          onClick={() => handleRemoveLawyer(index)}
                          className="mt-2 ms-2"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ) : (
                    <Button
                      variant="danger"
                      style={{
                        fontSize: 10,
                        padding: "2px 6px",
                        maxWidth: 52,
                        minWidth: 52,
                      }}
                      onClick={() => handleRemoveLawyer(index)}
                      className="mt-2"
                    >
                      Remove
                    </Button>
                  )}
                </CCol>
              </div>
            ))}
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                className="me-2"
                onClick={() => setShowEditModal(false)}
              >
                Close
              </Button>
              <Button variant="primary" type="submit">
                Update Chamber
              </Button>
            </div>
          </CForm>
        </Modal.Body>
      </Modal> */}
    </>
  );
};

export default ChamberList;
