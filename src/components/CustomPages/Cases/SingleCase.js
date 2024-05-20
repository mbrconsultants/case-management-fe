import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import endpoint from "../../../context/endpoint";
import {
  Tabs,
  Tab,
  Breadcrumb,
  Card,
  Row,
  Col,
  Table,
  Modal,
  Button,
} from "react-bootstrap";

import Loader from "../../../data/Loader/loader";

export default function SingleCase() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  const [legalOfficers, setLegalOfficers] = useState([]);
  const [chambers, setChambers] = useState([]);

  const [legalOfficerId, setLegalOfficerId] = useState();
  const [chamberId, setChamberId] = useState();

  const [LegalModal, setLegalModal] = useState(false);
  const [motionModal, setMotionModal] = useState(false);

  const [ChamberModal, setChamberModal] = useState(false);

  const openLegalModal = () => {
    setLegalModal(true);
  };

  const closeLegalModal = () => {
    setLegalModal(false);
  };

  const openChamberModal = () => {
    setChamberModal(true);
  };

  const closeChamberModal = () => {
    setChamberModal(false);
  };

  const openMotionModal = () => {
    setMotionModal(true);
  };
  const closeMotionModal = () => {
    setMotionModal(false);
  };

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    getUser();
    getLegalOfficer();
    getChambers();
  }, []);

  const getUser = async () => {
    setLoading(true);
    await endpoint
      .get(`/case/show/${id}`)
      .then(({ data }) => {
        console.log("case", data.data);
        setData(data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const getLegalOfficer = async () => {
    setLoading(true);
    await endpoint
      .get(`/legal-officer/list`)
      .then(({ data }) => {
        console.log("legal officer", data.data);
        setLegalOfficers(data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const getChambers = async () => {
    setLoading(true);
    await endpoint
      .get(`/solicitor/list`)
      .then(({ data }) => {
        console.log("chamber", data.data);
        setChambers(data.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const handleAddLegalOfficer = () => {
    console.log("====================================");
    console.log(legalOfficerId);
    console.log("====================================");
  };

  const handleAddChamberOfficer = () => {
    console.log("====================================");
    console.log(chamberId);
    console.log("====================================");
  };
  return (
    <>
      <div>
        <Col
          xl={12}
          md={12}>
          <Card className="card border">
            {loading && <Loader />}
            {!loading && (
              <Card.Body>
                <div className="text-center"></div>
                <div className="mt-5">
                  <h4 className="text-center text-uppercase">
                    Case Information
                  </h4>
                  <hr className="my-4" />
                  <div className="row m-5">
                    {data && (
                      <div className="col-md-12">
                        <div className="row border">
                          <div className="fw-bold col-md-6">Suite No:</div>
                          <div className="col-md-6">{data.suite_no}</div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">Court:</div>
                          <div
                            className="col-md-6"
                            // style={{ textAlign: `right` }}
                          >
                            {data.Court ? data.Court.name : ""}
                          </div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">Parties:</div>
                          <div className="col-md-6">{data.parties}</div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">Respondent:</div>
                          <div className="col-md-6">{data.respondent}</div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">Case Type:</div>
                          <div className="col-md-6">
                            {data.CaseType ? data.CaseType.case_type : ""}
                          </div>
                        </div>
                        <div className="row border">
                          <div className="fw-bold col-md-6">
                            Case Description:
                          </div>
                          <div className="col-md-6">
                            {data.case_description}
                          </div>
                        </div>
                        <div className="row border">
                          <div className="fw-bold col-md-6">Legal Officer:</div>
                          <div className="col-md-6">
                            {data.LegalOfficer ? (
                              <>
                                {data.LegalOfficer.surname +
                                  " " +
                                  data.LegalOfficer.first_name +
                                  " " +
                                  data.LegalOfficer.middle_name}
                                <button className="btn btn-primary mx-5">
                                  change
                                </button>
                              </>
                            ) : (
                              <button
                                className="btn btn-info"
                                onClick={openLegalModal}>
                                <span className="fe fe-plus"></span>
                                Attach Legal Officer
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">
                            Chamber/Solicitor:
                          </div>
                          <div className="col-md-6">
                            {data.ChamberOrSolicitor ? (
                              <>
                                {data.ChamberOrSolicitor.chamber_name}
                                <button className="btn btn-primary mx-5">
                                  change
                                </button>
                              </>
                            ) : (
                              <button
                                className="btn btn-info"
                                onClick={openChamberModal}>
                                <span className="fe fe-plus"></span>
                                Attach Chamber/Solicitor
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">Attachment(s):</div>
                          <div className="col-md-6">
                            {data.CaseAttachments && (
                              <a
                                href={`${
                                  process.env.REACT_APP_UPLOAD_URL +
                                  data.CaseAttachments.doc_url
                                }`}
                                target="_blank"
                                className="btn btn-sm btn-success m-1">
                                <span className="fa fa-eye"></span>{" "}
                                View/Download
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="row border">
                          <div className="fw-bold col-md-6">Case Status:</div>
                          <div className="col-md-6">
                            <a
                              href={`#`}
                              className="btn  btn-warning m-1">
                              <i
                                class="fa fa-file"
                                aria-hidden="true"></i>
                              {data.status == 1 ? "Open" : " Closed"}
                            </a>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card.Body>
            )}

            <div className="col-md-12 flex justify-content-end">
              <button
                className="btn btn-primary mx-5"
                onClick={openMotionModal}>
                Attach Motion
              </button>
              {/* <button className="btn btn-primary">Attach Motion</button> */}
            </div>
          </Card>
        </Col>
        <Modal show={LegalModal}>
          <Modal.Header>
            <Button
              onClick={closeLegalModal}
              className="btn-close"
              variant="">
              x
            </Button>
          </Modal.Header>

          <Modal.Body>
            <div>
              <Card>
                <Card.Header>
                  <Card.Title as="h3">Attach legal Officer </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Col
                    lg={12}
                    md={12}>
                    <p>Please select legal Officer</p>

                    <select
                      className="form-select"
                      name=""
                      id=""
                      onChange={(e) => setLegalOfficerId(e.target.value)}>
                      <option value="">--select--</option>
                      {legalOfficers.map((officer) => (
                        <option
                          value={officer.id}
                          key={officer.id}>
                          {officer.surname +
                            " " +
                            officer.first_name +
                            " " +
                            officer.middle_name}
                        </option>
                      ))}
                    </select>
                  </Col>
                </Card.Body>
              </Card>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="warning"
              className="me-1"
              onClick={closeLegalModal}>
              Close
            </Button>
            <Button
              variant="primary"
              className="me-1"
              onClick={(e) => handleAddLegalOfficer(e, params.id)}>
              Assign
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={ChamberModal}>
          <Modal.Header>
            <Button
              onClick={closeChamberModal}
              className="btn-close"
              variant="">
              x
            </Button>
          </Modal.Header>

          <Modal.Body>
            <div>
              <Card>
                <Card.Header>
                  <Card.Title as="h3">Attach Chamber </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Col
                    lg={12}
                    md={12}>
                    <p>Please select Chamber</p>

                    <select
                      className="form-select"
                      name=""
                      id=""
                      onChange={(e) => setChamberId(e.target.value)}>
                      <option value="">--select--</option>
                      {chambers.map((chamber) => (
                        <option
                          value={chamber.id}
                          key={chamber.id}>
                          {chamber.chamber_name}
                        </option>
                      ))}
                    </select>
                  </Col>
                </Card.Body>
              </Card>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="warning"
              className="me-1"
              onClick={closeChamberModal}>
              Close
            </Button>
            <Button
              variant="primary"
              className="me-1"
              onClick={(e) => handleAddChamberOfficer(e)}>
              Assign
            </Button>
          </Modal.Footer>
        </Modal>
        {/* <Modal
          show={motionModal}
          size="lg">
          <Modal.Header>
            <Button
              onClick={closeMotionModal}
              className="btn-close"
              variant="">
              x
            </Button>
          </Modal.Header>

          <Modal.Body>
            <div>
              <Card>
                <Card.Header>
                  <Card.Title as="h3">Attach Motion </Card.Title>
                </Card.Header>
                <Card.Body>
                  <Col
                    lg={12}
                    md={12}>
                    <p>
                      Please complete the details to assign motion to{" "}
                      {data.suite_no}
                    </p>
                  </Col>
                  <Row className="my-5">
                    <Col md={6}>
                      <label htmlFor="document type">Document Type</label>
                      <select
                        className="form-select"
                        name=""
                        id=""
                        onChange={(e) => setChamberId(e.target.value)}>
                        <option value="">--select--</option>
                        {chambers.map((chamber) => (
                          <option
                            value={chamber.id}
                            key={chamber.id}>
                            {chamber.chamber_name}
                          </option>
                        ))}
                      </select>
                    </Col>
                    <Col md={6}>
                      <label htmlFor="document type">Document </label>
                      <input
                        className="form-control"
                        type="file"
                        name=""
                        id=""
                      />
                    </Col>
                  </Row>
                  <Row className="my-5">
                    <Col md={12}>
                      <label htmlFor="document type">Motion Description</label>
                      <textarea className="form-control"></textarea>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="warning"
              className="me-1"
              onClick={closeMotionModal}>
              Close
            </Button>
            <Button
              variant="primary"
              className="me-1"
              onClick={(e) => handleAddChamberOfficer(e)}>
              Assign
            </Button>
          </Modal.Footer>
        </Modal> */}
      </div>
    </>
  );
}
