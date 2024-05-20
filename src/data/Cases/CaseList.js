import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger, Tooltip, Badge, FormSelect } from "react-bootstrap";
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
import { color } from "echarts";

const CaseList = () => {
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


  // Fetch chambers list
  const getCaseList = async () => {
    setLoading(true);
    try {
      const res = await endpoint.get("/case/list");
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };



  // Show delete modal
  const handleShowDeleteModal = (row) => {
    setValue(row);
    setShowDeleteModal(true);
  };



  useEffect(() => {
    getCaseList();

  }, []);

  // Columns for DataTable
  const columns = [
    { name: "#", cell: (row, index) => index + 1, width: "65px" },
    {
      name: "Suite No",
      selector: (row) => row.suite_no,
      style: { textAlign: "right" },
      sortable: true,
      width: "200px",
      cell: (row) => <div className="fs-12 fw-bold">{row.suite_no}</div>,
    },
    {
      name: "Case Type",
      selector: (row) => row.CaseType,
      style: { textAlign: "center" },
      sortable: true,
      width: "300px",
      cell: (row) => (
        <div
          className="fs-12 fw-bold"
          style={{
            backgroundColor: `${row.CaseType ? row.CaseType.case_color : ""}`,
            color: "white",
            width: "200px",
            height: "50px",
            display: "flex", // Added to enable flexbox
            justifyContent: "center", // Centers content horizontally
            alignItems: "center", // Centers content vertically
          }}>
          <span className="text-xl m-3 p-3">
            {row.CaseType ? row.CaseType.case_type : ""}
          </span>
        </div>
      ),
    },
    {
      name: "Court",
      selector: (row) => row.Court && row.Court.name,
      style: { textAlign: "left" },
      sortable: true,
      width: "250px",
      cell: (row) => (
        <div className="fs-12 fw-bold">{row.Court ? row.Court.name : ""}</div>
      ),
    },
    {
      name: "Parties",
      selector: (row) => row.parties,
      style: { textAlign: "right" },
      sortable: true,
      width: "300px",
      cell: (row) => <div className="fs-12 fw-bold">{row.parties || ""}</div>,
    },
    {
      name: "Appellant",
      selector: (row) => row.appellants,
      style: { textAlign: "right" },
      sortable: true,
      width: "300px",
      cell: (row) => (
        <div className="fs-12 fw-bold">{row.appellants || ""}</div>
      ),
    },
    {
      name: "Respondent",
      selector: (row) => row.respondent,
      style: { textAlign: "right" },
      sortable: true,
      width: "300px",
      cell: (row) => (
        <div className="fs-12 fw-bold">{row.respondent || ""}</div>
      ),
    },
    {
      name: "Legal Officer",
      selector: (row) => row.LegalOfficer,
      style: { textAlign: "right" },
      sortable: true,
      width: "180px",
      cell: (row) => (
        <div className="fs-12 fw-bold">
          {row.LegalOfficer
            ? row.LegalOfficer.surname +
              " " +
              row.LegalOfficer.first_name +
              " " +
              row.LegalOfficer.middle_name
            : "Not yet assigned"}
        </div>
      ),
    },
    {
      name: "Chamber/Solicitor",
      selector: (row) => row.ChamberOrSolicitor,
      style: { textAlign: "right" },
      sortable: true,
      width: "180px",
      cell: (row) => (
        <div className="fs-12 fw-bold">
          {row.ChamberOrSolicitor
            ? row.ChamberOrSolicitor.name
            : "Not yet assigned"}
        </div>
      ),
    },
    {
      name: "Action",
      selector: (row) => row.id,
      style: { textAlign: "right" },
      cell: (row) => (
        <div className="fs-12 fw-bold">
          <Link
            to={`/case/${row.id}`}
            className="btn btn-primary btn-sm my-1">
            <span className="fe fe-eye"> </span>
          </Link>
          <Link
            to={`/edit/case/${row.id}`}
            className="btn btn-warning btn-sm my-1">
            <span className="fe fe-edit"> </span>
          </Link>
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleShowDeleteModal(row)}>
            <span className="fe fe-trash"> </span>
          </button>
        </div>
      ),
    },
  ];

  const deletechamber = async (id) => {
    setLoading(true);
    await endpoint
      .delete(`/case/delete/${id}`)
      .then((res) => {
        getCaseList();
        setLoading(false);
        SuccessAlert(res.data.message);
        setShowDeleteModal(false);
      })
      .catch((err) => {
        setLoading(false);
        setShowDeleteModal(false);
        console.log(err);
      });
  };
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
                Please confirm you are about to delete the case with suite number of {" "}
                {value.suite_no }
                ?
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
          <Button
            variant="danger"
            onClick={() => deletechamber(value.id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CaseList;
