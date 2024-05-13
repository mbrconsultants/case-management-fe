import React, { useState } from "react";
import { DropdownButton, ButtonGroup, Modal, Card, Button, Row, Col, InputGroup, Dropdown, FormGroup, Form } from "react-bootstrap";
import endpoint from "../../context/endpoint";
import { ErrorAlert, SuccessAlert } from "../Toast/toast";

export const EditDisciplinaryAction = ({disciplinary, setDisciplinaryId, setShowEditModal, getDisciplinaryList}) => {
    const [newDisciplinary, setDisciplinary] = useState({ 
        disciplinary_action_name: disciplinary.disciplinary_action_name, 
        disciplinary_action_description: disciplinary.disciplinary_action_description, 
    })
  
    const updateDisciplinaryAction = async (e) => {
      e.preventDefault()
    //   console.log("my updating data", newDisciplinary)
      //point to update volume endpoint with volume id: catId and update volume
      await endpoint.put(`/discipline/update_disciplinaryAction/${disciplinary.id}`, newDisciplinary).then((res) => {
        // console.log(res.data);
        SuccessAlert(res.data.message)
        setShowEditModal(false)
        getDisciplinaryList()
  
      }).catch((err) => {
        setShowEditModal(false)
        ErrorAlert(err.response.data.message)
        // console.log(err)
      })
    }
  
      return (
        <>
          <form onSubmit={updateDisciplinaryAction}>
              <Modal.Body>
                  <Card>
  
                      <Card.Header>
                          <Card.Title as="h3">Update Disciplinary Action</Card.Title>
  
                      </Card.Header>
  
                      <Card.Body>
                          <Col lg={12} md={12}>
                              <FormGroup>
                                  <label htmlFor="exampleInputname">Name</label>
                                  <Form.Control type="text"
                                      defaultValue={newDisciplinary.disciplinary_action_name}
                                      onChange={(e) => setDisciplinary({ ...newDisciplinary, disciplinary_action_name: e.target.value })}
                                      className="form-control" />
                              </FormGroup>
                          </Col>
                          <Col lg={12} md={12}>
                              <FormGroup>
                                  <label htmlFor="exampleInputname">Description</label>
                                  <Form.Control type="text"
                                      defaultValue={newDisciplinary.disciplinary_action_description}
                                      onChange={(e) => setDisciplinary({ ...newDisciplinary, disciplinary_action_description: e.target.value })}
                                      className="form-control" />
                              </FormGroup>
                          </Col>
                      </Card.Body>
                  </Card>
  
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="warning" className="me-1" onClick={() => {
                      setDisciplinaryId("");
                      setShowEditModal(false);
                  }}>
                      Close
                  </Button>
                  <Button type="submit" variant="primary" className="me-1">
                      Update Disciplinary Action
                  </Button>
              </Modal.Footer>
            </form>
          </>
        )
    }