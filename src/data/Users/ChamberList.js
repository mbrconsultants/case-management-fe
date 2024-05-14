import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger, Tooltip, Badge } from "react-bootstrap";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
import {
  CForm,
  CCol,
  CFormLabel,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CButton,
  CFormCheck,
} from "@coreui/react";
import moment from "moment";
import { Modal, FormGroup, Form } from "react-bootstrap";
import { ErrorAlert, SuccessAlert } from "../../data/Toast/toast";
import {
  DropdownButton,
  ButtonGroup,
  Card,
  Button,
  Row,
  Col,
  InputGroup,
  Dropdown,
} from "react-bootstrap";
import Loader from "../Loader/loader";
import { useForm } from "react-hook-form";

const ChamberList = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();
  const [data, setData] = useState([]);
  const [value, setValue] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [roles, setRoles] = useState([]);

  // Fetch chambers list
  const getChambersList = async () => {
    setLoading(true);
    try {
      const res = await endpoint.get("/chamber/list/1");
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch roles
  const getRoles = async () => {
    setLoading(true);
    try {
      const res = await endpoint.get("/role/getRoles");
      setRoles(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Show edit modal
  const handleShowEditModal = (row) => {
    setValue(row);
    setShowEditModal(true);
    reset();
  };

  // Show delete modal
  const handleShowDeleteModal = (row) => {
    setValue(row);
    setShowDeleteModal(true);
  };

  useEffect(() => {
    getChambersList();
    getRoles();
  }, []);

  // Edit chamber
  const modifyChamber = async (formData) => {
    try {
      setLoading(true);
      await endpoint.put(`/chamber/modify/${value.id}`, formData);
      SuccessAlert("chamber updated successfully!");
      getChambersList();
      setShowEditModal(false);
    } catch (error) {
      if (error.response) {
        ErrorAlert(error.response.data.description);
      }
    } finally {
      setLoading(false);
    }
  };

  // Columns for DataTable
  const columns = [
    { name: "#", cell: (row, index) => index + 1, width: "65px" },
    {
      name: "First Name",
      selector: (row) => row.fullname,
      style: { textAlign: "right" },
      sortable: true,
      width: "300px",
      cell: (row) => (
        <div className="fs-12 fw-bold">{row.fullname.toUpperCase()}</div>
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
      style: { textAlign: "right" },
      sortable: true,
      width: "200px",
      cell: (row) => <div className="fs-12 fw-bold">{row.email || ""}</div>,
    },
    {
      name: "Role",
      selector: (row) => row.Role?.role_name,
      style: { textAlign: "right" },
      sortable: true,
      width: "200px",
      cell: (row) => (
        <div className="fs-12 fw-bold">{row.Role?.role_name || ""}</div>
      ),
    },
    {
      name: "Action",
      selector: (row) => row.id,
      style: { textAlign: "right" },
      cell: (row) => (
        <div className="fs-12 fw-bold">
          <button
            className="btn btn-warning btn-sm my-1"
            onClick={() => handleShowEditModal(row)}>
            <span className="fe fe-edit"> </span>
          </button>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleShowDeleteModal(row)}>
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

      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update chamber Details</Modal.Title>
        </Modal.Header>
        <CForm
          onSubmit={handleSubmit(modifyChamber)}
          className="row g-3 needs-validation">
          <Modal.Body>
            <Card>
              <Card.Body>
                <Col
                  lg={12}
                  md={12}>
                  {["first_name", "last_name", "other_name"].map(
                    (field, index) => (
                      <FormGroup key={index}>
                        <label>{field.replace("_", " ").toUpperCase()}</label>
                        <Form.Control
                          type="text"
                          readOnly
                          {...register(field)}
                          defaultValue={
                            value.Profile ? value.Profile[field] : ""
                          }
                          className="form-control"
                        />
                      </FormGroup>
                    )
                  )}
                  <FormGroup>
                    <label>Email</label>
                    <Form.Control
                      type="text"
                      {...register("email")}
                      defaultValue={value.email || ""}
                      className="form-control"
                    />
                  </FormGroup>
                  {["password", "new_password"].map((field, index) => (
                    <FormGroup key={index}>
                      <label>{field.replace("_", " ").toUpperCase()}</label>
                      <Form.Control
                        type="password"
                        {...register(field)}
                        className="form-control"
                      />
                    </FormGroup>
                  ))}
                  <FormGroup>
                    <label>Roles</label>
                    <select
                      className="form-control"
                      {...register("role_id", {
                        required: "Please select roles",
                      })}>
                      <option value={value.Role?.id || ""}>
                        {value.Role?.role_name || "--Select Roles--"}
                      </option>
                      {roles.map((role) => (
                        <option
                          key={role.id}
                          value={role.id}>
                          {role.role_name}
                        </option>
                      ))}
                    </select>
                    {errors.role_id && (
                      <span className="text-danger">Role required</span>
                    )}
                  </FormGroup>
                </Col>
              </Card.Body>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="warning"
              onClick={() => setShowEditModal(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              type="submit">
              Save
            </Button>
          </Modal.Footer>
        </CForm>
      </Modal>

      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Remove Unit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Col
                lg={12}
                md={12}>
                Please confirm you are about to delete?
              </Col>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() => setShowDeleteModal(false)}>
            Close
          </Button>
          {/* Implement the delete logic here */}
          {/* <Button variant="danger" onClick={() => deletechamber(value.id)}>Delete</Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ChamberList;
