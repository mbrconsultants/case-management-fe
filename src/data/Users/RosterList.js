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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
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
  const [headerText, setHeaderText] = useState("");
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
    retrieveHeaderText();
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

    // Extract month and year from the input date
    const date = new Date(hearingdate.hearing_date);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const newHeaderText = `COURT ROSTER FOR THE MONTH OF ${month.toUpperCase()}, ${year}`;
    setHeaderText(newHeaderText);

    // Save header text to local storage
    localStorage.setItem("headerText", newHeaderText);

    await endpoint
      .post(`/case/list-by-hearing-date`, hearingdate)
      .then((res) => {
        console.log(res);
        setHearingdate({ ...hearingdate, hearing_date: " " });
        setData(res.data.data);
        // getAllData();
        SuccessAlert(res.data.message);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        ErrorAlert(err.response.data.message);
        console.log(err);
      });
  };

  const retrieveHeaderText = () => {
    const savedHeaderText = localStorage.getItem("headerText");
    if (savedHeaderText) {
      setHeaderText(savedHeaderText);
    }
  };

  const printTable = () => {
    const input = document.getElementById("table-to-print");
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("table.pdf");
      })
      .catch((error) => {
        console.error("Could not generate PDF", error);
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
                            type="date"
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
        <Card id="divToPrint">
          <div>
            <Button
              onClick={window.print}
              style={{ marginBottom: "20px" }}
              id="hideBtn"
            >
              Print
            </Button>
            <div id="table-to-print">
              {headerText && (
                <h2 className="rostertable-header">{headerText}</h2>
              )}
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
                      <td>{row.hearing_date ? row.hearing_date : ""}</td>
                      <td>
                        {row.suite_no}
                        <br /> {row.parties}
                      </td>
                      <td>{row.Court ? row.Court.name : ""}</td>
                      <td>
                        {row.LegalOfficer ? row.LegalOfficer.surname : ""}
                      </td>
                      <td>
                        {row.externalSolicitor
                          ? row.externalSolicitor
                          : "Not Assigned"}
                      </td>
                      <td>{row.nextAdjournedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};
