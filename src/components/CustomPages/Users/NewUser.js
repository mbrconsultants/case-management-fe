import React, { useState, useContext, useEffect } from "react";
import { Breadcrumb, Col, Row, Card, FormGroup, Form, Button } from "react-bootstrap";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { Link, useNavigate } from "react-router-dom";
import { CForm, CCol, CFormLabel, CFormFeedback, CFormInput, CInputGroup, CInputGroupText, CButton, CFormCheck, } from "@coreui/react";
import * as formvalidation from "../../../data/Form/formvalidations/formvalidations";
import endpoint from "../../../context/endpoint";
import { useForm } from 'react-hook-form';
import "./selectStyle.css";


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
             console.log("roles", res.data.data)
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
                                <Col md={4}>
                                <FormGroup>
                                    <label htmlFor='exampleInputname1'>Surname</label>
                                    <Form.Control type='text' className='form-control' 
                                        style={{ border: "1px solid #000", padding: "10px" }} 
                                        required
                                        name="surname"
                                        {...register("surname")}
                                    />
                                </FormGroup>
                                </Col>
                                <Col md={4}>
                                <FormGroup>
                                    <label htmlFor='exampleInputname1'>Firstname</label>
                                    <Form.Control type='text' className='form-control' 
                                        style={{ border: "1px solid #000", padding: "10px" }} 
                                        required
                                        name="first_name"
                                        {...register("first_name")}
                                    />
                                </FormGroup>
                                </Col>
                                <Col md={4}>
                                <FormGroup>
                                    <label htmlFor='exampleInputname1'>Middlename</label>
                                    <Form.Control type='text' className='form-control' 
                                        style={{ border: "1px solid #000", padding: "10px" }} 
                                        required
                                        name="middle_name"
                                        {...register("middle_name")}
                                    />
                                </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <label htmlFor='exampleInputname1'>Email address</label>
                                        <Form.Control type='text' className='form-control' 
                                            style={{ border: "1px solid #000", padding: "10px" }} 
                                            name="email"
                                            {...register("email")} 
                                        />
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup className='custom-select-wrapper'>
                                        <label htmlFor='exampleInputname1'>Roles</label>
                                        <select className='form-control custom-select' {...register("role_id", { required: "Please select roles" })} style={{ border: "1px solid #000", padding: "10px" }}
                                        >
                                        <option value=""> --Select Roles-- </option>
                                        {roles.map(role => (<option key={role.id} value={role.id}>{role.role_name}</option>))}
                                        </select>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <label htmlFor='exampleInputname1'>Password</label>
                                        <Form.Control type='text' className='form-control' 
                                           style={{ border: "1px solid #000", padding: "10px" }}
                                           type="password"
                                           name="password"
                                           {...register("password")}
                                        />
                                    </FormGroup>
                                </Col>
                                
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