import React, { useState, useEffect } from 'react'
import { Breadcrumb, Col, Row, Card, FormGroup, Button } from "react-bootstrap";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { Link, useNavigate } from "react-router-dom";
import { CForm, CCol, CFormLabel, CFormFeedback, CFormInput, CInputGroup, CInputGroupText, CButton, CFormCheck, } from "@coreui/react";
import * as formvalidation from "../../../data/Form/formvalidations/formvalidations";
import endpoint from "../../../context/endpoint";
import { useForm } from 'react-hook-form';
import { ErrorAlert, SuccessAlert } from '../../../data/Toast/toast';

export default function CreateUser() {
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false);
    const [userTypes, setUserTypes] = useState([]);

    useEffect(() => {
        getUserTypes()
    }, [])

    const genderList = [
        { id:1, value: "male", label: "Male" }, { id:2, value: "female", label: "Female" }
    ]

    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    const getUserTypes = async() => {
        await endpoint.get('/user-type/get-user-type-s1')
        .then((res) => {
            // console.log("res", res.data.data)
            setUserTypes(res.data.data)
        })
        .catch((err) => {
            // console.log(err)
        })
    }

    const handleCreateUser = async(data) => {
    setLoading(true)
      await endpoint.post('/user/create', data)
            .then((res) => {
                // console.log(res.data.message)
                navigate(`${process.env.PUBLIC_URL}/users`)
                SuccessAlert(res.data.message)
            })
            .catch((err) => {
                setLoading(false)
                // console.log(err.response.data.message)
                ErrorAlert(err.response.data.message)
            })

        // console.log("user data", data)
    }

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">New Appointment</h1>
                    <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item className="breadcrumb-item" href="#">
                            Registry
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            className="breadcrumb-item active breadcrumds"
                            aria-current="page"
                        >
                            New Appointment
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="ms-auto pageheader-btn">
                    <Link to={`${process.env.PUBLIC_URL}/users`} className="btn btn-primary btn-icon text-white me-3">
                        <span>
                            <i className="fe fe-eye"></i>&nbsp;
                        </span>
                        Staff List
                    </Link>
                </div>
            </div>

            <Row>
                <Col md={12} lg={12}>
                    <Card>
                        <Card.Header>
                            <Col className="card-title text-center">
                                <span> Enter Staff Credentials </span>
                                <span className="fe fe-user"></span></Col>
                        </Card.Header>

                        <Card.Body>
                            {/* <formvalidation.CustomValidation /> */}
                            <CForm onSubmit={handleSubmit(handleCreateUser)}
                                className="row g-3 needs-validation"
                            >
                                <CCol md={4}>
                                    <CFormLabel htmlFor="validationCustom02">Surname</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        required
                                        name="last_name"
                                        {...register("last_name")}

                                    />
                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="validationCustom01">First name</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="validationCustom01"
                                        defaultValue=""
                                        required
                                        name="first_name"
                                        {...register("first_name")}

                                    />
                                    {/* <CFormFeedback valid>Looks good!</CFormFeedback> */}
                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="validationCustom02">Other name</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        name="other_name"
                                        {...register("other_name")}

                                    />
                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="validationCustomUsername">Email</CFormLabel>
                                    <CInputGroup className="has-validation">
                                        {/* <CInputGroupText id="inputGroupPrepend">@</CInputGroupText> */}
                                        <CFormInput
                                            type="email"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                            name="email"
                                            {...register("email")}

                                        />
                                    </CInputGroup>
                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="validationCustom02">Phone No.</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        name="phone"
                                        {...register("phone")}

                                    />
                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="validationCustomUsername">Gender</CFormLabel>

                                    <select className="form-control" {...register("gender", { required: "Please select gender" })}>
                                        <option value=""> Select... </option>
                                        {genderList.map(gender => (<option key={gender.id} value={gender.value}>{gender.label}</option>))}
                                    </select>

                                    {errors.gender?.type === "required" && ( <span className='text-danger'> Gender is required </span> )}
                                </CCol>
                                {/* <CCol md={2}>
                                    <CFormLabel htmlFor="validationCustomUsername">User Type</CFormLabel>

                                    <select className="form-control" {...register("user_type", { required: "Please select user type" })}>
                                        <option value=""> Select... </option>
                                        {userTypes.map(userType => (<option key={userType.id} value={userType.id}>{userType.name}</option>))}
                                    </select>

                                    {errors.user_type?.type === "required" && ( <span className='text-danger'> User Type is required </span> )}
                                </CCol> */}
                                
                                <CCol xs={12} className="text-center">
                                    <CButton color="primary" type="submit" className={isLoading ? "btn-loading" : "btn-primary"}>
                                        <span className='fe fe-plus'></span>{isLoading ? "" : "Save"} 
                                    </CButton>
                                </CCol>
                            </CForm>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </div>
    );
}