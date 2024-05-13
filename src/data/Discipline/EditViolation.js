import React, { useState } from "react";
import { DropdownButton, ButtonGroup, Modal, Card, Button, Row, Col, InputGroup, Dropdown, FormGroup, Form } from "react-bootstrap";
import endpoint from "../../context/endpoint";
import { ErrorAlert, SuccessAlert } from "../Toast/toast";

export const EditViolation = ({violation, setViolationId, setShowEditModal, getViolationList}) => {
    const [newViolation, setNewViolation] = useState({ 
        violation_type: violation.violation_type, 
        violation_description: violation.violation_description, 
    })
  
    const updateViolation = async (e) => {
      e.preventDefault()
    //   console.log("my updating data", newViolation)
      //point to update volume endpoint with volume id: catId and update volume
      await endpoint.put(`/discipline/update_violation/${violation.id}`, newViolation).then((res) => {
        // console.log(res.data);
        SuccessAlert(res.data.message)
        setShowEditModal(false)
        getViolationList()
  
      }).catch((err) => {
        setShowEditModal(false)
        ErrorAlert(err.response.data.message)
        // console.log(err)
      })
    }
  
      return (
        <>
          <form onSubmit={updateViolation}>
              <Modal.Body>
                  <Card>
  
                      <Card.Header>
                          <Card.Title as="h3">Update Violation</Card.Title>
  
                      </Card.Header>
  
                      <Card.Body>
                          <Col lg={12} md={12}>
                              <FormGroup>
                                  <label htmlFor="exampleInputname">Violation Type </label>
                                  <Form.Control type="text"
                                      defaultValue={newViolation.violation_type}
                                      onChange={(e) => setNewViolation({ ...newViolation, violation_type: e.target.value })}
                                      className="form-control" />
                              </FormGroup>
                          </Col>
                          <Col lg={12} md={12}>
                              <FormGroup>
                                  <label htmlFor="exampleInputname">Description </label>
                                  <Form.Control type="text"
                                      defaultValue={newViolation.violation_description}
                                      onChange={(e) => setNewViolation({ ...newViolation, violation_description: e.target.value })}
                                      className="form-control" />
                              </FormGroup>
                          </Col>
                      </Card.Body>
                  </Card>
  
              </Modal.Body>
              <Modal.Footer>
                  <Button variant="warning" className="me-1" onClick={() => {
                      setViolationId("");
                      setShowEditModal(false);
                  }}>
                      Close
                  </Button>
                  <Button type="submit" variant="primary" className="me-1">
                      Update Violation
                  </Button>
              </Modal.Footer>
            </form>
          </>
        )
    }