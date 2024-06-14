import React from "react";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { Breadcrumb, Col, Row, Card } from "react-bootstrap";
import PartiesData from "../../../data/Users/PartiesData";
import { Link, useNavigate } from "react-router-dom";
// import { useAuthDispatch, logout, useAuthState } from '../../context'

export default function Parties() {
  return (
    <div>
      <div className="page-header ">
        <div>
          <h1 className="page-title">Appellant and Respondent Setup</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Add Appellant and Respondent
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="">
        <PartiesData />
      </div>
    </div>
  );
}
