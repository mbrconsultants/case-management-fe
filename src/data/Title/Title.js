import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-data-table-component-extensions/dist/index.css";
import endpoint from "../../context/endpoint";
import {Modal, FormGroup, Form } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { ErrorAlert, SuccessAlert } from "../../data/Toast/toast";
import { CForm } from "@coreui/react";
import { DropdownButton, ButtonGroup, Card, Button, Row, Col, InputGroup, Dropdown } from "react-bootstrap";


export const Title = ({title, getTitleList}) => {
    const { handleSubmit, register, formState: { errors }, reset } = useForm()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [TitleId, setTitleId] = useState("")
  const [ isLoading, setLoading] = useState(false);
  const [leaveId, setleaveId] = useState("")
  const [name, setNewTitile] = useState("")
  const [ show, setShow] = useState(false);
  const handleShowEditModal = () => {setShowEditModal(true)}
  const handleShowDeleteModal = () => {setShowDeleteModal(true)}

  //delete title function
  const deleteLeave = async (e, id) => {
    e.preventDefault()
    await endpoint.delete(`/title/delete/${TitleId.id}`).then((res) => {
             SuccessAlert(res.data.message);
            setShowDeleteModal(false)
            getTitleList()
    }).catch((error) => {
        if (error.response) {
            ErrorAlert(error.response.data.description);
            // console.log(error.response.data);
       
        }
    })
  }

  useEffect(() => {
    getTitleList()
  }, [])

  //update title
  const updateTitle = async (data) => {
    await endpoint.put(`/title/edit/${TitleId.id}`, data).then((res) => {
            setLoading(false);
            SuccessAlert(res.data.message);
            getTitleList()
            setShowEditModal(false);
            setLoading(false);
    }).catch((error) => {
      if (error.response) {
            ErrorAlert(error.response.data.description);
            
        }
    })
   
  }

  return (
    <>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>S/NO.</th>
            <th>Title</th>
            
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
       
         {title.map((data, index)=>
          <tr key={data.id} >
            <td>{index + 1}</td>
            <td>{data.name}</td>
            <td>
            <Link to="#"  className="btn btn-warning btn-sm my-1" variant="warning"  onClick={(e) => {handleShowEditModal(); setTitleId(data)}}>
                        <span className="fe fe-edit"> </span>
                    </Link>
                <Link to="#" onClick={(e) => {handleShowDeleteModal(); setTitleId(data)}} className="btn btn-danger btn-sm" variant="danger"> <span className="fe fe-trash"> </span> </Link>
            </td>
          </tr>
       )}
        </tbody>
      </table>
    </div>
    <Modal show={showEditModal} >
        <Modal.Header >
            <Button
                onClick={() => setShowEditModal(false)}
                className="btn-close"
                variant=""
            >
                x
            </Button>
        </Modal.Header>
            <CForm  onSubmit={handleSubmit(updateTitle)} className="row g-3 needs-validation" >
                <Modal.Body>
                    <div>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h3">Update Title</Card.Title>
                        </Card.Header>

                        <Card.Body>
                            <Col lg={12} md={12}>
                                <FormGroup>
                                    <label htmlFor="exampleInputname">Title Name</label>
                                    <Form.Control type="text"
                                    name="name"
                                    {...register("name")}
                                        defaultValue={TitleId.name}
                                        onChange={(e) => setNewTitile(e.target.value)}
                                        className="form-control"/>
                                </FormGroup>
                            </Col>
                        </Card.Body>
                    </Card>

                <Modal.Footer>
                    <Button variant="warning" className="me-1" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" className="me-1"> <span className="fe fe-arrow-right"></span>
                        Save
                    </Button>
                </Modal.Footer>
                </div>
                </Modal.Body>
            </CForm>

        </Modal>

    <Modal show={showDeleteModal} >
                <Modal.Header >
                    <Button
                        onClick={() => setShowDeleteModal(false)}
                        className="btn-close"
                        variant=""
                    >
                        x
                    </Button>
                </Modal.Header>

                <Modal.Body>
                    <div>
                    <Card>

                        <Card.Header>
                            <Card.Title as="h3">Remove Title</Card.Title>

                        </Card.Header>
                        <Card.Body>
                            <Col lg={12} md={12}>
                                Please confirm you are about to delete {TitleId.name} ?
                            </Col>

                        </Card.Body>

                    </Card>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" className="me-1" onClick={() => setShowDeleteModal(false)}>
                        Close
                    </Button>
                    <Button variant="danger" className="me-1" onClick={(e) => deleteLeave(e, leaveId.id)}>
                        Delete
                    </Button>
                </Modal.Footer>


        </Modal>
        
    </>
  )
  
};
