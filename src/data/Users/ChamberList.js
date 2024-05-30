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
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentChamber, setCurrentChamber] = useState(null);
  const { register, handleSubmit, setValue, reset, control } = useForm({
    defaultValues: {
      lawyers: [{ name: "" }],
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

  const handleShowEditModal = (chamber) => {
    setCurrentChamber(chamber);

    console.log(currentChamber);
    setValue("chamber_name", chamber.chamber_name);
    setValue("chamber_head", chamber.chamber_head);
    setValue("address", chamber.address);
    setValue("email", chamber.email);
    setValue("phone", chamber.phone);

    // Extract lawyers from ChamberLawyers array
    const lawyers = chamber.ChamberLawyers[0]?.lawyer_name
      ? JSON.parse(chamber.ChamberLawyers[0].lawyer_name)
      : [];
    reset({ lawyers: lawyers.map((lawyer) => ({ name: lawyer })) });
    setShowEditModal(true);
  };

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

  const updateChamber = async (formData) => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append("chamber_name", formData.chamber_name);
      data.append("chamber_head", formData.chamber_head);
      data.append("address", formData.address);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append(
        "lawyer_name",
        JSON.stringify(formData.lawyers.map((lawyer) => lawyer.name))
      );

      await endpoint.put(`/solicitor/edit/${currentChamber.id}`, data);
      getChamberList();
      SuccessAlert("Chamber updated successfully.");
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
      ErrorAlert("Failed to update chamber.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddLawyer = () => {
    append({ name: "" });
  };

  const handleRemoveLawyer = (index) => {
    remove(index);
  };

  const columns = [
    { name: "#", cell: (row, index) => index + 1, width: "65px" },
    {
      name: "Chamber name",
      selector: (row) => row.chamber_name,
      style: { textAlign: "right" },
      sortable: true,
      width: "150px",
      cell: (row) => (
        <div className="fs-12 fw-bold">{row.chamber_name.toUpperCase()}</div>
      ),
    },
    {
      name: "Chamber Head",
      selector: (row) => row.chamber_head,
      style: { textAlign: "left" },
      sortable: true,
      width: "150px",
      cell: (row) => (
        <div className="fs-12 fw-bold">{row.chamber_head || ""}</div>
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
      style: { textAlign: "left" },
      sortable: true,
      width: "150px",
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
      width: "150px",
      cell: (row) => <div className="fs-12 fw-bold">{row.address || ""}</div>,
    },
    {
      name: "Action",
      selector: (row) => row.id,
      style: { textAlign: "right" },
      cell: (row) => (
        <div className="fs-12 fw-bold d-flex justify-content-end align-items-center">
          <button
            className="btn btn-warning btn-sm me-2 my-1"
            onClick={() => handleShowEditModal(row)}
          >
            <span className="fe fe-edit"> </span>
          </button>
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

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Chamber</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CForm
            onSubmit={handleSubmit(updateChamber)}
            className="row g-3 needs-validation"
          >
            <CCol md={6}>
              <CFormLabel htmlFor="chamberName">Chamber's Name</CFormLabel>
              <CFormInput
                defaultValue={currentChamber ? currentChamber.chamber_name : ""}
                id="chamberName"
                {...register("chamber_name", { required: true })}
                type="text"
                name="chamberName"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="chamberHead">Chamber's Head</CFormLabel>
              <CFormInput
                defaultValue={currentChamber ? currentChamber.chamber_head : ""}
                id="chamberHead"
                {...register("chamber_head", { required: true })}
                type="text"
                name="chamberHead"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="email">Email</CFormLabel>
              <CFormInput
                defaultValue={currentChamber ? currentChamber.email : ""}
                id="email"
                {...register("email", { required: true })}
                type="email"
                name="email"
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel htmlFor="phone">Phone</CFormLabel>
              <CFormInput
                defaultValue={currentChamber ? currentChamber.phone : ""}
                id="phone"
                {...register("phone", { required: true })}
                type="text"
                name="phone"
              />
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="address">Address</CFormLabel>
              <CFormTextarea
                defaultValue={currentChamber ? currentChamber.address : ""}
                id="address"
                {...register("address", { required: true })}
                rows="3"
                name="address"
              ></CFormTextarea>
            </CCol>
            <CCol md={12}>
              <CFormLabel htmlFor="lawyers">Lawyers</CFormLabel>
              {fields.map((lawyer, index) => (
                <div key={lawyer.id} className="d-flex mb-2">
                  <CFormInput
                    {...register(`lawyers.${index}.name`, { required: true })}
                    type="text"
                    className="me-2"
                  />
                  <CButton
                    color="danger"
                    style={{
                      fontSize: 10,
                      padding: "2px 6px",
                      maxWidth: 52,
                      minWidth: 52,
                    }}
                    onClick={() => handleRemoveLawyer(index)}
                  >
                    Remove
                  </CButton>
                </div>
              ))}
              <CButton
                color="primary"
                style={{
                  fontSize: 10,
                  padding: "2px 6px",
                  maxWidth: 52,
                  minWidth: 52,
                }}
                onClick={handleAddLawyer}
              >
                ADD
              </CButton>
            </CCol>
          </CForm>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditModal(false)}
            className="me-auto"
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit(updateChamber)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChamberList;
