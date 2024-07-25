import React, { useState, useContext, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
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
// import "./styles.css";
import Loader from "../../../data/Loader/loader";

export default function SingleLegalOfficer() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    getSingleLegalOfficer();
  }, []);

  //get a single legal officer
  const getSingleLegalOfficer = async () => {
    setLoading(true);
    await endpoint.get(`/legal-officer/show/${id}`)
      .then((res) => {
        console.log("Single Legal Officer", res.data.data);
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };


  // Utility function to convert text to capitalize the first letter of each word
  const toTitleCase = (text) => {
    return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
  };


  return (
    <>
      <div>
        <Col xl={12} md={12}>
          <Card className="card border">
            {loading && <Loader />}
            {!loading && (
              <Card.Body>
                <div className="text-center"></div>
                <div className="d-flex align-items-center w-100">
                  <Link className="btn btn-primary ml-auto" to={"/legal-officer-list"}>
                    <span className="fe fe-arrow-left"></span>Back
                  </Link>
                </div>
                <div className="mt-5">
                  <div className="container bg-primary text-white custom-height" style={{ height: "50px", borderRadius: "5px" }}>
                    <h4 className="text-center text-uppercase pt-3">
                      Legal Officer Information
                    </h4>
                  </div>
                  <hr className="my-4" />
                  <div className="row m-5">
                    {data && (
                      <div className="col-md-12">
                        <div className="row border">
                          <div className="fw-bold col-md-6">Fullname:</div>
                          <div className="col-md-6"> {(data.Title ? toTitleCase(data.Title.name) : "")} {toTitleCase(data.surname) + " " + toTitleCase(data.first_name) + " " + toTitleCase(data.middle_name)}</div>
                        </div>
                        <div className="row border">
                          <div className="fw-bold col-md-6">Email:</div>
                          <div className="col-md-6">{data.email}</div>
                        </div>
                        <div className="row border">
                          <div className="fw-bold col-md-6">Alternative Email:</div>
                          <div className="col-md-6">{data.email_2}</div>
                        </div>
                        <div className="row border">
                          <div className="fw-bold col-md-6">Phone Number:</div>
                          <div className="col-md-6">{data.phone}</div>
                        </div>
                        <div className="row border">
                          <div className="fw-bold col-md-6">Alternative Phone Number:</div>
                          <div className="col-md-6">{data.phone_2}</div>
                        </div>
                        <div className="row border">
                          <div className="fw-bold col-md-6">Signature:</div>
                          <div className="col-md-6">
                            {data.signature && (
                              <img
                                src={`${process.env.REACT_APP_UPLOAD_URL}${data.signature}`}
                                alt="Signature"
                                crossOrigin="anonymous"
                                style={{ maxWidth: '150px', height: 'auto' }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card.Body>
            )}
          </Card>
        </Col>
      </div>
    </>
  );
}
