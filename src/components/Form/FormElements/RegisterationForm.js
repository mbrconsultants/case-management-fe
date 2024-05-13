import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import * as dashboard from "../../../data/dashboard/dashboard"
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
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from "@material-ui/pickers";

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
  const [myDate, setMyDate]= useState(new Date());
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Registration of Vehicles</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Forms
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Add Vehicle
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Row>
        <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
          <Card>
            <Card.Header>
              <h4 className="card-title">Register New Vehicle</h4>
            </Card.Header>
            <Card.Body>
              <RegForm>
                <FormInput>
                    <label>Enter Vehicle Type</label>
                    <SelectBox>
                      <option>Corolla</option>
                      <option>Corolla</option>
                      <option>Corolla</option>
                      <option>Corolla</option>
                    </SelectBox>
                </FormInput>
                <FormInput>
                    <label htmlFor="file" style={{cursor: "pointer"}}>Attach Vehicle Partculars (pdf): <span><FileUploadOutlined /></span></label> <br />
                    <div>File url Here</div>
                    <InputBox type="file" id="file" style={{display: "none"}} />
                </FormInput>
                <FormInput>
                    <label>Select Vehicle Type</label>
                    <SelectBox>
                      <option>Honda</option>
                      <option>Corolla</option>
                      <option>Corolla</option>
                      <option>Corolla</option>
                    </SelectBox>
                </FormInput>
                <FormInput>
                    <label>Enter Registration Number</label>
                    <InputBox type="text" placeholder="Registeration Number"/>
                </FormInput>
                <FormInput>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          disableToolbar
                          fullWidth
                          variant="inline"
                          format="MM/dd/yyyy"
                          margin="normal"
                          id="date-picker-inline"
                          label="What is the year of purchase"
                          value={myDate}
                          onChange={setMyDate}
                          KeyboardButtonProps = {{
                            'aria-label': 'change date',
                          }}
                        />
                  </MuiPickersUtilsProvider>
                </FormInput>
                <FormInput>
                    <label>Enter Amount</label>
                    <InputBox type="number" placeholder="Enter Amount"/>
                </FormInput>
                <SubmitButton><Add /> Submit & Save</SubmitButton>
              </RegForm>
            </Card.Body>
          </Card>
        </div>
      </Row>   
      <Row>
        <Col sm={12} className="col-12">
          <Card>
            <Card.Header>
              <h3 className="card-title mb-0">Vehicle Data</h3>
            </Card.Header>
            <Card.Body>
              <div className="salesdatatable">
                <div className="table-responsive">
                  <dashboard.Productsales />
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
