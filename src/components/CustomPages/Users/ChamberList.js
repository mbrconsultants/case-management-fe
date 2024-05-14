import React from "react";
import { Breadcrumb, Col, Row, Card, Button } from "react-bootstrap";
import ChamberList from "../../../data/Users/ChamberList";
import { Link } from "react-router-dom";

export default function Stafflist() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Chambers</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item
              className="breadcrumb-item"
              href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active"
              aria-current="page">
              Chambers List
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>

      <Row>
        <Col
          sm={12}
          className="col-12">
          <Card>
            <Card.Header>
              <div className="d-flex align-items-center w-100">
                <div className="card-title text-center mb-0 flex-grow-1">
                  CHAMBERS LIST
                </div>
                <Link
                  className="btn btn-primary ml-auto"
                  to={"/new-chamber"}>
                  New Chamber
                </Link>
              </div>
            </Card.Header>
            <Card.Body>
              <div>
                <ChamberList />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
