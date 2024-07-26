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
import { ErrorAlert, SuccessAlert } from "../Toast/toast";
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

const LegalOfficerList = () => {
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
  // const [courtList, setCourtList] = useState([]);
  // const [statesList, setStatesList] = useState([]);
  // const [lgasList, setLgasList] = useState([]);
  const [titleList, setTitleList] = useState([]);
  // const [sign, setSign] = useState();
  const [url, setUrl] = useState();

  // Fetch chambers list
  const getLegalOfficerListList = async () => {
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
    phone: "",
    phone_2: "",
    email: "",
    email_2: "",
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
    getLegalOfficerListList();
    getTitletList();
    // getStatestList();
  }, []);


  const deletechamber = async (id) => {
    try {
      const res = await endpoint.delete(`/legal-officer/delete/${id}`);
      SuccessAlert(res.data.message);
      getLegalOfficerListList();
      setLoading(false);
      setShowDeleteModal(false);
    } catch (error) {
      if (error.response) {
        setLoading(false);
        ErrorAlert(error.response.data.message);
        setShowDeleteModal(false);

      }
    }
  };

   // Utility function to convert text to capitalize the first letter of each word
   const toTitleCase = (text) => {
    return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
  };

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
          {(row.Title ? toTitleCase(row.Title.name) : "") +
            " " +
            toTitleCase(row.surname) +
            " " +
            toTitleCase(row.first_name) +
            " " +
            toTitleCase(row.middle_name)}
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
      name: "Action",
      selector: (row) => row.id,
      style: { textAlign: "right" },
      cell: (row) => (
        <div className="fs-12 fw-bold d-flex justify-content-end align-items-center">
           <Link
            to={`/single-legal-officer/${row.id}`}
            className="btn btn-primary btn-sm mx-1">
            <span className="fe fe-eye"> </span>
          </Link>
          <Link
            to={`/new-legal-officer/${row.id}`}
            className="btn btn-warning btn-sm mx-1"
          >
            <span className="fe fe-edit"> </span>
          </Link>
          <button
            className="btn btn-danger btn-sm"
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
          <Modal.Title>Remove Legal Officer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Col lg={12} md={12}>
                Please confirm you are about to delete the legal officer{" "}
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
          <Button variant="warning" onClick={() => setShowDeleteModal(false)}>
            Close
          </Button>
          {/* Implement the delete logic here */}
          <Button variant="danger" onClick={() => deletechamber(value.id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LegalOfficerList;
