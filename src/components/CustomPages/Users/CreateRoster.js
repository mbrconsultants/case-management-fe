import React from "react";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { Breadcrumb, Col, Row, Card, Container } from "react-bootstrap";
import CreateRosterData from "../../../data/Users/CreateRosterData";
import { Link, useNavigate } from "react-router-dom";
// import { useAuthDispatch, logout, useAuthState } from '../../context'

export default function CreateRoster() {
  return (
    <div>
      <div className="page-header ">
        <div>
          <h1 className="page-title">Court Roster Setup</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Create Roster
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Container className="h-100vh">
        <CreateRosterData />
      </Container>
    </div>
  );
}
