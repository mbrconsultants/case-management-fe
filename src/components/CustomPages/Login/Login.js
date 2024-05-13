import React, { useContext, useRef, useState } from "react";
import { Link} from "react-router-dom";
import { Card } from "react-bootstrap";
import * as custompagesswitcherdata from "../../../data/Switcher/Custompagesswitcherdata"
import { Context } from "../../../context/Context";
import endpoint from '../../../context/endpoint'
import {  toast } from 'react-toastify';

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { dispatch, isFetching } = useContext(Context)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')


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

  const handleSbmit = async (e) =>{
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    setLoading(true)
    try {
      const res = await endpoint.post("/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })

      const modules = await endpoint.get(`/assignsubmodule/list/permission/user/${res.data.data.user.id}`)
      // console.log(modules.data.data)
      localStorage.setItem("modules", JSON.stringify(modules.data.data))

      delete res.data.data.user.password
      // console.log("login response", res.data.data)
      res.data.data && setLoading(false);
      res.data.data && dispatch({type: "LOGIN_SUCCESS", payload: res.data.data});
      res.data.data && window.location.replace('/')
    } catch (error) {
        dispatch({type: "LOGIN_FAILURE" });
        setLoading(false)
        // console.log(error.response.data)
        // setError(error.response.data.message)
        errorAlert(error.response.data.message)

       }
    }

 return (
    <div className="login-img" style={{backgroundImage:`url(/img/njcBackground.png)`, backgroundRepeat:`no-repeat`, backgroundSize:`cover`}}>
      <div className="page">

             <div className="container-login100" style={{opacity:`0.8`}}>
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
                <form className="login100-form validate-form"onSubmit={handleSbmit} >
                  <div className="row-2"></div>
                  <span className="login100-form-title">Login</span>
                  {/* {
                    error? <p className="tag tag-red">{error}</p> : null

                } */}
                  <div className="wrap-input100 validate-input">
                    <input
                      className="input100"
                      type="text"
                      placeholder="Email"
                      ref={emailRef}
                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-email" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="wrap-input100 validate-input">
                    <input
                      className="input100"
                      type="password"
                      placeholder="Password"
                      ref={passwordRef}

                    />
                    <span className="focus-input100"></span>
                    <span className="symbol-input100">
                      <i className="zmdi zmdi-lock" aria-hidden="true"></i>
                    </span>
                  </div>


                   <div className="container-login100-form-btn">
                    <button  className={loading ? "login100-form-btn btn-primary btn-loading": "login100-form-btn btn-primary"}
                    // onClick={handleSubmit}
                    disabled={isFetching}
                    style={{border: '0', outline: 'none'}}
                    >
                      {loading ? "": "Login"}
                    </button>
                  </div>
                   {/* text-end aligns it to the right */}
                   <div className="text-center pt-1">
                    <p className="mb-0">

                      <Link
                        to={`${process.env.PUBLIC_URL}/forgotPassword/`}
                        className="text-primary ms-1"
                      >
                        Forgot Password?
                      </Link>
                    </p>
                  </div>
                  {/* <div className="text-center pt-3">
                    <p className="text-dark mb-0">
                      Not a member?
                      <Link
                         to={`${process.env.PUBLIC_URL}/register/`}

                        className="text-primary ms-1"
                      >
                        Create an Account
                      </Link>
                    </p>
                  </div> */}

                </form>
              </Card.Body>
            </div>
          </div>

      </div>
    </div>
  );
}
