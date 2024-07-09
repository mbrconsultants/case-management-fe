
import React, {useEffect, useState} from "react";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { Breadcrumb, Col, Row, Card, Button } from "react-bootstrap";
 import * as AllUsers from "../../../data/Users/AllUsers";
import { Link,useNavigate } from "react-router-dom";
import * as Search from "../../../data/Search/SearchStaff"
import endpoint from "../../../context/endpoint";
import { useForm } from 'react-hook-form';
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";


export default function AllUser() {
 
  return (
    <div>
      <div className="page-header ">
        <div>
          <h1 className="page-title">Users </h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
               Users List
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
       
      </div>
     
      {/* <Search.SearchStaff handleSearch={handleSearch} data={data}/> */}
      
      <Row>
        <Col sm={12} className="col-12">
          <Card>
            <Card.Header>
            <div className="d-flex align-items-center w-100">
                <div className="card-title text-center mb-0 flex-grow-1">
                USERS LIST
                </div>
                <Link
                  className="btn btn-primary ml-auto"
                  to={"/new-user"}>
                  New User
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              <div className="">
                <div className="">
                    <AllUsers.AllUsers/>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}