// import React from "react";
import React, { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import {Row,Col, Card, Form} from "react-bootstrap"
import * as custompagesswitcherdata from "../../../data/Switcher/Custompagesswitcherdata"
import endpoint from "../../../context/endpoint";
import ForgotRequest from "./ForgotRequest";
import {  toast } from 'react-toastify';
// import { forgotPassword, useAuthState,useAuthDispatch  } from '../../../context'
// import { loginUser, useAuthState, useAuthDispatch } from '../../../context/index'

export default function ForgotPassword() {
  
  const [email, setEmail] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
   const [errorReport, setErrorReport] = useState('')
 const navigate=useNavigate()

  const handleSendEmail = async (e) => {
    e.preventDefault()
      if(email===''){
        setErrorReport("email field must not be empty")
      }
     setLoading(true)
      endpoint.post("/auth/forgot-password",{ email:email})
      .then((response) => {
        setSuccess(true)
        navigate('/forgot-password-request-success', {state:{email:email}});
      })
      .catch((error) => {
        // console.error(`Error: ${error}`);
        setError(true);
        // setErrorReport(error.response.data.message)
        setLoading(false)
        errorAlert(error.response.data.message)
    });
}
const errorAlert = (message) => {
  // window.alert("Invalid Credentials");
  toast.error(message, {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,

  });
}

  
  return (
    <div className="login-img">
      <div className="page">
        <div className="dropdown float-end custom-layout">
          
        </div>
        <div className="">
          
          <div className="container-login100">
         
            <Row>
              <Col className=" col-login mx-auto">
                <Form className="card shadow-none" method="post">
               
                  <Card.Body>
                  <div className="text-center">
              <img
                src={require("../../../assets/images/brand/njc-logo.png")}
                className="header-brand-img"
                alt=""
              />
            </div>
                    <div className="text-center">
                      <span className="login100-form-title">
                        Forgot Password
                      </span>
                      <p className="text-muted">
                        Enter the email address registered on your account
                      </p>
                    </div>
                    {/* {
                    error? <p className="tag tag-red">{errorReport}</p> : null
                   
                } */}
                
                   <div>
                    <div className="wrap-input100 validate-input">
                    <input
                      className="input100"
                      type="text"
                      placeholder="Email"
                      value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         disabled={loading}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-email" aria-hidden="true"></i>
                    </span>
                  </div>
                      
                  <div className="container-login100-form-btn">
                    <button  className={loading ? "login100-form-btn btn-primary btn-loading": "login100-form-btn btn-primary"} 
                     onClick={handleSendEmail}
                    disabled={loading}
                    style={{border: '0', outline: 'none'}}
                    >
                      {loading ? "": "Submit"}
                    </button>
                  </div>
                      <div className="text-center mt-4">
                        <p className="text-dark mb-0">
                          {/* Forgot It? */}
                          <Link className="text-primary ms-1" to={`${process.env.PUBLIC_URL}/login/`}>
                             Back to Login
                          </Link>
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                  {/* <Card.Footer>
                    <div className="d-flex justify-content-center my-3">
                      <Link to="#" className="social-login  text-center me-4">
                        <i className="fa fa-google"></i>
                      </Link>
                      <Link to="#" className="social-login  text-center me-4">
                        <i className="fa fa-facebook"></i>
                      </Link>
                      <Link to="#" className="social-login  text-center">
                        <i className="fa fa-twitter"></i>
                      </Link>
                    </div>
                  </Card.Footer> */}
                </Form>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
