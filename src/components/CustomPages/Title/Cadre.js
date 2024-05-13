import React, { useEffect, useState } from "react";
import * as formelement from "../../../data/Form/formelement/formelement";
import MultiSelect from "react-multiple-select-dropdown-lite";
import * as editprofile from "../../../data/Pages/editprofile/editprofile";
import { CForm, CCol, CFormLabel, CFormFeedback, CFormInput, CInputGroup, CInputGroupText, CButton, CFormCheck, } from "@coreui/react";
import { useForm } from 'react-hook-form';
import {Modal } from "react-bootstrap";
import endpoint from "../../../context/endpoint";
import Loader from "../../../data/Loader/loader";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";
import { Link, useParams, useNavigate } from "react-router-dom";
import { trim } from "lodash";
import * as CadreList from "../../../data/Title/Cadre"
import {
    Col,
    Row,
    Card,
    Form,
    FormGroup,
    FormControl,
    ListGroup,
    Button,
    Breadcrumb,
} from "react-bootstrap";

    export default function Cadres() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
        
    const [isLoading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const [cadre, setCadreList] = useState([])
    const [name, setName] = useState('');

//create designation
    const handleCreateCadre = async () => {
        await endpoint.post('/cadre/create', {name : trim(name)})
            .then((res) => {
                // console.log("cadre created", res)
                SuccessAlert(res.data.message)
                getCadreList()
                setShow(false)
                setLoading(false)
            })
            .catch((error) => {
                if (error.response) {
                    ErrorAlert(error.response.data.description)
                    // console.log("error:", error.response.data);
                }
            })

    }

    useEffect(() => {
        getCadreList()
      }, []);
//get designation list

const getCadreList = async () => {
    await endpoint.get("/cadre/list")
      .then((res) => {
        //  console.log( "titles",res.data.data)
        setCadreList(res.data.data)

      })
      .catch((err) => {
        // console.log(err)
      })
  }

    return (
        <div>
            {/* <div className="page-header">
                <div>
                    <h1 className="page-title">Cadre List</h1>
                    <Breadcrumb className="breadcrumb">
                        <Breadcrumb.Item className="breadcrumb-item" href="#">
                            All
                        </Breadcrumb.Item>
                        <Breadcrumb.Item
                            className="breadcrumb-item active breadcrumds"
                            aria-current="page"
                        >
                            Cadre
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            </div> */}

            {/* <Row>

                <Col lg={12} xl={12} md={12} sm={12}>
                    <Card>
                        <Card.Header>
                            <Col className="text-beginning">
                                <Card.Title as="h3">Cadre</Card.Title>
                            </Col>

                            <Col className="text-end">
                                <Button className="btn" type="submit" variant="info" onClick={handleShow}> <span className="fe fe-plus"></span>
                                    Create
                                </Button>
                            </Col>

                        </Card.Header>
                        <Card.Body>
                            <CadreList.Cadre cadre={cadre} getCadreList={getCadreList}/>
                        </Card.Body>
                    </Card>
                </Col>

            </Row> */}

            {/* <Modal show={show} >
                <Modal.Header >
                    <Button
                        onClick={() => setShow(false)}
                        className="btn-close"
                        variant=""
                    >
                        x
                    </Button>
                </Modal.Header>
                <CForm  onSubmit={handleSubmit(handleCreateCadre)}
                                className="row g-3 needs-validation" >
                    <Modal.Body>
                        <div>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h3">Create Cadre</Card.Title>
                            </Card.Header>

                            <Card.Body>
                                <Col lg={12} md={12}>
                                    <FormGroup>
                                        <label htmlFor="exampleInputname">Name</label>
                                        <Form.Control type="text" name="name"  onChange={(e) => setName(e.target.value)} className="form-control"/>
                                    </FormGroup>
                                </Col>
                                
                            </Card.Body>
                        </Card>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" className="me-1" onClick={() => setShow(false)}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" className="me-1"> <span className="fe fe-arrow-right"></span>
                            Save
                        </Button>
                    </Modal.Footer>
                </CForm>
            </Modal> */}

        </div>
    );
}
    