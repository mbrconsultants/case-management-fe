import React, {useState, useEffect, useContext} from "react";
import * as formelement from "../../../data/Form/formelement/formelement";
import MultiSelect from "react-multiple-select-dropdown-lite";
import * as editprofile from "../../../data/Pages/editprofile/editprofile";
import { CForm, CCol, CFormLabel, CFormFeedback, CFormInput, CInputGroup, CInputGroupText, CButton, CFormCheck, } from "@coreui/react";
import { useForm } from 'react-hook-form';
import {Modal } from "react-bootstrap";
import endpoint from "../../../context/endpoint";
import { Context } from '../../../context/Context';
import Loader from "../../../data/Loader/loader";
import { ErrorAlert, SuccessAlert } from "../../../data/Toast/toast";
import { Link, useParams, useNavigate } from "react-router-dom";
import { trim } from "lodash";
import * as TitleList from "../../../data/Title/Title"
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

    export default function Departments() {
    
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
        
    const [isLoading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const {user} = useContext(Context)
    const [title, setTitleList] = useState([])
    const [name, setName] = useState('');

    const currentUser = user?.user.id //get the current user



    const handleCreateTitle = async () => {
// console.log(currentUser);
        await endpoint.post('/title/create', {name : trim(name)}, {createdBY :currentUser})
            .then((res) => {
                // console.log("title created", res)
                SuccessAlert(res.data.message)
                getTitleList()
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
        
        getTitleList()
        

      }, []);
//get department list
const getTitleList = async () => {
    await endpoint.get("/title/list")
      .then((res) => {
        //  console.log( "titles",res.data.data)
        setTitleList(res.data.data)

      })
      .catch((err) => {
        // console.log(err)
      })
  }




        return (
            <div>
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Title List</h1>
                        <Breadcrumb className="breadcrumb">
                            <Breadcrumb.Item className="breadcrumb-item" href="#">
                                All
                            </Breadcrumb.Item>
                            <Breadcrumb.Item
                                className="breadcrumb-item active breadcrumds"
                                aria-current="page"
                            >
                                Title
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
    
                <Row>
    
                    <Col lg={12} xl={12} md={12} sm={12}>
                        <Card>
                            <Card.Header>
                                <Col className="text-beginning">
                                    <Card.Title as="h3">Title</Card.Title>
                                </Col>
    
                                <Col className="text-end">
                                    <Button className="btn" type="submit" variant="info" onClick={handleShow}> <span className="fe fe-plus"></span>
                                        Create
                                    </Button>
                                </Col>
    
                            </Card.Header>
                            <Card.Body>
                                <TitleList.Title title={title} getTitleList={getTitleList}/>
                            </Card.Body>
                        </Card>
                    </Col>
    
                </Row>
    
                <Modal show={show} >
                    <Modal.Header >
                        <Button
                            onClick={() => setShow(false)}
                            className="btn-close"
                            variant=""
                        >
                            x
                        </Button>
                    </Modal.Header>
                    <CForm  onSubmit={handleSubmit(handleCreateTitle)}
                                    className="row g-3 needs-validation" >
                        <Modal.Body>
                            <div>
                            <Card>
                                <Card.Header>
                                    <Card.Title as="h3">Create Unit</Card.Title>
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
                </Modal>
    
            </div>
        );
    }
    