
import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import endpoint from "../../../context/endpoint";
import * as profiledata from "../../../data/Pages/profiledata/profiledata";
import * as userData from "../../../data/Users/ProfileData";
import { Tabs, Tab, Breadcrumb, Card, Row, Col, Table } from "react-bootstrap";

export default function UserProfile() {
  return (
    <>
      <div>
        <div className="page-header">
          <div>
            <h1 className="page-title">Profile</h1>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item className="breadcrumb-item" href="#">
                Pages
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item active breadcrumds"
                aria-current="page"
              >
                Profile
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div className="ms-auto pageheader-btn">
            <Link to={`${process.env.PUBLIC_URL}/staff-file`} className="btn btn-primary btn-icon text-white me-3">
              <span>
                <i className="fe fe-eye"></i>&nbsp;
              </span>
              Access another Profile
            </Link>
          </div>
        </div>
        <Row id="user-profile">
          <Col lg={12}>
            <Card className=" bg-transparent shadow-none border-0">
              <Card.Body className=" bg-white">
                <userData.ProfileHeader />
              </Card.Body>
              <div className="border-top ">
                <div className="wideget-user-tab">
                  <div className="tab-menu-heading">
                    <div className="tabs-menu1 profiletabs">
                      <Tabs
                        variant="Tabs"
                        defaultActiveKey="Profile"
                        id=" tab-51"
                        className="tab-content tabesbody "
                      >
                        <Tab eventKey="Profile" title="Profile">
                          <div className="tab-pane profiletab show">
                            <div id="profile-log-switch">
                              <Card>
                                <Card.Body className="bg-white">
                                  <div className="media-heading">
                                    <h5>
                                      <strong>Personal Information</strong>
                                    </h5>
                                  </div>

                                  <div className="table-responsive">
                                    <userData.PersonalData />
                                  </div>

                                </Card.Body>
                              </Card>
                            </div>
                          </div>
                        </Tab>

                        <Tab eventKey="Files" title="Files">
                          <div className="tab-pane" id="tab-81">
                            {/* <Row className="profiletab">
                            <Col lg={12}>
                              <Card className="border p-0 over-flow-hidden">
                                <Card.Body className="media media-xs overflow-visible ">
                                  <userData.PersonalFileData/>
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row> */}

                            <Row className="">
                              <Col lg={12}>
                                <Card className="">
                                  <Card.Body className="">
                                    <userData.PersonalFileData />
                                  </Card.Body>
                                </Card>
                              </Col>
                            </Row>

                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>

            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
