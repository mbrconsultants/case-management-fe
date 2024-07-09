import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import endpoint from "../../../context/endpoint";
import { Card, Col } from "react-bootstrap";
import Loader from "../../../data/Loader/loader";

export default function SingleChamber() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const params = useParams();
  const id = params.id;

  useEffect(() => {
    getSingleChamber();
  }, []);

  const getSingleChamber = async () => {
    setLoading(true);
    try {
      const res = await endpoint.get(`/solicitor/show/${id}`);
      console.log("Single Solicitor", res.data.data);
      setData(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const parseAndJoin = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        return parsed.join(", ");
      }
      return parsed;
    } catch (error) {
      console.error("Error parsing JSON string:", error);
      return jsonString;
    }
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
                  <Link className="btn btn-primary ml-auto" to={"/chamber-list"}>
                    <span className="fe fe-arrow-left"></span>Back
                  </Link>
                </div>
                <div className="mt-5">
                  <div
                    className="container bg-primary text-white custom-height"
                    style={{ height: "50px", borderRadius: "5px" }}
                  >
                    <h4 className="text-center text-uppercase pt-3">
                      Chamber Information
                    </h4>
                  </div>
                  <hr className="my-4" />
                  <div className="row m-5">
                    {data && (
                      <div className="col-md-12">
                        <div className="row border">
                          <div className="fw-bold col-md-6">Chamber Name:</div>
                          <div className="col-md-6">{data.chamber_name}</div>
                        </div>
                        <div className="row border">
                          <div className="fw-bold col-md-6">Head of Chamber:</div>
                          <div className="col-md-6">{data.chamber_head}</div>
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
                          <div className="fw-bold col-md-6">Address:</div>
                          <div className="col-md-6">{data.address}</div>
                        </div>
                        {data.ChamberLawyers && data.ChamberLawyers.length > 0 && (
                          <>
                            <div className="row border">
                              <div className="fw-bold col-md-6">Counsel in Chamber:</div>
                              <div className="col-md-6">
                                {data.ChamberLawyers[0].lawyer_name
                                  ? parseAndJoin(data.ChamberLawyers[0].lawyer_name)
                                  : "N/A"}
                              </div>
                            </div>
                            <div className="row border">
                              <div className="fw-bold col-md-6">Counsel's Phone Number:</div>
                              <div className="col-md-6">
                                {data.ChamberLawyers[0].lawyer_phone
                                  ? parseAndJoin(data.ChamberLawyers[0].lawyer_phone)
                                  : "N/A"}
                              </div>
                            </div>
                          </>
                        )}
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
