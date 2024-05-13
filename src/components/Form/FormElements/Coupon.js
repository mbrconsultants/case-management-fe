import React, { useState } from "react";
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

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Add, FileUploadOutlined } from "@mui/icons-material";
import styled from "styled-components";
import FileUpload from "./FileUpload";
import FileList from "./FileList";

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
  
  const [files, setFiles] = useState([])

  const removeFile = (filename) => {
    setFiles(files.filter(file => file.name !== filename))
  }

  console.log(files)

  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Renewal Of Coupon</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Forms
            </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item active breadcrumds"
                aria-current="page"
              >
              Register Coupon
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Row>
        <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
          <Card>
            <Card.Header>
              <h4 className="card-title">Register Coupon</h4>
            </Card.Header>
            <Card.Body>
            <RegForm>
                <FormInput>
                    <label>Enter Vehicle ID</label>
                    <InputBox type="text" placeholder="Enter Vehicle ID"/>
                </FormInput>
                <FormInput>
                <FileUpload files={files} setFiles={setFiles} removeFile={removeFile} />
                <FileList files={files} removeFile={removeFile} />
                </FormInput>
                {/* <FormInput>
                    <label htmlFor="file" style={{cursor: "pointer"}}>Attach Vehicle Partculars (pdf): <span><FileUploadOutlined /></span></label> <br />
                    <div>File url Here</div>
                    <InputBox type="file" id="file" style={{display: "none"}} onChange={handleOnChange} />
                </FormInput> */}
                <FormInput>
                    <label>Name of the filling station</label>
                    <InputBox type="text" placeholder="Car Number"/>
                </FormInput>
                <FormInput>
                    <label>Enter Driver’s ID</label>
                    <InputBox type="text" placeholder="Enter Driver’s ID"/>
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
                          label="Date fueled"
                          value={myDate}
                          onChange={setMyDate}
                          KeyboardButtonProps = {{
                            'aria-label': 'change date',
                          }}
                        />
                  </MuiPickersUtilsProvider>
           </FormInput>
                <FormInput>
                    <label>How many Liters of fuel</label>
                    <InputBox type="number" placeholder="How many Liters of fuel"/>
                </FormInput>
                <FormInput>
                    <label>Total Amount of Fuel</label>
                    <InputBox type="text" placeholder="Total Amount of Fuel"/>
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
