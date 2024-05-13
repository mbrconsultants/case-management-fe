import React, { useState } from "react";
import {
  Breadcrumb,
  Card,
  Row,

} from "react-bootstrap";
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
  const [prevDate, setPrevDate]= useState(new Date());
  const [insuranceDate, setInsuranceDate]= useState(new Date());
  const [expectedDate, setExpectedDate]= useState(new Date());

  // const handleDateChange = (e) =>{
  //   setMyDate(e.target.value)
  // }
  return (
    <div>
      <div className="page-header">
        <div>
          <h1 className="page-title">Renewal Of Insurance</h1>
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item className="breadcrumb-item" href="#">
              Forms
            </Breadcrumb.Item>
            <Breadcrumb.Item
              className="breadcrumb-item active breadcrumds"
              aria-current="page"
            >
              Register Insurance
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <Row>
        <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
          <Card>
            <Card.Header>
              <h4 className="card-title">Register Insurance</h4>
            </Card.Header>
            <Card.Body>
            <RegForm>
                <FormInput>
                    <label>Enter the vehicle ID</label>
                    <InputBox type="text" placeholder="Vehicle ID" />

                </FormInput>
                <FormInput>
                    <label htmlFor="file" style={{cursor: "pointer"}}>Attach Vehicle Partculars (pdf): <span><FileUploadOutlined /></span></label> <br />
                    <div>File url Here</div>
                    <InputBox type="file" id="file" style={{display: "none"}} />
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
                          label="Enter the Previous Date"
                          value={prevDate}
                          onChange={setPrevDate}
                          KeyboardButtonProps = {{
                            'aria-label': 'change date',
                          }}
                        />
                  </MuiPickersUtilsProvider>
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
                          label="Enter the Date of Insurance"
                          value={insuranceDate}
                          onChange={setInsuranceDate}
                          KeyboardButtonProps = {{
                            'aria-label': 'change date',
                          }}
                        />
                  </MuiPickersUtilsProvider>
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
                          label="Enter Expected Date"
                          value={expectedDate}
                          onChange={setExpectedDate}
                          KeyboardButtonProps = {{
                            'aria-label': 'change date',
                          }}
                        />
                  </MuiPickersUtilsProvider>
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
