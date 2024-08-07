import React from "react";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { Breadcrumb, Col, Row, Card } from "react-bootstrap";

//import * as casex from "../../../data/Users/CaseList";
import * as hearingdate from "../../../data/Users/CourtRosterList";

import { Link, useNavigate } from "react-router-dom";
// import { useAuthDispatch, logout, useAuthState } from '../../context'

export default function TestRoster() {
  return (
    <div>
      <div className="page-header ">
        <div>
          <h1 className="page-title">COURT ROSTER TABLE</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Enter Hearing Date
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <Row>
        <Col sm={12} className="col-12">
          <Card>
            <Card.Header>
              <h3 className="card-title mb-0">Test Roster</h3>
            </Card.Header>
            <Card.Body>
              <div className="">
                <div className="">
                  <hearingdate.CourtRosterList />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
