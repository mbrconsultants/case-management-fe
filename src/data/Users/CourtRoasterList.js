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
import "./CourtRoasterList.css";

export const CourtRoasterList = () => {
  const { user } = useContext(Context);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [hearingdate, setHearingdate] = useState({
    hearing_date: "",
    //case_color: "",
  });

  const [newHearingdate, setNewHearingdate] = useState({
    id: "",
    hearing_date: "",
    //case_color: "",
  });

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [idToDelete, setIdToDelete] = useState("");

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    await endpoint
      .post(`/case/list-by-hearing-date`)
      .then((res) => {
        console.log("all case list by hearing date", res.data.data);
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
    console.log("hearingdate", hearingdate);
    e.preventDefault();
    await endpoint
      .post(`/case/list-by-hearing-date`, hearingdate)
      .then((res) => {
        console.log(res);
        setHearingdate({ ...hearingdate, hearing_date: " " });
        getAllData();
        SuccessAlert(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        ErrorAlert(err.response.data.message);
        console.log(err);
      });
  };

  // const onEdit = (row) => {
  //   // console.log("hearingdate to edit", hearingdate.id)
  //   setNewHearingdate({
  //     ...newHearingdate,
  //     id: row.id,
  //     hearing_date: row.hearing_date,
  //     //case_color: row.case_color,
  //   });
  //   setOpen(true);
  //   // console.log("hearingdate to update", newHearingdate)
  // };

  // const handleEdit = async () => {
  //   // console.log("hearingdate id to update", newHearingdate.Hearingdate_id)
  //   setLoading(true);
  //   // console.log("my updating data", newHearingdate)
  //   await endpoint
  //     .put(`/case/edit/${newHearingdate.hearingdate_id}`, newHearingdate)
  //     .then((res) => {
  //       // console.log(res.data);
  //       getAllData();
  //       setLoading(false);
  //       setOpen(false);
  //       SuccessAlert(res.data.message);
  //     })
  //     .catch((err) => {
  //       setLoading(false);
  //       ErrorAlert(err.response.data.message);
  //       // console.log(err)
  //     });
  // };

  // const onDelete = (row) => {
  //   // console.log("hearingdate to delete", hearingdate.id)
  //   setOpen(false);
  //   setIdToDelete(row.id);
  //   setDeleteOpen(true);
  // };

  // const handleDelete = async (e) => {
  //   // console.log("hearingdate2 to delete", idToDelete)
  //   e.preventDefault();
  //   await endpoint
  //     .delete(`/case-type/delete/${idToDelete}`)
  //     .then((res) => {
  //       // console.log(res.data)
  //       SuccessAlert(res.data.message);
  //       getAllData();
  //       setLoading(false);
  //       setDeleteOpen(false);
  //     })
  //     .catch((err) => {
  //       ErrorAlert(err.response.data.message);
  //       // console.log(err)
  //     });
  // };

  const reset = () => {
    // setHearingdate("");
    setId("");
  };

  const onClose = () => {
    reset();
    setOpen(false);
    setDeleteOpen(false);
  };

  const columns = [
    {
      name: "#",

      cell: (row, index) => index + 1 + (page - 1) * perPage,
      width: "4%",
    },
    {
      name: "Suite No",
      selector: (row) => [row.suite_no],
      sortable: true,
      width: "12%",
      cell: (row) => <h6 className="fs-12 fw-semibold">{row.suite_no}</h6>,
    },
    {
      name: "Court",
      selector: (row) => [row.court_id],
      sortable: true,
      width: "9%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.Court ? row.Court.name : ""}</h6>
      ),
    },
    {
      name: "Legal Officer",
      selector: (row) => [row.LegalOfficer],
      sortable: true,
      width: "13%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">
          {row.LegalOfficer
            ? row.LegalOfficer.surname + " " + row.LegalOfficer.first_name
            : ""}
        </h6>
      ),
    },
    {
      name: "Chamber Solicitor",
      selector: (row) => [row.chamber_solicitor_id],
      sortable: true,
      width: "15%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">
          {row.ChamberOrSolicitor ? row.ChamberOrSolicitor.chamber_name : ""}
        </h6>
      ),
    },
    {
      name: "Case Type",
      selector: (row) => [row.case_type_id],
      sortable: true,
      width: "10%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">
          {row.CaseType ? row.CaseType.case_type : ""}
        </h6>
      ),
    },
    {
      name: "Parties",
      selector: (row) => [row.parties],
      sortable: true,
      width: "13%",
      cell: (row) => <h6 className="fs-12 fw-semibold">{row.parties}</h6>,
    },
    {
      name: "Appellants",
      selector: (row) => [row.appellants],
      sortable: true,
      width: "12%",
      cell: (row) => <h6 className="fs-12 fw-semibold">{row.appellants}</h6>,
    },
    {
      name: "Respondent",
      selector: (row) => [row.respondent],
      sortable: true,
      width: "10%",
      cell: (row) => <h6 className="fs-12 fw-semibold">{row.respondent}</h6>,
    },
    {
      name: "Case Description",
      selector: (row) => [row.case_description],
      sortable: true,
      width: "15%",
      cell: (row) => (
        <h6 className="fs-12 fw-semibold">{row.case_description}</h6>
      ),
    },
    {
      name: "Case Attachment",
      selector: (row) => row.CaseAttachments,
      sortable: true,
      width: "13%",
      cell: (row) => (
        <div className="fs-12 fw-semibold">
          {Array.isArray(row.CaseAttachments) && row.CaseAttachments.length > 0
            ? row.CaseAttachments.map((attachment, index) => (
                <a
                  key={index}
                  href={process.env.REACT_APP_UPLOAD_URL + attachment.doc_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="attachment-badge"
                >
                  {row.CaseAttachments.length === 1
                    ? "Attachment"
                    : `Attachment ${index + 1}`}
                </a>
              ))
            : row.CaseAttachments &&
              row.CaseAttachments.doc_url && (
                <a
                  href={row.CaseAttachments.doc_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="attachment-badge"
                >
                  Attachment
                </a>
              )}
        </div>
      ),
    },
    // {
    //   name: "Status",
    //   selector: (row) => [row.status],
    //   sortable: true,
    //   // width: "25%",
    //   cell: (row) => <>{row.status}</>,
    // },
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <Row>
    //       {" "}
    //       <Col xs={4} style={{ paddingRight: "0px", paddingLeft: "0px" }}>
    //         <button
    //           className="btn btn-sm btn-secondary"
    //           onClick={(e) => {
    //             onEdit(row);
    //           }}
    //           variant="secondary"
    //           title="Action"
    //           size="sm"
    //         >
    //           Edit
    //         </button>
    //       </Col>
    //       <Col xs={4}>
    //         <button
    //           className="btn btn-sm btn-danger"
    //           onClick={(e) => {
    //             onDelete(row);
    //           }}
    //           variant="danger"
    //           title="Action"
    //           size="sm"
    //         >
    //           Delete
    //         </button>
    //       </Col>
    //     </Row>
    //   ),
    // },
  ];

  return (
    <>
      {load ? (
        <Loader />
      ) : (
        <div>
          <div id="page-wrapper" className="box box-default">
            <div className="container-fluid">
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
                            Hearing Date
                          </label>
                          <div className="col-md-12">
                            <input
                              type="text"
                              className="form-control"
                              value={hearingdate.hearing_date}
                              onChange={(e) => {
                                setHearingdate({
                                  ...hearingdate,
                                  hearing_date: e.target.value,
                                });
                              }}
                              required
                            />
                          </div>
                        </div>

                        {/* <div className="form-group">
                          <label className="col-md-6  cecontrol-label">
                            Case Colour
                          </label>
                          <div className="col-md-12">
                            <input
                              type="text"
                              className="form-control"
                              value={casex.case_color}
                              onChange={(e) => {
                                setCasex({
                                  ...casex,
                                  case_color: e.target.value,
                                });
                              }}
                              required
                            />
                          </div>
                        </div> */}

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
                              Get All Cases
                            </button>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col xs={3} md={4}></Col>
              </Row>
            </div>
          </div>
          <Card>
            <Card.Body>
              <h3 className="text-center">COURT ROASTER</h3>
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
                  {/* <Modal show={open}>
                    <Modal.Body className="text-center p-4">
                      <DialogTitle>
                        Edit Module
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
                                      Case Type
                                    </label>
                                    <div className="col-md-12">
                                      <input
                                        id="case_type"
                                        type="text"
                                        className="form-control"
                                        defaultValue={newCasex.case_type}
                                        onChange={(e) =>
                                          setNewCasex({
                                            ...newCasex,
                                            case_type: e.target.value,
                                          })
                                        }
                                        required
                                      />
                                    </div>
                                  </div>

                                  <div className="form-group">
                                    <label className="col-md-6  cecontrol-label">
                                      Case Colour
                                    </label>
                                    <div className="col-md-12">
                                      <input
                                        id="case_color"
                                        type="text"
                                        className="form-control"
                                        defaultValue={newCasex.case_color}
                                        onChange={(e) =>
                                          setNewCasex({
                                            ...newCasex,
                                            case_color: e.target.value,
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
                                variant="danger"
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
                      {/* </Dialog> 
                    </Modal.Body>
                  </Modal>*/}
                  {/* <Modal show={deleteOpen}>
                    <Modal.Body className="text-center p-4">
                      <DialogTitle>
                        Delete Case Type
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
                              <span className="fw-bold"></span> case type?{" "}
                              <br /> This process cannot be undone.
                            </p>
                          </div>

                          <Row>
                            <Col xs={5} md={5} align="right">
                              <button
                                type="button"
                                className="btn btn-sm btn-secondary"
                                onClick={onClose}
                              >
                                Cancel
                              </button>
                            </Col>
                            <Col xs={1} md={1}></Col>
                            <Col xs={5} md={5} align="left">
                              <button
                                onClick={handleDelete}
                                className="btn btn-sm btn-danger"
                              >
                                Yes, Delete{" "}
                              </button>
                            </Col>
                          </Row>
                        </div>
                      </DialogContent>
                    </Modal.Body>
                  </Modal>*/}
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
