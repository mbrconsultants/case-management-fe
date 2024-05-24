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
import "./CourtRosterList.css";
import "./RosterList.css";

export const RosterList = () => {
  const { user } = useContext(Context);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [idToDelete, setIdToDelete] = useState("");

  const [hearingdate, setHearingdate] = useState({
    hearing_date: "",
    //case_color: "",
  });

  const [newHearingdate, setNewHearingdate] = useState({
    id: "",
    hearing_date: "",
    //case_color: "",
  });

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

  // const Roster = () => {
  // Define the table data
  const tableData = [
    [
      "1",
      "2/12/19",
      "FHC/ABJ/CS/317/2016 \n Hon. Justice Reuben. O. \n Nwajiobi V. NJC & 20rs.",
      "Federal High Court 1, \n Abuja, Col 4",
      "Itoro Ekpo \n Chidinma Onuoha and \n Shehu Abdullahi",
      "C. A. Ajuya, \n (SAN) & CO.",
      "30/01/2020",
    ],
    [
      "2",
      "4/12/19",
      "Charge No. G/35/2018 \n C.O.P.V. Lawrence \n Adebayo Jegede",
      "Chief Magistrate, \n Court Igbosere, \n Lagos",
      "",
      "DPC Attorneys \n Solicitors",
      "",
    ],
    [
      "3",
      "9/12/19",
      "FHC/ABJ/CS/39/2019 \n The Board of \n Incorporated Trustees of \n Malcom Omirhobo \n Foundation V. NJC & \n 5 Ors.",
      "Federal High Court \n 9, Abuja",
      "Anthony Chukwu, \n Mercedes and \n Ahmed Fili",
      "S. H. Garun \n Gabbas SAN \n & CO",
      "",
    ],
  ];
  // };

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
            <div>
              <table border="1" className="table-responsive">
                <colgroup>
                  <col style={{ width: "150px" }} />
                  <col style={{ width: "200px" }} />
                  <col style={{ width: "500px" }} />
                  <col style={{ width: "250px" }} />
                  <col style={{ width: "300px" }} />
                  <col style={{ width: "300px" }} />
                  <col style={{ width: "150px" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>S/N</th>
                    <th>DATE</th>
                    <th className="w-15s">CASE</th>
                    <th>COURT</th>
                    <th>COUNSEL</th>
                    <th>EXTERNAL SOLICITOR</th>
                    <th>NEXT ADJOURNED DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      <td>{rowIndex + 1}</td>
                      <td>{rowIndex}</td>
                      <td>
                        {row.suite_no}
                        <br /> {row.parties}
                      </td>
                      <td>{row.Court ? row.Court.name : ""}</td>
                      <td>
                        {row.LegalOfficer ? row.LegalOfficer.surname : ""}
                      </td>
                      {/* {row.legalOfficer &&
                        row.legalOfficer.map((law, index) => (
                          <td>{law.surname}</td>
                        ))} */}
                      <td>{rowIndex}</td>
                      <td>{rowIndex}</td>
                      ))
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/*  */}
          </Card>
        </div>
      )}
    </>
  );
};
