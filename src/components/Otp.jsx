import React from 'react'
import OTPGenerator from './OtpInput'
import { useNavigate } from 'react-router-dom'; 
import '../style/Otp.css'
import Sideimg from '../Assets/side-img-forget.png';
import OTPInput, { ResendOTP } from "otp-input-react";
import { useState } from 'react';
import { toastError, toastSuccess } from './Toast';
import Loader from './Loader';

const Otp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onVerifyOtp = async () => {
    setLoading(true);
    try {

        const result = await window.confirmationResult.confirm(otp);
        if (result.user) {
            console.log(result);
            setLoading(false);
            toastSuccess("OTP Verified.");
            navigate("/companyscreen");
        }
        
    } catch (error) {
        toastError("Something went wrong. please try again");
        console.log(error);
        setLoading(false);
    }
    
  };
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

            <p className="otp-not-recevied">
              OTP Not Received? <span style={{cursor:"pointer"}} className="resend">Resend</span>
            </p>

            <button style={{display:"flex", justifyContent:"center",alignItems:"center"}} type="submit" className="ottp-button" onClick={onVerifyOtp}>
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