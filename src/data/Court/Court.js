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

export const Court = ({ Court }) => {
  const {
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [data, setCourtList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [CourtId, setCourtId] = useState("");
  const [name, setNewCourtName] = useState("");
  const [description, setNewDepartmentDis] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [newDivision, setnewDivision] = useState({
    court_id: "",
    state_id: "",
    name: "",
  });

  // const [divisionList, setDivisionList] = useState([]);
  const [stateList, setStateList] = useState([]);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [idToDelete, setIdToDelete] = useState("");
  const [idToDeleteName, setIdToDeleteName] = useState("");

  const handleShowEditModal = () => {
    setShowEditModal(true);
  };

  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  //Edit department
  const updateCourt = async () => {
    await endpoint
      .put(`/court/edit/${newDivision.court_id}`, newDivision)
      .then((res) => {
        setLoading(false);
        SuccessAlert(res.data.message);
        getCourts();
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
    setIdToDeleteName(row.name);
    handleShowDeleteModal();
  };

  const deleteCourt = async (e) => {
    // console.log("court to delete", idToDelete)
    e.preventDefault();
    await endpoint
      .delete(`/court/delete/${idToDelete}`)
      .then((res) => {
        // console.log(res.data)
        SuccessAlert(res.data.message);
        getCourts();
        setLoading(false);
        setShowDeleteModal(false);
      })
      .catch((err) => {
        setLoading(false);
        ErrorAlert(err.response.data.message);
        // console.log(err)
      });
  };

  useEffect(() => {
    setCourtList(Court);
    getCourts();
    // getDivisionList();
    getStateList();
  }, [Court]);

  //get courts list
  const getCourts = async () => {
    await endpoint
      .get(`/court/list`)
      .then(async (res) => {
        //  console.log("roles", res.data.data)
        setCourtList(res.data.data);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  // const getDivisionList = async () => {
  //   setLoading(true);
  //   await endpoint
  //     .get("/division/list")
  //     .then((res) => {
  //       //  console.log("roles", res.data.data) /division/list
  //       setDivisionList(res.data.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       // console.log(err)
  //     });
  // };

  const getStateList = async () => {
    setLoading(true);
    await endpoint
      .get("/state/list")
      .then((res) => {
        // console.log("state", res.data.data);
        setStateList(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err)
      });
  };

  const onEdit = (row) => {
    setnewDivision({
      ...newDivision,
      court_id: row.id,
      // division_id: row.division_id,
      state_id: row.state_id,
      name: row.name,
    });
    handleShowEditModal();
  };

  const columns = [
    {
      name: "S/N",
      cell: (row, index) => index + 1 + (page - 1) * perPage,
      width: "60px",
    },

    {
      name: "COURT",
      selector: (row) => [row.name],
      sortable: true,
      width: "260px",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.name.toUpperCase()}</h6>
      ),
    },

    {
      name: "STATE",
      selector: (row) => [row.state_id],
      sortable: true,
      width: "200px",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.State.name.toUpperCase()}</h6>
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
              className="btn btn-blue dark:bg-blue-800 bg-blue-900"
              onClick={(e) => {
                onEdit(row);
              }}
              // variant="blue"
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
          onSubmit={handleSubmit(updateCourt)}
          className="row g-3 needs-validation"
        >
          <Modal.Body>
            <div>
              <Card>
                <Card.Header>
                  <Card.Title as="h3">Update Court</Card.Title>
                </Card.Header>

                <Card.Body>
                  <Col lg={12} md={12}>
                    <FormGroup>
                      <label htmlFor="exampleInputname">State</label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          setnewDivision({
                            ...newDivision,
                            state_id: e.target.value,
                          });
                        }}
                        value={newDivision.state_id}
                      >
                        <option value=""> --Select State-- </option>
                        {stateList.map((state) => (
                          <option key={state.id} value={state.id}>
                            {state.state}
                          </option>
                        ))}
                      </select>
                    </FormGroup>
                  </Col>

                  <br />

                  <Col lg={12} md={12}>
                    <FormGroup>
                      <label htmlFor="exampleInputname">Court Name</label>
                      <Form.Control
                        type="text"
                        className="form-control"
                        name="name"
                        value={newDivision.name}
                        onChange={(e) => {
                          setnewDivision({
                            ...newDivision,
                            name: e.target.value,
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
                <Card.Title as="h3">Remove Court</Card.Title>
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
          <Button variant="danger" className="me-1" onClick={deleteCourt}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
