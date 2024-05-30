import React, { useState, useContext, useEffect } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
import { ErrorAlert, SuccessAlert } from "../Toast/toast";

import "./CourtRosterList.css";
import "./RosterList.css";

export const RosterList = () => {
  const { user } = useContext(Context);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [headerText, setHeaderText] = useState("");
  const [hearingdate, setHearingdate] = useState({ hearing_date: "" });

  useEffect(() => {
    getAllData();
    retrieveHeaderText();
  }, []);

  const getAllData = async () => {
    try {
      const res = await endpoint.post(`/case/list-by-hearing-date`);
      setData(res.data.data);
      setHeaderText(`COURT ROSTER FOR THE MONTH OF ${monthName} ${year}`);
    } catch (err) {
      console.error(err);
    }
  };
  const currentDate = new Date();
  const monthName = currentDate
    .toLocaleString("default", { month: "long" })
    .toUpperCase();
  const year = currentDate.getFullYear();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const date = new Date(hearingdate.hearing_date);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    setHeaderText(
      `COURT ROSTER FOR THE MONTH OF ${month.toUpperCase()}, ${year}`
    );

    try {
      const res = await endpoint.post(
        `/case/list-by-hearing-date`,
        hearingdate
      );
      setData(res.data.data);
      SuccessAlert(res.data.message);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      ErrorAlert(err.response.data.message);
      console.error(err);
    }
  };

  const retrieveHeaderText = () => {
    const savedHeaderText = localStorage.getItem("headerText");
    if (savedHeaderText) {
      setHeaderText(savedHeaderText);
    }
  };

  return (
    <div>
      <div className="box box-default">
        <div className="container-fluid">
          <div className="col-md-12 text-success"></div>
          <br />
          <hr />
          <Row className="row">
            <Col
              xs={2}
              md={2}></Col>
            <Col
              xs={8}
              md={8}>
              <br />
              <Card>
                <Card.Body>
                  <div className="form-horizontal">
                    <div className="form-group">
                      <label className="col-md-6 cecontrol-label">
                        Hearing Date
                      </label>
                      <div className="col-md-12">
                        <input
                          type="date"
                          className="form-control"
                          value={hearingdate.hearing_date}
                          onChange={(e) =>
                            setHearingdate({
                              ...hearingdate,
                              hearing_date: e.target.value,
                            })
                          }
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
                          onClick={handleSubmit}>
                          Get All Cases
                        </button>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col
              xs={3}
              md={4}></Col>
          </Row>
        </div>
        {data.length > 0 ? (
          <Card id="divToPrint">
            <div>
              <Button
                onClick={window.print}
                style={{ marginBottom: "20px" }}
                id="hideBtn">
                Print
              </Button>
              <div id="table-to-print">
                <h2 className="rostertable-header">{headerText}</h2>
                <table
                  border="1"
                  className="table-responsive">
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
        ) : (
          <div className="text-center"> No Record</div>
        )}
      </div>
    </div>
  );
};
