import React from "react";
import { Link } from "react-router-dom";
import * as custompagesswitcherdata from "../../../data/Switcher/Custompagesswitcherdata"
import {useLocation} from 'react-router-dom';



export default function PasswordRequest() {
    const location = useLocation();

  return (
    <div className="error-bg">
      <div className="page">
       
        <div className="page-content error-page error2" onClick={()=>custompagesswitcherdata.Swichermainrightremove()}>
          <div className="container text-center">
            <div className="error-template">
            <div className="col col-login mx-auto">
                        <div className="text-center">
                          <img
                            src={require("../../../assets/images/brand/success2.png")}
                            className="header-brand-img-2"
                            alt=""
                          />
                        </div>
                    </div>

              <h5 className="display-6 text-dark mb-2">
                Success    </h5>
              <h5 className="error-details text-dark">
               A password reset link has been sent to the email <span style={{   color: "#0a7e51"   }}>{location.state.email}</span>. Login and follow the link.
              </h5>
              <div className="text-center">
                <Link
                  to={`${process.env.PUBLIC_URL}/login`}
                  className="btn btn-primary mt-5 mb-5"
                >
                  
                  <i className="fa fa-long-arrow-left"></i> Back to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
