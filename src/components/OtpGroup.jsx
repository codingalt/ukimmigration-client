import React, { useEffect, useMemo } from "react";
import OTPGenerator from "./OtpInput";
import { useNavigate, useParams } from "react-router-dom";
import "../style/Otp.css";
import Sideimg from "../Assets/side-img-forget.png";
import OTPInput, { ResendOTP } from "otp-input-react";
import { useState } from "react";
import { toastError, toastSuccess } from "./Toast";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { formatTime } from "../utils";

const OtpGroup = () => {
    const {applicationId} = useParams();
    console.log(applicationId);

  return (
    <div className="Container-forgetpassword">
      <div className="Forgetpassword-sub">
        <div className="left-side-otp">
          <p className="forget-password-3">
            Check{" "}
            <a
              className="email"
              href="https://mail.google.com/mail/"
              target="_blank"
            >
              Email{" "}
            </a>
            - Click on link to verify
          </p>

        </div>

        <div className="right-side-otp">
          <img src={Sideimg} alt="" className="side-img-forget" />
        </div>
      </div>
    </div>
  );
};

export default OtpGroup;
