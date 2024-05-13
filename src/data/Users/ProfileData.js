import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "react-data-table-component-extensions/dist/index.css";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import { OverlayTrigger, Tooltip, Col, Row } from "react-bootstrap";
import endpoint from "../../context/endpoint";
import { Context } from "../../context/Context";
import moment from 'moment';
// import { memoize } from 'react-data-table-component';
import { Table } from "react-bootstrap";
import { Users } from "./Users";
import { Email } from "@mui/icons-material";
import Loader from "../Loader/loader";

export const ProfileHeader = () => {
    const [data, setUser] = useState('')
    const [isLoading, setLoading] = useState(false);
    const params = useParams();
    useEffect(() => {
        const getUser = async () => {
            setLoading(true)
            await endpoint.get(`/user/profile/information/show/${params.id}`)
                .then((res) => {
                    // console.log("profile info", res.data.data[1])
                    setUser(res.data.data[1])
                    setLoading(false)
                })
                .catch((err) => {
                    // console.log(err)
                })
        }
        getUser()
    }, [])

    return (
        <div className="wideget-user">
                <Row>
                  <Col lg={12} md={12} xl={6}>
                    <div className="wideget-user-desc d-sm-flex">
                      <div className="wideget-user-img">
                        <img className="" crossOrigin="anonymous" src={process.env.REACT_APP_UPLOAD_URL+data.profile_photo_url} alt="user..."  style={{height:`200px`, width:`200px`}}/>
                      </div>
                      <div className="user-wrap">
                        <h4>{data.first_name} {data.last_name} {data.other_name}</h4>
                        <h6 className="text-muted mb-3">
                          Employed Since: {data.date_of_appointment}
                        </h6>
                        <Link
                          to={`${process.env.PUBLIC_URL}/pages/mailInbox/${params.id}`}
                          className="btn btn-secondary mt-1 mb-1 ms-1"
                        >
                          <i className="fa fa-envelope"></i> Notifications
                        </Link>
                      </div>
                    </div>
                  </Col>
                  <Col lg={12} md={12} xl={6}>
                    <div className="text-xl-right mt-4 mt-xl-0">
                      <Link
                        to={`${process.env.PUBLIC_URL}/staffdocumentation/${params.id}`}
                        className="btn btn-primary me-1"
                      >
                        Edit Profile
                      </Link>
                    </div>
                   
                  </Col>
                </Row>
              </div>
    )
}

export const PersonalData = () => {
    const [data, setUser] = useState('')
    const [isLoading, setLoading] = useState(false);
    const params = useParams();
    useEffect(() => {
        const getUser = async () => {
            setLoading(true)
            await endpoint.get(`/user/profile/information/show/${params.id}`)
                .then((res) => {
                    // console.log("profile info", res.data.data[1])
                    setUser(res.data.data[1])
                    setLoading(false)
                })
                .catch((err) => {
                    // console.log(err)
                })
        }
        getUser()
    }, [])

    return (
        <>
            {!isLoading && <Col lg={12}>
                <Table className="table row table-borderless table-striped">
                    <tbody className="col-lg-12 col-xl-12 p-0">
                        <tr>
                            <td>
                                <strong>Full Name:</strong>

                            </td>
                            <td>{data.first_name} {data.last_name} {data.other_name}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Email :</strong>
                            </td>
                            <td>
                                {data.email}
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>File No. :</strong>
                            </td>
                            <td>{data.file_number}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Nationality:</strong>
                            </td>
                            <td>Nigeria</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Languages:</strong>
                            </td>
                            <td>
                                English,German, Spanish.
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>State:</strong>
                            </td>
                            <td>{data.state}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Local Govt. Area:</strong>
                            </td>
                            <td>{data.lga}</td>
                        </tr>
                    </tbody>

                </Table>
            </Col>
            }

            {isLoading && <Loader />}

        </>


    )


};

export const PersonalFileData = () => {
    const [data, setUser] = useState('')
    const [isLoading, setLoading] = useState(false);
    const params = useParams();
    useEffect(() => {
        const getUser = async () => {

            await endpoint.get(`/user/show/${params.id}`)
                .then((res) => {
                    // console.log(res.data.data)
                    setUser(res.data.data)

                })
                .catch((err) => {
                    // console.log(err)
                })
        }
        getUser()
    }, [])

    return (
        <>
            <Row>
                <Col lg={3} xl={3} md={3} sm={12}>
                    <Link to={`${process.env.PUBLIC_URL}/files-undercategory/${params.id}`} className=" fw-semibold">
                        <span className="fe fe-folder" style={{ fontSize: 70, }}></span><br></br>
                        Contract Files
                    </Link>
                </Col>
                <Col lg={3} xl={3} md={3} sm={12}>
                    <Link to={`${process.env.PUBLIC_URL}/files-undercategory/${params.id}`} className=" fw-semibold">
                        <span className="fe fe-folder" style={{ fontSize: 70, }}></span><br></br>
                        Staff Files
                    </Link>
                </Col>
                <Col lg={3} xl={3} md={3} sm={12}>
                    <Link to={`${process.env.PUBLIC_URL}/files-undercategory/${params.id}`} className=" fw-semibold">
                        <span className="fe fe-folder" style={{ fontSize: 70, }}></span><br></br>
                        Personal Files
                    </Link>
                </Col>
                <Col lg={3} xl={3} md={3} sm={12}>
                    <Link to={`${process.env.PUBLIC_URL}/files-undercategory/${params.id}`} className=" fw-semibold" >
                        <span className="fe fe-folder" style={{ fontSize: 70, }}></span><br></br>
                        General Files
                    </Link>
                </Col>
            </Row>
            {/* <div className="media-body valign-middle">
                <Link
                    to=""
                    className=" fw-semibold text-dark"
                >
                    <span className="fe fe-folder" style={{fontSize:70,}}></span><br></br>
                    Category: Contract Files
                </Link>
                <p className="text-muted mb-0">
                    Description: staff employment letter
                </p>
            </div> */}
            {/* <div className="media-body valign-middle text-end overflow-visible mt-2">
                <button
                    className="btn btn-primary"
                    type="button"
                >
                    Open
                </button>
            </div> */}
        </>

    )
}
