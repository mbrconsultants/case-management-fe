import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { Card, Row, Col, Modal, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
import moment from "moment";
import { ErrorAlert, SuccessAlert } from "../Toast/toast";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Loader from "../Loader/loader";
import { log } from "nvd3";

export const FileList = () => {
  const { user } = useContext(Context);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [openAddDocumentModal, setDocumentModal] = useState(false);

  const [file, setFile] = useState({
    name: "",
    description: "",
  });

  const [newFile, setNewFile] = useState({
    id: "",
    name: "",
    description: "",
  });

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [idToDelete, setIdToDelete] = useState("");

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    await endpoint
      .get(`/file-type/list`)
      .then((res) => {
        // console.log("all files", res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
  };

  const handleSubmit = async (e) => {
    // console.log("files", file);
    e.preventDefault();
    await endpoint
      .post(`/file-type/create`, file)
      .then((res) => {
        // console.log(res);
        setFile({ ...file, name: " ", description: " " });
        getAllData();
        SuccessAlert(res.data.message);
        setDocumentModal(false);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        ErrorAlert(err.response.data.message);
        // console.log(err);
      });
  };

  const onEdit = (row) => {
    // console.log("file to edit", file.id)
    setNewFile({
      ...newFile,
      id: row.id,
      name: row.name,
      description: row.description,
    });
    setOpen(true);
    // console.log("file to update", newFile)
  };

  const handleAddProcessDocumentModal = () => {
    setDocumentModal(true);
  };

  const handleEdit = async () => {
    // console.log("role id to update", newFile.file_id)
    setLoading(true);
    // console.log("my updating data", newFile)
    await endpoint
      .put(`/file-type/edit/${newFile.file_id}`, newFile)
      .then((res) => {
        // console.log(res.data);
        getAllData();
        setLoading(false);
        setOpen(false);
        SuccessAlert(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        ErrorAlert(err.response.data.message);
        // console.log(err)
      });
  };

  const onDelete = (row) => {
    // console.log("role to delete", file.id)
    setOpen(false);
    setIdToDelete(row.id);
    setDeleteOpen(true);
  };

  const handleDelete = async (e) => {
    // console.log("file2 to delete", idToDelete)
    e.preventDefault();
    await endpoint
      .delete(`/file-type/delete/${idToDelete}`)
      .then((res) => {
        // console.log(res.data)
        SuccessAlert(res.data.message);
        getAllData();
        setLoading(false);
        setDeleteOpen(false);
      })
      .catch((err) => {
        ErrorAlert(err.response.data.message);
        // console.log(err)
      });
  };

  const reset = () => {
    // setFile("");
    setId("");
  };

  const onClose = () => {
    reset();
    setDocumentModal(false);
    setDeleteOpen(false);
    setOpen(false);
  };

  const columns = [
    {
      name: "#",

      cell: (row, index) => index + 1 + (page - 1) * perPage,
      width: "10%",
    },

    {
      name: "Name",
      selector: (row) => [row.name],
      sortable: true,
      width: "30%",
      cell: (row) => <h6 className="fs-12 fw-semibold">{row.name}</h6>,
    },
    {
      name: "Description",
      selector: (row) => [row.description],
      sortable: true,
      width: "45%",
      cell: (row) => <h6 className="fs-12 fw-semibold">{row.description}</h6>,
    },
    {
      name: "Status",
      selector: (row) => [row.status],
      sortable: true,
      // width: "25%",
      cell: (row) => <>{row.status}</>,
    },
    {
      name: "Action",
      cell: (row) => (
        <Row>
          {" "}
          <Col xs={4} style={{ paddingRight: "0px", paddingLeft: "0px" }}>
            <button
              className="btn btn-sm btn-blue"
              onClick={(e) => {
                onEdit(row);
              }}
              // variant="secondary"
              title="Action"
              size="sm"
            >
              Edit
            </button>
          </Col>
          <Col xs={4}>
            <button
              className="btn btn-sm btn-danger"
              onClick={(e) => {
                onDelete(row);
              }}
              variant="danger"
              title="Action"
              size="sm"
            >
              Delete
            </button>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <>
      {load ? (
        <Loader />
      ) : (
        <div>
          <div id="page-wrapper" className="box box-default">
            <Button
              className={
                isLoading
                  ? "btn btn-success pull-right btn-loading"
                  : "btn btn-success pull-right"
              }
              disabled={isLoading}
              onClick={handleAddProcessDocumentModal}
            >
              Add Process Document
            </Button>
            {/* <div className="container-fluid">
              <div className="col-md-12 text-success"></div>
              <br />
              <hr />
              <Row className="row">
                <Col xs={2} md={2}></Col>
                <Col xs={8} md={8}>
                  {" "}
                  <br />
                  <Card>
                    <Card.Body>
                      <div className="form-horizontal">
                        <div className="form-group">
                          <label className="col-md-6  cecontrol-label">
                            Document type
                          </label>
                          <div className="col-md-12">
                            <input
                              type="text"
                              className="form-control"
                              value={file.name}
                              onChange={(e) => {
                                setFile({ ...file, name: e.target.value });
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label className="col-md-6  cecontrol-label">
                            Description
                          </label>
                          <div className="col-md-12">
                            <input
                              type="text"
                              className="form-control"
                              value={file.description}
                              onChange={(e) => {
                                setFile({
                                  ...file,
                                  description: e.target.value,
                                });
                              }}
                              required
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="col-sm-offset-2 text-center col-sm-9">
                            <button
                              className={
                                isLoading
                                  ? "btn btn-success pull-right btn-loading"
                                  : "btn btn-success pull-right"
                              }
                              disabled={isLoading}
                              onClick={handleSubmit}
                            >
                              Add File
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={3} md={4}></Col>
              </Row>
            </div> */}
          </div>
          <Card>
            <Card.Body>
              <h3 className="text-center">Process Document Types</h3>
              <Row className="row">
                <Col md={12} className="col-md-12">
                  <DataTable
                    //  fixedHeader
                    columns={columns}
                    // selectableRows
                    data={data}
                    // customStyles={customStyles}
                    // persistTableHead
                    defaultSortField="id"
                    defaultSortAsc={false}
                    striped={true}
                    center={true}
                    pagination
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handlePerRowsChange}
                    paginationRowsPerPageOptions={[10, 15, 20, 25, 30, 50, 100]}
                    paginationPerPage={perPage}
                    highlightOnHover
                  />

                  <Modal show={openAddDocumentModal}>
                    <Modal.Body className="text-center p-4">
                      <DialogTitle>
                        Add Process Document
                        <Button
                          onClick={onClose}
                          className="btn-close"
                          variant=""
                          disabled={isLoading}
                        >
                          x
                        </Button>
                      </DialogTitle>
                      <DialogContent>
                        <Row className="row">
                          <Col>
                            {" "}
                            <br />
                            <Card>
                              <Card.Body>
                                <form className="form-horizontal">
                                  <div className="form-horizontal">
                                    <div className="form-group">
                                      <label className="col-md-6  cecontrol-label">
                                        Document type
                                      </label>
                                      <div className="col-md-12">
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={file.name}
                                          onChange={(e) => {
                                            setFile({
                                              ...file,
                                              name: e.target.value,
                                            });
                                          }}
                                          required
                                        />
                                      </div>
                                    </div>

                                    <div className="form-group">
                                      <label className="col-md-6  cecontrol-label">
                                        Description
                                      </label>
                                      <div className="col-md-12">
                                        <input
                                          type="text"
                                          className="form-control"
                                          value={file.description}
                                          onChange={(e) => {
                                            setFile({
                                              ...file,
                                              description: e.target.value,
                                            });
                                          }}
                                          required
                                        />
                                      </div>
                                    </div>

                                    {/* <div className="form-group">
                                      <div className="col-sm-offset-2 text-center col-sm-9">
                                        <button
                                          className={
                                            isLoading
                                              ? "btn btn-success pull-right btn-loading"
                                              : "btn btn-success pull-right"
                                          }
                                          disabled={isLoading}
                                          onClick={handleSubmit}
                                        >
                                          Add File
                                        </button>
                                      </div>
                                    </div> */}
                                  </div>
                                </form>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Row>
                            <Col
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                marginLeft: "60px",
                              }}
                            >
                              <Button
                                onClick={onClose}
                                disabled={isLoading}
                                variant="dark"
                                className="me-1"
                              >
                                Cancel
                              </Button>
                            </Col>
                            <Col
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                marginLeft: "60px",
                              }}
                            >
                              <Button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                // variant="success"
                                className={
                                  isLoading ? "me-1  btn-loading" : "me-1"
                                }
                              >
                                {" "}
                                {isLoading ? "Add File" : "Add File"}
                              </Button>
                            </Col>
                          </Row>
                        </Row>
                      </DialogContent>
                      <DialogActions></DialogActions>
                      {/* </Dialog> */}
                    </Modal.Body>
                  </Modal>

                  <Modal show={open}>
                    <Modal.Body className="text-center p-4">
                      <DialogTitle>
                        Edit
                        <Button
                          onClick={onClose}
                          className="btn-close"
                          variant=""
                          disabled={isLoading}
                        >
                          x
                        </Button>
                      </DialogTitle>
                      <DialogContent>
                        <Row className="row">
                          <Col>
                            {" "}
                            <br />
                            <Card>
                              <Card.Body>
                                <form className="form-horizontal">
                                  <div className="form-group">
                                    <label className="col-md-6  cecontrol-label">
                                      File Name
                                    </label>
                                    <div className="col-md-12">
                                      <input
                                        id="name"
                                        type="text"
                                        className="form-control"
                                        defaultValue={newFile.name}
                                        onChange={(e) =>
                                          setNewFile({
                                            ...newFile,
                                            name: e.target.value,
                                          })
                                        }
                                        required
                                      />
                                    </div>
                                  </div>

                                  <div className="form-group">
                                    <label className="col-md-6  cecontrol-label">
                                      File Description
                                    </label>
                                    <div className="col-md-12">
                                      <input
                                        id="description"
                                        type="text"
                                        className="form-control"
                                        defaultValue={newFile.description}
                                        onChange={(e) =>
                                          setNewFile({
                                            ...newFile,
                                            description: e.target.value,
                                          })
                                        }
                                        required
                                      />
                                    </div>
                                  </div>
                                </form>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Row>
                            <Col
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                marginLeft: "60px",
                              }}
                            >
                              <Button
                                onClick={onClose}
                                disabled={isLoading}
                                variant="dark"
                                className="me-1"
                              >
                                Cancel
                              </Button>
                            </Col>
                            <Col
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                marginLeft: "60px",
                              }}
                            >
                              <Button
                                onClick={handleEdit}
                                disabled={isLoading}
                                variant="success"
                                className={
                                  isLoading ? "me-1  btn-loading" : "me-1"
                                }
                              >
                                {" "}
                                {isLoading ? "Save" : "Save"}
                              </Button>
                            </Col>
                          </Row>
                        </Row>
                      </DialogContent>
                      <DialogActions></DialogActions>
                      {/* </Dialog> */}
                    </Modal.Body>
                  </Modal>

                  <Modal show={deleteOpen}>
                    <Modal.Body className="text-center p-4">
                      <DialogTitle>
                        Delete File
                        <Button
                          onClick={onClose}
                          className="btn-close"
                          variant=""
                        >
                          x
                        </Button>
                      </DialogTitle>
                      <DialogContent>
                        <div>
                          <div className="modal-body">
                            <p>
                              Do you really want to delete{" "}
                              <span className="fw-bold"></span> file? <br />{" "}
                              This process cannot be undone.
                            </p>
                          </div>

                          <Row>
                            <Col xs={5} md={5} align="right">
                              <Button
                                type="button"
                                variant="dark"
                                onClick={onClose}
                              >
                                Cancel
                              </Button>
                            </Col>
                            <Col xs={1} md={1}></Col>
                            <Col xs={5} md={5} align="left">
                              <Button
                                onClick={handleDelete}
                                // className="btn btn-sm btn-danger"
                                variant="danger"
                              >
                                Yes, Delete{" "}
                              </Button>
                            </Col>
                          </Row>
                        </div>
                      </DialogContent>
                    </Modal.Body>
                  </Modal>
                </Col>
              </Row>
              {/* <!-- /.col -->  */}
            </Card.Body>
          </Card>
        </div>
      )}
    </>
  );
};
