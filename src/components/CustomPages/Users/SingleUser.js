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
//   import "./styles.css";
import Loader from "../../../data/Loader/loader";



export default function SingleUser() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();

    const params = useParams();
    const id = params.id;

    useEffect(() => {
        getUser()
      }, [])

      //get a single user
   const getUser = async () => {
    setLoading(true);
    await endpoint.get(`/user/show/${id}`)
      .then((res) => {
        console.log("Single user", res.data.data)
        setData(res.data.data);
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
      })
  }


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
                <div className="d-flex align-items-center w-100">
            <Link
                  className="btn btn-primary ml-auto"
                  to={"/all-users"}>
                <span className='fe fe-arrow-left'></span>Back
                </Link>
            </div>
                <div className="mt-5">
                  <div className="container bg-primary text-white custom-height" style={{height:"50px", borderRadius:"5px"}}>
                    <h4 className="text-center text-uppercase pt-3">
                      User Information
                    </h4>
                  </div>
                  <hr className="my-4" />
                  <div className="row m-5">
                    {data && (
                      <div className="col-md-12">
                        <div className="row border">
                          <div className="fw-bold col-md-6">Surname:</div>
                          <div className="col-md-6">{data.surname}</div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">First Name:</div>
                          <div className="col-md-6">{data.first_name}</div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">Middle Name:</div>
                          <div className="col-md-6">{data.middle_name}</div>
                        </div>

                        <div className="row border">
                          <div className="fw-bold col-md-6">Email:</div>
                          <div className="col-md-6">{data.email}</div>
                        </div> 
                        <div className="row border">
                          <div className="fw-bold col-md-6">Role:</div>
                          <div className="col-md-6">{data.Role ? data.Role.role_name : ""}</div>
                        </div>  

                        <div className="row border">
                          <div className="fw-bold col-md-6">User Type:</div>
                          <div className="col-md-6">{data.user_type}</div>
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