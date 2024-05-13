import React, { useState } from "react";
import { DropdownButton, ButtonGroup, Modal, Card, Button, Row, Col, InputGroup, Dropdown, FormGroup, Form } from "react-bootstrap";
import endpoint from "../../context/endpoint";
import { ErrorAlert, SuccessAlert } from "../../data/Toast/toast";

export const EditDiscipline = ({discipline, setDisciplineId, setShowEditModal, getDisciplineList}) => {
    const [newDiscipline, setNewDiscipline] = useState({ 
        ProfileId: discipline.ProfileId, 
        violationId: discipline.violationId, 
        offences: discipline.offences, 
        DisciplinaryActionId: discipline.DisciplinaryActionId, 
        duration: discipline.duration, 
        StatusId: discipline.StatusId, 
    })
    
    const updateDescipline = async (e) => {
      e.preventDefault()
    //   console.log("my updating data", newDiscipline)
      //point to update volume endpoint with volume id: catId and update volume
      await endpoint.put(`/discipline/editTakenDisciplinaryActions/${discipline.id}`, newDiscipline).then((res) => {
        // console.log(res.data);
        SuccessAlert(res.data.message)
        setShowEditModal(false)
        getDisciplineList()
  
      }).catch((err) => {
        setShowEditModal(false)
        ErrorAlert(err.response.data.message)
        // console.log(err)
      })
    }
  
      return (
        <>
          <form onSubmit={updateDescipline}>
              <Modal.Body>
                  <Card>
  
                      <Card.Header>
                          <Card.Title as="h3">Update Discipline {discipline.id}</Card.Title>
  
                      </Card.Header>
  
                      <Card.Body>
                          <Col lg={12} md={12}>
                              <FormGroup>
                                  <label htmlFor="exampleInputname">Staff Name </label>
                                  <Form.Control type="text"
                                      defaultValue={newDiscipline.staffName}
                                      onChange={(e) => setNewDiscipline({ ...newDiscipline, staffName: e.target.value })}
  
                                      className="form-control" />
                              </FormGroup>
                          </Col>
                          <Col lg={12} md={12}>
                              <FormGroup>
                                  <label htmlFor="exampleInputname">Staff Department </label>
                                  <Form.Control type="text"
                                      defaultValue={newDiscipline.staffDepartment}
                                      onChange={(e) => setNewDiscipline({ ...newDiscipline, staffDepartment: e.target.value })}
  
                                      className="form-control" />
                              </FormGroup>
                          </Col>
                          <Col lg={12} md={12}>
                              <FormGroup>
                                  <label htmlFor="exampleInputname">Staff Designation </label>
                                  <Form.Control type="text"
                                      defaultValue={newDiscipline.staffDesignation}
                                      onChange={(e) => setNewDiscipline({ ...newDiscipline, staffDesignation: e.target.value })}
  
                                      className="form-control" />
                              </FormGroup>
                          </Col>
                          <Col lg={12} md={12}>
                              <FormGroup>
                                  <label htmlFor="exampleInputname">Staff Email </label>
                                  <Form.Control type="text"
                                      defaultValue={newDiscipline.staffEmail}
                                      onChange={(e) => setNewDiscipline({ ...newDiscipline, staffEmail: e.target.value })}
  
                                      className="form-control" />
                              </FormGroup>
                          </Col>
                          <Col lg={12} md={12}>
                              <FormGroup>
                                  <label htmlFor="exampleInputname">Staff Phone </label>
                                  <Form.Control type="text"
                                      defaultValue={newDiscipline.staffPhone}
                                      onChange={(e) => setNewDiscipline({ ...newDiscipline, staffPhone: e.target.value })}
  
                                      className="form-control" />
                              </FormGroup>
                          </Col>
                          <Col lg={12} md={12}>
                              <FormGroup>
                                  <label htmlFor="exampleInputname">Staff Address </label>
                                  <Form.Control type="text"
                                      defaultValue={newDiscipline.staffAddress}
                                      onChange={(e) => setNewDiscipline({ ...newDiscipline, staffAddress: e.target.value })}
  
                                      className="form-control" />
                              </FormGroup>
                          </Col>
                          <Col lg={12} md={12}>
                              <FormGroup>
                                  <label htmlFor="exampleInputname">Offence </label>
                                  <Form.Control type="text"
                                      defaultValue={newDiscipline.offence}
                                      onChange={(e) => setNewDiscipline({ ...newDiscipline, offence: e.target.value })}
  
                                      className="form-control" />
                              </FormGroup>
                          </Col>
                      </Card.Body>
                  </Card>
  
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="warning" className="me-1" onClick={() => {
                      setDisciplineId("");
                      setShowEditModal(false);
                  }}>
                      Close
                  </Button>
                  <Button type="submit" variant="primary" className="me-1">
                      Update Descipline
                  </Button>
              </Modal.Footer>
            </form>
          </>
        )
    }