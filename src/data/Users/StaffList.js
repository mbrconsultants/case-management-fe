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

const StaffList = () => {
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
  const [courtList, setCourtList] = useState([]);
  const [statesList, setStatesList] = useState([]);
  const [lgasList, setLgasList] = useState([]);
  const [titleList, setTitleList] = useState([]);
  const [sign, setSign] = useState();
  const [url, setUrl] = useState();

  // Fetch chambers list
  const getStaffList = async () => {
    setLoading(true);
    try {
      const res = await endpoint.get("/legal-officer/list");
      setData(res.data.data);
      console.log("====================================");
      console.log(res.data.data);
      console.log("====================================");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const [details, setDetails] = useState({
    surname: "",
    first_name: "",
    middle_name: "",
    title_id: "",
    court_id: "",
    state_id: "",
    lga_id: "",
    signature: null,
    phone: "",
    email: "",
  });

  // Show delete modal
  const handleShowDeleteModal = (row) => {
    setValue(row);
    setShowDeleteModal(true);
  };

  //get title list
  const getTitletList = async () => {
    setLoading(true);
    await endpoint
      .get("/title/list")
      .then((res) => {
        //  console.log("roles", res.data.data)
        setTitleList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
      });
  };

  useEffect(() => {
    getStaffList();
    getTitletList();
    getStatestList();
  }, []);

  // Columns for DataTable
  const columns = [
    { name: "#", cell: (row, index) => index + 1, width: "65px" },
    {
      name: "Fullname",
      selector: (row) => row.surname,
      style: { textAlign: "right" },
      sortable: true,
      width: "300px",
      cell: (row) => (
        <div className="fs-12 fw-bold">
          {(row.Title ? row.Title.name : "") +
            " " +
            row.surname.toUpperCase() +
            " " +
            row.first_name.toUpperCase() +
            " " +
            row.middle_name.toUpperCase()}
        </div>
      ),
    },
    {
      name: "Email",
      selector: (row) => row.email,
      style: { textAlign: "left" },
      sortable: true,
      width: "250px",
      cell: (row) => <div className="fs-12 fw-bold">{row.email || ""}</div>,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      style: { textAlign: "right" },
      sortable: true,
      width: "180px",
      cell: (row) => <div className="fs-12 fw-bold">{row.phone || ""}</div>,
    },
    {
      name: "Court",
      selector: (row) => row.Court?.name,
      style: { textAlign: "left" },
      sortable: true,
      width: "200px",
      cell: (row) => (
        <div className="fs-12 fw-bold">{row.Court?.name || ""}</div>
      ),
    },
    {
      name: "State",
      selector: (row) => row.State?.name,
      style: { textAlign: "right" },
      sortable: true,
      width: "200px",
      cell: (row) => (
        <div className="fs-12 fw-bold">{row.State?.name || ""}</div>
      ),
    },
    {
      name: "Action",
      selector: (row) => row.id,
      style: { textAlign: "right" },
      cell: (row) => (
        <div className="fs-12 fw-bold d-flex justify-content-end align-items-center">
          <Link
            to={`/new-staff/${row.id}`}
            className="btn btn-warning btn-sm my-1 mx-3">
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
  const deletechamber = async (id) => {
    setLoading(true);
    await endpoint
      .delete(`/legal-officer/delete/${id}`)
      .then((res) => {
        getStaffList();
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
                Please confirm you are about to delete the staff{" "}
                {value.surname +
                  " " +
                  value.first_name +
                  " " +
                  value.middle_name}
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

export default StaffList;
