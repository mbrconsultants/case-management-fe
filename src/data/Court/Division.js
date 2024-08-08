import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-data-table-component-extensions/dist/index.css";
import endpoint from "../../context/endpoint";
import { useForm } from "react-hook-form";
import { ErrorAlert, SuccessAlert } from "../../data/Toast/toast";
import { CForm } from "@coreui/react";

// import { memoize } from 'react-data-table-component';
import { trim } from "lodash";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import {
  Card,
  Row,
  Col,
  Modal,
  Button,
  FormGroup,
  Form,
} from "react-bootstrap";
import Loader from "../Loader/loader";

export const Division = ({ Division }) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [data, setDivisionList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [division, setNewDivisionName] = useState("");
  const [description, setNewDepartmentDis] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [courtList, setCourtList] = useState([]);
  const [idToDeleteName, setIdToDeleteName] = useState("");
  const [idToDelete, setIdToDelete] = useState("");

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  const [newDivision, setnewDivision] = useState({
    division_id: "",
    court_id: "",
    division: "",
  });

  const handleShowEditModal = () => {
    setShowEditModal(true);
  };

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  //Edit department
  const updateDivision = async () => {
    await endpoint
      .put(`/division/edit/${newDivision.division_id}`, newDivision)
      .then((res) => {
        // console.log("edit", res.data.data);
        setLoading(false);
        SuccessAlert(res.data.message);
        getDivisions();
        setShowEditModal(false);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        ErrorAlert(err.response.data.message);
        // console.log(err)
      });
  };

  const onDelete = (row) => {
    // console.log("role to delete", row.name)
    setIdToDelete(row.id);
    setIdToDeleteName(row.division);
    handleShowDeleteModal();
  };

  //delete department with ID
  const deleteDivision = async (e) => {
    // console.log("court to delete", idToDelete)
    e.preventDefault();
    await endpoint
      .delete(`/division/delete/${idToDelete}`)
      .then((res) => {
        // console.log(res.data)
        SuccessAlert(res.data.message);
        getDivisions();
        setLoading(false);
        setShowDeleteModal(false);
      })
      .catch((err) => {
        setLoading(false);
        ErrorAlert(err.response.data.message);
        // console.log(err)
      });
  };

  const onEdit = (row) => {
    setnewDivision({
      ...newDivision,
      division_id: row.id,
      court_id: row.court_id,
      // state_id: row.state_id,
      division: row.division,
    });
    handleShowEditModal();
  };

  useEffect(() => {
    setDivisionList(Division);
    getDivisions();
    getCourts();
  }, [Division]);

  const getDivisions = async () => {
    await endpoint
      .get(`/division/list`)
      .then(async (res) => {
        setDivisionList(res.data.data);
        // console.log("gg", res.data.data);
      })
      .catch((err) => {});
  };

  const getCourts = async () => {
    setLoading(true);
    await endpoint
      .get("/court/list")
      .then((res) => {
        // console.log("court", res.data.data);
        setCourtList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
      });
  };

  const columns = [
    {
      name: "S/N",
      cell: (row, index) => index + 1 + (page - 1) * perPage,
      width: "60px",
    },

    {
      name: "DIVISION",
      selector: (row) => [row.division],
      sortable: true,
      width: "210px",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.division.toUpperCase()}</h6>
      ),
    },

    {
      name: "COURT",
      selector: (row) => [row?.court_id || ""],
      sortable: true,
      width: "260px",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">
          {row.Court?.name.toUpperCase() || "No Data"}
        </h6>
      ),
    },

    {
      name: <th> ACTIONS </th>,
      sortable: true,
      width: "200px",
      cell: (row) => (
        <Row>
          {" "}
          <Col xs={4} style={{ paddingRight: "0px", paddingLeft: "0px" }}>
            <button
              className="btn btn-blue"
              onClick={(e) => {
                onEdit(row);
              }}
              // variant="secondary"
              title="Action"
            >
              <span className="fe fe-edit" style={{ fontWeight: 900 }}></span>{" "}
              Edit
            </button>
          </Col>
          <Col xs={4}>
            <button
              className="btn btn-danger"
              onClick={(e) => {
                onDelete(row);
              }}
              variant="danger"
              title="Action"
              size="sm"
            >
              <span className="fe fe-trash" style={{ fontWeight: 900 }}></span>{" "}
              Delete
            </button>
          </Col>
        </Row>
      ),
    },
  ];
  const tableDatas = {
    columns,
    data,
  };

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#0A7E51", // Optional: Customize the header row background color
        color: "#fff", // Optional: Customize the header row background color
        fontWeight: 900,
      },
    },
    rows: {
      style: {
        minHeight: "50px", // Optional: Increase row height
        border: "1px solid #000",
      },
    },

    pagination: {
      style: {
        borderTop: "1px solid #000", // Add border to pagination section
      },
    },
  };

  return (
    <div style={{ maxWidth: "700px", overflowX: "auto", margin: "0 auto" }}>
      <DataTableExtensions {...tableDatas}>
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable
            style={{ width: "100%" }}
            customStyles={customStyles}
            fixedHeader
            columns={columns}
            // selectableRows
            data={data}
            // customStyles={customStyles}
            persistTableHead
            defaultSortField="id"
            defaultSortAsc={false}
            striped
            center
            pagination
            // paginationServer
            // paginationTotalRows={totalRows}
            // onChangePage={handlePageChange}
            // onChangeRowsPerPage={handlePerRowsChange}
            paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
            // onChangeRowsPerPage(currentRowsPerPage, currentPage)
            // paginationPerPage={perPage}
            highlightOnHover
            tableStyle={{ minWidth: "20rem" }}
          />
        )}
      </DataTableExtensions>

      <Modal show={showEditModal}>
        <Modal.Header>
          <Button
            onClick={() => setShowEditModal(false)}
            className="btn-close"
            variant=""
          >
            x
          </Button>
        </Modal.Header>
        <CForm
          onSubmit={handleSubmit(updateDivision)}
          className="row g-3 needs-validation"
        >
          <Modal.Body>
            <div>
              <Card>
                <Card.Header>
                  <Card.Title as="h3">Update Division</Card.Title>
                </Card.Header>

                <Card.Body>
                  <Col lg={12} md={12}>
                    <FormGroup>
                      <label htmlFor="exampleInputname">Court</label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          setnewDivision({
                            ...newDivision,
                            court_id: e.target.value,
                          });
                        }}
                        value={newDivision.court_id}
                      >
                        <option value=""> --Select Court-- </option>
                        {courtList.map((court) => (
                          <option key={court.id} value={court.id}>
                            {court.name}
                          </option>
                        ))}
                      </select>
                    </FormGroup>
                  </Col>

                  <br />

                  <Col lg={12} md={12}>
                    <FormGroup>
                      <label htmlFor="exampleInputname">Division Name</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        name="name"
                        value={newDivision.division}
                        onChange={(e) => {
                          setnewDivision({
                            ...newDivision,
                            division: e.target.value,
                          });
                        }}
                        required
                      />
                    </FormGroup>
                  </Col>
                </Card.Body>
              </Card>

              <Modal.Footer>
                <Button
                  variant="dark"
                  className="me-1"
                  onClick={() => setShowEditModal(false)}
                >
                  Close
                </Button>
                <Button variant="primary" type="submit" className="me-1">
                  {" "}
                  <span className="fe fe-arrow-right"></span>
                  Save
                </Button>
              </Modal.Footer>
            </div>
          </Modal.Body>
        </CForm>
      </Modal>

      <Modal show={showDeleteModal}>
        <Modal.Header>
          <Button
            onClick={() => setShowDeleteModal(false)}
            className="btn-close"
            variant=""
          >
            x
          </Button>
        </Modal.Header>

        <Modal.Body>
          <div>
            <Card>
              <Card.Header>
                <Card.Title as="h3">Remove Division</Card.Title>
              </Card.Header>
              <Card.Body>
                <Col lg={12} md={12}>
                  Please confirm you are about to delete {idToDeleteName}?
                </Col>
              </Card.Body>
            </Card>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="dark"
            className="me-1"
            onClick={() => setShowDeleteModal(false)}
          >
            Close
          </Button>
          <Button variant="danger" className="me-1" onClick={deleteDivision}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
