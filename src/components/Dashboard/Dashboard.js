import React, { useState, useContext, useEffect } from "react";
import CountUp from "react-countup";
import ReactApexChart from "react-apexcharts";
import { Breadcrumb, Col, Row, Card, Button } from "react-bootstrap";
import * as dashboard from "../../data/dashboard/dashboard";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../context/Context.js";
import endpoint from "../../context/endpoint";
import { Modal, FormGroup, Form } from "react-bootstrap";
// import { useAuthDispatch, logout, useAuthState } from '../../context'

export default function Dashboard() {
  const { user } = useContext(Context);
  // console.log(user)
  const [totalCases, setTotalCases] = useState([]);
  const [closedCases, setClosedCases] = useState([]);
  const [notificationModal, setNotificationModal] = useState(false);
  const [externalSolicitors, setExternalSolicitors] = useState([]);
  const [councilLegalOfficers, setCouncilLegalOfficers] = useState([]);

  useEffect(() => {
    getTotalCases();
    //getTotalOpenCases();
    getTotalClosedCases();
    // setNotificationModal(true);
    getCouncilLegalOfficers();
    getExternalSolicitors();
  }, []);

  const getTotalCases = async () => {
    await endpoint
      .get(`/case/total-cases`)
      .then((res) => {
        // console.log("total cases", res.data.data.count);
        setTotalCases(res.data.data.count);
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  // const getTotalOpenCases = async () => {
  //   await endpoint
  //     .get(`/case/total-open-cases`)
  //     .then((res) => {
  //       // console.log("total open cases", res.data);
  //       setOpenCases(res.data);
  //     })
  //     .catch((err) => {
  //       // console.log(err)
  //     });
  // };

  const getTotalClosedCases = async () => {
    await endpoint
      .get(`/case/total-closed-cases`)
      .then((res) => {
        // console.log("total closed cases", res.data.data);
        setClosedCases(res.data.data);
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  const getCouncilLegalOfficers = async () => {
    await endpoint
      .get(`/legal-officer/count-all`)
      .then((res) => {
        // console.log("council / legal officers", res.data.data.count);
        setCouncilLegalOfficers(res.data.data.count);
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  const getExternalSolicitors = async () => {
    await endpoint
      .get(`/solicitor/count-all`)
      .then((res) => {
        console.log("external solicitors", res.data.data);
        setExternalSolicitors(res.data.data);
      })
      .catch((err) => {
        // console.log(err)
      });
  };

  return (
    <div>
      <div className="page-header ">
        <div>
          <h1 className="page-title">Dashboard </h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Home
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Dashboard
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="ms-auto pageheader-btn">
          {/* <Link to="#" className="btn btn-primary btn-icon text-white me-3">
            <span>
              <i className="fe fe-plus"></i>&nbsp;
            </span>
            Add Account
          </Link> */}
          {/* <Link to="#" className="btn btn-success btn-icon text-white">
            <span>
              <i className="fe fe-log-in"></i>&nbsp;
            </span>
            Export
          </Link> */}
        </div>
      </div>
      <Row>
        <Col lg={12} md={12} sm={12} xl={12}>
          <h4
            className="text-center text-primary"
            style={{
              fontWeight: "bold",
              fontFamily: "comic sans serif",
              fontSize: "25px",
              // color: "#05A850",
            }}
          >
            CASE MANAGEMENT SYSTEM
          </h4>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12} xl={12}>
          <h5 className="">
            <strong>
              Welcome <em>{user.user ? user.user.fullname : ""}</em>
            </strong>
          </h5>
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6} lg={6} xl={4}>
          <Card className="card bg-primary img-card box-primary-shadow">
            <Card.Body className="">
              <div className="d-flex">
                {/* <div className="text-white">
                  <h2 className="mb-0 number-font">83</h2>
                  <p className="text-white mb-0">Closed Cases</p>
                </div> */}
                <div>
                  {totalCases !== null ? (
                    <div className="text-white">
                      <h2 className="mb-0 number-font">{totalCases}</h2>
                      <p className="text-white mb-0">Total Cases</p>
                    </div>
                  ) : (
                    <p className="text-white">Loading...</p>
                  )}
                </div>
                <div className="ms-auto">
                  <i className="fa fa-bar-chart text-white fs-30 me-2 mt-2"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6} lg={6} xl={4}>
          <Card className="card bg-warning img-card box-secondary-shadow">
            <Card.Body className="">
              <div className="d-flex">
                {/* <div className="text-white">
                  <h2 className="mb-0 number-font">83</h2>
                  <p className="text-white mb-0">Closed Cases</p>
                </div> */}
                <div>
                  {closedCases !== null ? (
                    <div className="text-white">
                      <h2 className="mb-0 number-font">{closedCases}</h2>
                      <p className="text-white mb-0">Active Cases</p>
                    </div>
                  ) : (
                    <p className="text-white">Loading...</p>
                  )}
                </div>
                <div className="ms-auto">
                  <i className="fa fa-bar-chart text-white fs-30 me-2 mt-2"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={12} md={6} lg={6} xl={4}>
          <Card className="card bg-secondary img-card box-secondary-shadow">
            <Card.Body className="">
              <div className="d-flex">
                <div>
                  {closedCases !== null ? (
                    <div className="text-white">
                      <h2 className="mb-0 number-font">{closedCases}</h2>
                      <p className="text-white mb-0">Closed Cases</p>
                    </div>
                  ) : (
                    <p className="text-white">Loading...</p>
                  )}
                </div>
                <div className="ms-auto">
                  <i className="fa fa-bar-chart text-white fs-30 me-2 mt-2"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6} lg={6} xl={6}>
          <Card className="card  bg-success img-card box-success-shadow">
            <Card.Body className="">
              <div className="d-flex">
                {/* <div className="text-white">
                  <h2 className="mb-0 number-font">28</h2>
                  <p className="text-white mb-0">Council/Legal Officers</p>
                </div> */}
                <div>
                  {councilLegalOfficers !== null ? (
                    <div className="text-white">
                      <h2 className="mb-0 number-font">
                        {councilLegalOfficers}
                      </h2>
                      <p className="text-white mb-0">Council/Legal Officers</p>
                    </div>
                  ) : (
                    <p className="text-white">Loading...</p>
                  )}
                </div>
                <div className="ms-auto">
                  <i className="fa fa-user text-white fs-30 me-2 mt-2"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col sm={12} md={6} lg={6} xl={6}>
          <Card className="card bg-info img-card box-info-shadow">
            <Card.Body className="">
              <div className="d-flex">
                {/* <div className="text-white">
                  <h2 className="mb-0 number-font">12</h2>
                  <p className="text-white mb-0">External Solicitors</p>
                </div> */}
                <div>
                  {externalSolicitors !== null ? (
                    <div className="text-white">
                      <h2 className="mb-0 number-font">{externalSolicitors}</h2>
                      <p className="text-white mb-0">External Solicitors</p>
                    </div>
                  ) : (
                    <p className="text-white">Loading...</p>
                  )}
                </div>
                <div className="ms-auto">
                  <i className="fa fa-user text-white fs-30 me-2 mt-2"></i>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12} xl={12}>
          <Row>
            {/* <Col
              lg={6}
              md={12}
              sm={12}
              xl={6}>
              <Card className=" overflow-hidden">
                <Card.Body className="card-body">
                  <Row>
                    <div className="col">
                      <Link
                        to={`${process.env.PUBLIC_URL}/userprofile/${user.user.id}`}>
                        <h3 className="">My Profile</h3>
                      </Link>

                      <p className="text-muted mb-0">
                          <span className="text-primary me-1">
                            <i className="fa fa-chevron-circle-up text-primary me-1"></i>
                            <span>3% </span>
                          </span>
                          last month
                        </p>
                    </div>
                    <div className="col col-auto">
                      <div className="counter-icon bg-primary-gradient box-shadow-primary brround ms-auto">
                        <Link
                          to={`${process.env.PUBLIC_URL}/userprofile/${user.user.id}`}>
                          <i className="fe fe-user text-white mb-5 "></i>
                        </Link>
                      </div>
                    </div>
                  </Row>
                </Card.Body>
              </Card>
            </Col> */}
            {/* <div className="col-lg-6 col-md-12 col-sm-12 col-xl-4">
              <div className="card overflow-hidden">
                <div className="card-body">
                  <Row>
                    <div className="col">
                      <h3 className="">Holidays</h3>
                      <h3 className="mb-2 number-font">
                        <CountUp
                          end={15}
                          separator=","
                          start={0}
                          duration={2.94}
                        />
                      </h3>
                      <p className="text-muted mb-0">
                        <span className="text-secondary me-1">
                          <i className="fa fa-chevron-circle-up text-secondary me-1"></i>
                          <span>3% </span>
                        </span>
                        last month
                      </p>
                    </div>
                    <div className="col col-auto">
                      <div className="counter-icon bg-danger-gradient box-shadow-danger brround  ms-auto">
                        <i className="fe fe-home text-white mb-5 "></i>
                      </div>
                    </div>
                  </Row>
                </div>
              </div>
            </div> */}
            {/* <Col lg={6} md={12} sm={12} xl={6}>
              <Card className="card overflow-hidden">
                <Card.Body className="card-body">
                  <Row>
                    <div className="col">
                      <h3 className="">Notifications</h3>
                      <h3 className="mb-2 number-font">
                        <CountUp
                          end={17}
                          separator=","
                          start={0}
                          duration={2.94}
                        />
                      </h3>
                      <p className="text-muted mb-0">
                        <span className="text-success me-1">
                          <i className="fa fa-chevron-circle-down text-success me-1"></i>
                          <span>0.5% </span>
                        </span>
                        last month
                      </p>
                    </div>
                    <div className="col col-auto">
                      <div className="counter-icon bg-secondary-gradient box-shadow-secondary brround ms-auto">
                        <i className="fe fe-inbox text-white mb-5 "></i>
                      </div>
                    </div>
                  </Row>
                </Card.Body>
              </Card>
            </Col> */}
          </Row>
        </Col>
      </Row>
      <Row>
        {/* <Col className="col-sm-12 col-md-12 col-lg-12 col-xl-9">
          <Card>
            <Card.Header className="card-header">
              <h3 className="card-title">Total Vouchers</h3>
            </Card.Header>
            <Card.Body className="card-body pb-0">
              <div id="chartArea" className="chart-donut">
                <ReactApexChart
                  options={dashboard.totalTransactions.options}
                  series={dashboard.totalTransactions.series}
                  type="area"
                  height={300}
                />
              </div>
            </Card.Body>
          </Card>
        </Col> */}
        {/* <Col sm={12} md={12} lg={12} xl={3}>
          <Card className="card custom-card ">
            <Card.Header className="card-header">
              <h3 className="card-title">Recent Orders</h3>
            </Card.Header>
            <Card.Body className="pt-0 px-3">
              <div id="recentorders" className="apex-charts apexs">
                <div id="chart">
                  <ReactApexChart
                    options={dashboard.Recentorders.options}
                    series={dashboard.Recentorders.series}
                    type="radialBar"
                    height={310}
                  />
                </div>
              </div>
              <div className="row sales-product-infomation pb-0 mb-0 mx-auto wd-100p mt-6">
                <div className="col-md-6 col justify-content-center text-center ">
                  <p className="mb-0 d-flex justify-content-center">
                    <span className="legend bg-primary"></span>Audited
                  </p>
                  <h3 className="mb-1 fw-bold">5238</h3>
                  <div className="d-flex justify-content-center ">
                    <p className="text-muted mb-0">Last 6 months</p>
                  </div>
                </div>
                <div className="col-md-6 col text-center float-end">
                  <p className="mb-0 d-flex justify-content-center ">
                    <span className="legend bg-background2"></span>Pre Audit
                  </p>
                  <h3 className="mb-1 fw-bold">3467</h3>
                  <div className="d-flex justify-content-center ">
                    <p className="text-muted mb-0">Last 6 months</p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
      <Modal
        show={notificationModal}
        onHide={() => setNotificationModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Unit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Col lg={12} md={12}>
                Please confirm you are about to delete the case with suite
                {/* number of {value.suite_no}? */}
              </Col>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => setNotificationModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
