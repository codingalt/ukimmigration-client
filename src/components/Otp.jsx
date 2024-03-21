import React, { useEffect, useMemo } from 'react'
import OTPGenerator from './OtpInput'
import { useNavigate } from 'react-router-dom'; 
import '../style/Otp.css'
import Sideimg from '../Assets/side-img-forget.png';
import OTPInput, { ResendOTP } from "otp-input-react";
import { useState } from 'react';
import { toastError, toastSuccess } from './Toast';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { formatTime } from "../utils";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
    const [remainingTime, setRemainingTime] = useState(60);
    const [isLoading2, setIsLoading2] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  function formatFirebaseError(error) {
  const errorMessages = {
    "Firebase: Error (auth/code-expired).":
      "The authentication code has expired. Please request a new one.",
    "Firebase: Error (auth/invalid-verification-code).":
      "The verification code is invalid. Please double-check and try again.",
  };

  if (errorMessages[error]) {
    return errorMessages[error];
  } else {
    return 'An error occurred. Please try again later.';
  }
}

  const onVerifyOtp = async () => {
    setLoading(true);
    try {
        const result = await window?.confirmationResult?.confirm(otp);
        if (result.user) {
            console.log(result);
            setLoading(false);
            toastSuccess("OTP Verification completed. Complete your Email verification and then try login.");
            navigate("/");
        }
        
    } catch (error) {
      const errorMessage = formatFirebaseError(error.message);
        toastError(errorMessage);
        console.log(errorMessage);
        setLoading(false);
    }
  };

  const onCaptchaVerify = () => {
    window.recaptchaVerifier = null;
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container-verifyotp2",
        {
          size: "invisible",
          callback: async (response) => {
            handleSendOtp();
          },
          "expired-callback": () => {
            console.log("Caprcha expired");
          },
        }
      );
    }
  };

  const handleSendOtp = async () => {

    onCaptchaVerify();
    setOtp("");
    try {
      setLoading(true);
      const appVerifier = window.recaptchaVerifier;
      const formatPhone = "+" + user?.contact;
      console.log(formatPhone);
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formatPhone,
        appVerifier
        );
        console.log(confirmationResult);
        if (confirmationResult) {
        setRemainingTime(60);
        setLoading(false);
        toastSuccess("OTP Sent Successfully.");
        window.confirmationResult = confirmationResult;
      }
    } catch (error) {
      setLoading(false);
      setRemainingTime(60);
      console.log(error);
    }
  };


  useEffect(() => {
    let timer;
    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [remainingTime]);

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
            <p className="question-3">
              Check <span className="Phone"> Mobile phone </span>- Enter 6 digit
              OTP
            </p>
            {/* <p className="sgn-up-heading-2">SIGN UP</p>  */}

            {/* <OTPGenerator /> */}
            <div className="otp-container">
              <div className="otp-inputs">
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  autoFocus
                  inputClassName="otp-input"
                  OTPLength={6}
                  otpType="number"
                />
              </div>
            </div>

            <div id="recaptcha-container-verifyotp2"></div>
            <span
              style={{ textAlign: "center", left: "125px" }}
              className="otp-not-recevied"
            >
              {formatTime(remainingTime)}
            </span>
            <p className="otp-not-recevied">
              OTP Not Received?{" "}
              <span
                className="resend"
                onClick={handleSendOtp}
                style={
                  remainingTime > 0
                    ? {
                        pointerEvents: "none",
                        cursor: "not-allowed",
                      }
                    : {
                        pointerEvents: "auto",
                        cursor: "pointer",
                      }
                }
              >
                Resend
              </span>
            </p>

            <button
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              type="submit"
              className="ottp-button"
              onClick={onVerifyOtp}
            >
              {loading ? <Loader /> : "Submit"}
            </button>
          </div>

          <div className="right-side-otp">
            <img src={Sideimg} alt="" className="side-img-forget" />
          </div>
        </div>
      </div>
    );
}

export default Otp