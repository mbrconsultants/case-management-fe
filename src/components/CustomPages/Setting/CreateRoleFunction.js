import React from "react";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { Breadcrumb, Col, Row, Card } from "react-bootstrap";

 import * as rolefunction from "../../../data/setting/createRoleFunction";
import { Link,useNavigate } from "react-router-dom";
// import { useAuthDispatch, logout, useAuthState } from '../../context'


export default function CreateRoleFunction() {
 
  return (
    <div>
      <div className="page-header ">
        <div>
          <h1 className="page-title">Role function</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Create Role function
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
       
      </div>
     
      
      <Row>
        <Col sm={12} className="col-12">
          <Card>
            <Card.Header>
              <h3 className="card-title mb-0">Role function</h3>
            </Card.Header>
            <Card.Body>
              <div className="">
                <div className="">
                <rolefunction.CreateRoleFunction/>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}