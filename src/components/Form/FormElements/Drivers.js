import React from "react";
import { Dropdown } from "react-bootstrap";
import {
  Tabs,
  Tab,
  OverlayTrigger,
  Tooltip,
  Breadcrumb,
  Card,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import * as formelement from "../../../data/Form/formelement/formelement";

import styled from "styled-components";
import { Add, FileUploadOutlined } from "@mui/icons-material";


const RegForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-between;
  @media only screen and (max-width: 800px) {
  flex-direction: column;
}
`
const FormInput = styled.div`
  width: 48%;
  margin-bottom: 20px;
  @media only screen and (max-width: 800px) {
  width: 95%;
}
  `
const InputBox = styled.input`
  width: 100%;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
`
const SelectBox = styled.select`
  width: 100%;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
`
const SubmitButton = styled.button`
  border: 1px solid #05A850;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  color: #05A850;
  cursor: pointer;
  border-radius: 5px;
  :hover{
    background-color: #05A850;
    color: white;
  }
  @media only screen and (max-width: 800px) {
    width: 50%;
    padding: 5px;
}
`
export default function FormElements() {
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Add New Driver</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Forms
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Add New Driver
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Row>
        <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
          <Card>
            <Card.Header>
              <h4 className="card-title">Driver</h4>
            </Card.Header>
            <Card.Body>
            <RegForm>
                <FormInput>
                    <label>Enter Driver’s Name</label>
                    <InputBox type="text" placeholder="Enter Driver name"/>
                </FormInput>
                <FormInput>
                    <label htmlFor="file" style={{cursor: "pointer"}}>Attach Vehicle Partculars (pdf): <span><FileUploadOutlined /></span></label> <br />
                    <div>File url Here</div>
                    <InputBox type="file" id="file" style={{display: "none"}} />
                </FormInput>
                <FormInput>
                    <label>What is the car number? *</label>
                    <InputBox type="text" placeholder="Car Number"/>
                </FormInput>
                <FormInput>
                    <label>Enter Driving Licence Number</label>
                    <InputBox type="text" placeholder="Enter Driving Licence Numberr"/>
                </FormInput>
                <FormInput>
                    <label>Enter Telephone number</label>
                    <InputBox type="text" placeholder="Enter Telephone number"/>
                </FormInput>
                <FormInput style={{marginTop: "30px"}}>
                <SubmitButton><Add /> Submit & Save</SubmitButton>
                </FormInput>
              </RegForm>
            </Card.Body>
          </Card>
        </div>
      </Row>   
    </div>
  );
}
