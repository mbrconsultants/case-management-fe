import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "react-bootstrap";
import endpoint from '../../../context/endpoint'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PasswordReset() {
  const navigate = useNavigate()
  const params = useParams()
  const token = params.id;
  const [loginDetails, setLoginDetails] = useState({password:"", confirm_password:"", email:"", token: token})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
      endpoint.post(`/auth/reset-password`, loginDetails)
        .then((response) => {
          successAlert();
          navigate('/login');

        })
        .catch((error) => {
          // console.error(`Error: ${error}`);
          errorAlert(error.response.data.message)
          //   setError(error)
          setLoading(false)
        });

  }

  const successAlert = () => {
    // window.alert("Invalid Credentials");
    toast.success("Password Reset successful. Please login with your new password", {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,

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
        <div className="">
          <div className="container-login100">
            <div className="wrap-login100 p-0">
              <Card.Body>
                <div className="col col-login mx-auto">
                  <div className="text-center">
                    <img
                      src={require("../../../assets/images/brand/njc-logo.png")}
                      className="header-brand-img-2"
                      alt=""
                    />
                  </div>
                </div>
                <form className="login100-form validate-form" onSubmit={handleSubmit} >
                  <div className="row-2"></div>
                  <span className="login100-form-title">Reset Password</span>
                  {/* {
                    error? <p className="tag tag-red">{error}</p> : null
                } */}
                  <div className="wrap-input100 validate-input">
                    <input
                      className="input100"
                      type="email"
                      placeholder="Email"
                      value={loginDetails.email}
                      onChange={(e) => setLoginDetails({...loginDetails, email:e.target.value})}

                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="fa fa-at" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="wrap-input100 validate-input">
                    <input
                      className="input100"
                      type="password"
                      placeholder="Password"
                      value={loginDetails.password}
                      onChange={(e) => setLoginDetails({...loginDetails, password:e.target.value})}

                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-lock" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="wrap-input100 validate-input">
                    <input
                      className="input100"
                      type="password"
                      placeholder="confirm password"
                      value={loginDetails.confirm_password}
                      onChange={(e) => setLoginDetails({...loginDetails, confirm_password:e.target.value})}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-lock" aria-hidden="true"></i>
                    </span>
                  </div>

                  <div className="container-login100-form-btn">
                    <button className={loading ? "login100-form-btn btn-primary btn-loading" : "login100-form-btn btn-primary"}
                      // onClick={handleSubmit}
                      disabled={loading}
                      style={{ border: '0', outline: 'none' }}
                    >
                      {loading ? "" : "Submit"}
                    </button>
                  </div>

                </form>
              </Card.Body>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
