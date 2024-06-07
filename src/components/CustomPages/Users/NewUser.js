import React, { useState, useContext, useEffect } from "react";
import { Breadcrumb, Col, Row, Card, FormGroup, Button } from "react-bootstrap";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { Link, useNavigate } from "react-router-dom";
import { CForm, CCol, CFormLabel, CFormFeedback, CFormInput, CInputGroup, CInputGroupText, CButton, CFormCheck, } from "@coreui/react";
import * as formvalidation from "../../../data/Form/formvalidations/formvalidations";
import endpoint from "../../../context/endpoint";
import { useForm } from 'react-hook-form';

export default function CreateUser() {
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false);
    const [roles, setRoles]=useState([]);
    const { register, handleSubmit, formState: { errors }, reset } = useForm()

    //get roles
    const getRoles = async () => {
        setLoading(true);
        await endpoint.get('/role/getRoles')
          .then((res) => {
            //  console.log("roles", res.data.data)
            setRoles(res.data.data)
            setLoading(false)
          })
          .catch((err) => {
            setLoading(false)
            // console.log(err)
          })
      }
    useEffect(() => {
        getRoles()
      }, [])
    

    

    const handleCreateUser = async(data) => {
        // console.log(data)
    setLoading(true)
      await endpoint.post('/user/create', data)
            .then((res) => navigate(`${process.env.PUBLIC_URL}/all-users`))
                .catch((err) => {
                    // console.log(err)
                })

       
    }

    return (
        <div>
            <div className="page-header">
                <div>
                    <h1 className="page-title">New User</h1>
                    <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item className="breadcrumb-item" href="#">
                            Registry
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            className="breadcrumb-item active breadcrumds"
                            aria-current="page"
                        >
                            New User
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <div className="ms-auto pageheader-btn">
                    <Link to={`${process.env.PUBLIC_URL}/all-users`} className="btn btn-primary btn-icon text-white me-3">
                        <span>
                            <i className="fe fe-eye"></i>&nbsp;
                        </span>
                        View Users
                    </Link>
                </div>
            </div>

            <Row>
                <Col md={12} lg={12}>
                    <Card>
                        <Card.Header>
                            <Col className="card-title text-center">
                                <span> Enter User Credentials </span>
                                <span className="fe fe-user"></span></Col>
                        </Card.Header>

                        <Card.Body>
                            {/* <formvalidation.CustomValidation /> */}
                            <CForm onSubmit={handleSubmit(handleCreateUser)}
                                className="row g-3 needs-validation"
                            >
                                <CCol md={4}>
                                    <CFormLabel htmlFor="validationCustom01">Surname</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        id="validationCustom01"
                                        defaultValue=""
                                        required
                                        name="surname"
                                        {...register("surname")}

                                    />
                                    {/* <CFormFeedback valid>Looks good!</CFormFeedback> */}
                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="validationCustom02">Firstname</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        required
                                        name="first_name"
                                        {...register("first_name")}

                                    />
                                </CCol>
                                <CCol md={4}>
                                    <CFormLabel htmlFor="validationCustom02">Middlename</CFormLabel>
                                    <CFormInput
                                        type="text"
                                        name="middle_name"
                                        {...register("middle_name")}

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
                                {/* <CCol md={2}>
                                    <CFormLabel htmlFor="validationCustomUsername">Gender</CFormLabel>

                                    <select className="form-control" {...register("gender", { required: "Please select gender" })}>
                                        <option value=""> --Select Gender-- </option>
                                        <option value="Male"> Male</option>
                                        <option value="Male">Female </option>
                                       
                                    </select>

                                    {errors.r?.type === "required" && ( <span className='text-danger'> Gender is required </span> )}
                                </CCol> */}
                                <CCol md={2}>
                                    <CFormLabel htmlFor="validationCustomUsername">Roles</CFormLabel>

                                    <select className="form-control" {...register("role_id", { required: "Please select roles" })}>
                                        <option value=""> --Select Roles-- </option>
                                        {roles.map(role => (<option key={role.id} value={role.id}>{role.role_name}</option>))}
                                    </select>

                                    {errors.r?.type === "required" && ( <span className='text-danger'> Role required </span> )}
                                </CCol>
                                
                                <CCol md={4}>
                                    <CFormLabel htmlFor="validationCustom02">Password</CFormLabel>
                                    <CFormInput
                                        type="password"
                                        name="password"
                                        {...register("password")}

                                    />
                                        {/* <input type="hidden" name="user_type" {...register("user_type")} value="1" />
                                    {errors.phoneNo?.type === "checkLength" && (<span className='text-danger'> <em>Phone No. is invalid</em> </span>)}
                                    {errors.phoneNo?.type === "matchPattern" && (<span className='text-danger'> <em>Phone No. is Incorrect</em> </span>)} */}

                                </CCol>
                              
                                
                                <CCol xs={12} className="text-center">
                                    <CButton color="primary" type="submit">
                                        <span className='fe fe-plus'></span>{isLoading ? "Saving data..." : "Save"} 
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