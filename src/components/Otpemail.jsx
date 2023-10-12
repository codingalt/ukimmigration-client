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
import { formatTime, onCaptchaVerify2 } from "../utils";
import OTPInput, { ResendOTP } from "otp-input-react";

const Otpemail = () => {

    const [otp, setOtp] = useState("");
    const [contact, setContact] = useState("");
    const [remainingTime, setRemainingTime] = useState(0);
    const navigate = useNavigate();
    const [isClicked, setIsClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [isOtpError, setIsOtpError] = useState(false);

    const onVerifyOtp = async () => {
      try {
        if (otp === "") {
          toastError("Please enter OTP");
          return;
        }

        setIsLoading2(true);

        const result = await window.confirmationResult.confirm(otp);
        console.log(result);
        toastSuccess("OTP Sent Successfully");
        setIsLoading2(false);
        setTimeout(() => {
          if (result.user) {
            navigate("/home");
          }
        }, 1700);
      } catch (error) {
        setIsLoading2(false);
        toastError("Something went wrong");
      }
    };

    const onCaptchaVerify = async () => {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              handleSendOtp();
            },
            "expired-callback": () => {
              toastError("Captcha Expired");
            },
          }
        );
      }
    };

    const handleSendOtp = async () => {
      if (contact === "") {
        toastError("Please enter your phone number");
        return;
      }

      console.log(contact);

      try {
        // await onCaptchaVerify();
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container2",
            {
              size: "invisible",
              callback: async(response) => {
                console.log(response);
                handleSendOtp();
      
              },
              "expired-callback": () => {
                toastError("Captcha Expired");
              },
            }
          );
        }
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
        window.recaptchaVerifier.recaptcha.reset();
        window.recaptchaVerifier.clear();
        console.log(error);
      }
    };

    useMemo(() => {
      if (isOtpError) {
        toastError("Error sending Otp, try again in few seconds");
      }
    }, [isOtpError]);

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
                  disabled={remainingTime > 0}
                  onClick={handleSendOtp}
                  className="submit-email-btn-3"
                >
                  Request OTP {isLoading && "..."}
                </button>
              </div>
            </div>
            <div className="otp-left-sub">
              <p className="question-3">
                Check <span className="Phone"> Mobile phone </span>- Enter 6
                digit OTP
              </p>

              <div id="recaptcha-container"></div>

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

              <div id="recaptcha-container2"></div>

              <button
                type="submit"
                className="ottp-button-2"
                onClick={onVerifyOtp}
              >
                Submit {isLoading2 && "..."}
              </button>
            </div>
          </div>

          <div className="right-side-otp">
            <img src={Sideimg} alt="" className="side-img-forget" />
          </div>
        </div>
      </div>
    );
}

export default Otpemail