import React, { useState, useEffect, useMemo } from "react";
import OTPGenerator from './OtpInput'
import { useNavigate } from 'react-router-dom';
import '../style/Otp.css'
import Sideimg from '../Assets/side-img-forget.png';
import { Link } from 'react-router-dom';
import Logo from '../Assets/Ukimmigration-logo.png';
import "../style/otpmail.css"
import { toastError, toastSuccess } from "./Toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";
import { formatTime } from "../utils";
import OTPInput, { ResendOTP } from "otp-input-react";
import Loader from "./Loader";
import { useSelector } from "react-redux";

const Otpemail = () => {

    const [otp, setOtp] = useState("");
    const [contact, setContact] = useState("");
    const [remainingTime, setRemainingTime] = useState(0);
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [isOtpError, setIsOtpError] = useState(false);
    const { user } = useSelector((state) => state.user);

    const onVerifyOtp = async () => {
      try {
        if (otp === "") {
          toastError("Please enter OTP");
          return;
        }

        setIsLoading2(true);

        const result = await window.confirmationResult.confirm(otp);
        console.log(result);
        setIsLoading2(false);
        setTimeout(() => {
          if (result.user) {
            window.recaptchaVerifier = null;
            navigate("/companyscreen");
          }
        }, 1700);
      } catch (error) {
        setIsLoading2(false);
        toastError("Something went wrong");
      }
    };

    const onCaptchaVerify = ()=>{
      window.recaptchaVerifier = null;
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container-verifyotp",
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
    }

    const handleSendOtp = async () => {
      if (contact === "") {
        toastError("Please enter your phone number");
        return;
      }

      console.log(contact);
      onCaptchaVerify();
      setOtp("");
      try {
     
        setIsLoading(true);
        const appVerifier = window.recaptchaVerifier;
        const formatPhone = "+" + contact;
        setRemainingTime(31);
        setIsClicked(true);
        const confirmationResult = await signInWithPhoneNumber(
          auth,
          formatPhone,
          appVerifier
        );
        console.log(confirmationResult);
        if (confirmationResult) {
          setIsLoading(false);
          toastSuccess("OTP Sent Successfully.");
          window.confirmationResult = confirmationResult;
        }
      } catch (error) {
        setIsOtpError(true);
        setIsLoading(false);
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
          <div className="left-side-otpmail">
            <div className="left-sub-side">
              <img src={Logo} alt="" className="Logo-img" />
              <p className="Verfication-text">Verification</p>
              <p className="Enter-text">
                Enter<span className="Email-address-text"> Mobile phone </span>
              </p>
              <p className="Email-heading">Contact*</p>
              <div className="mobileNumber">
                <PhoneInput
                  country={"us"}
                  inputClass="mobileInput"
                  placeholder="(485)-845-8542658"
                  containerClass={"inputContainer"}
                  containerStyle={{
                    height: "3.3rem",
                    marginLeft: "2.2rem",
                  }}
                  inputStyle={{
                    height: "3.3rem",
                    width: "27.4rem",
                    background: "#f7f7f7",
                  }}
                  value={contact}
                  onChange={(contact) => setContact(contact)}
                />
              </div>
              <div className="button-container">
                <button
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  disabled={remainingTime > 0}
                  onClick={handleSendOtp}
                  className="submit-email-btn-3"
                >
                  {isLoading ? <Loader /> : "Send OTP"}
                </button>
              </div>
            </div>
            <div className="otp-left-sub">
              <p className="question-3">
                Check <span className="Phone"> Mobile phone </span>- Enter 6
                digit OTP
              </p>

              {/* <OTPGenerator /> */}
              <div className="otp-container">
                <div className="otp-inputs">
                  <OTPInput
                    value={otp}
                    onChange={setOtp}
                    inputClassName="otp-input"
                    OTPLength={6}
                    otpType="number"
                  />
                </div>
              </div>
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

              {/* <div id="recaptcha-container"></div> */}

              <button
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                type="submit"
                className="ottp-button-2"
                onClick={onVerifyOtp}
              >
                {isLoading2 ? <Loader /> : "Submit"}
              </button>
            </div>
          </div>

          <div id="recaptcha-container-verifyotp"></div>
          <div id="recaptcha-container"></div>
          <div className="right-side-otp">
            <img src={Sideimg} alt="" className="side-img-forget" />
          </div>
        </div>
      </div>
    );
}

export default Otpemail