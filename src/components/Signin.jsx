import React, { useState,useMemo, useRef } from 'react';
import '../style/forgetpassword.css';
import Logo from '../Assets/Ukimmigration-logo.png';
import Sideimg from '../Assets/side-img-forget.png';
import { Link } from 'react-router-dom';
import "../style/signin.css"
import googlepic from "../Assets/google-pic.svg"
import robort from "../Assets/recaptcha-img.svg"
import { useLoginpUserMutation, useVerifyCaptchaMutation } from "../services/api/userApi";
import { toastError } from "./Toast";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate,NavLink } from 'react-router-dom'; 
import { onCaptchaVerify } from '../utils';
import { useEffect } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth, messaging } from "../firebase";
import { useDispatch } from 'react-redux';
import { setUserData } from '../services/redux/userSlice';
import Loader from './Loader';


import ReCAPTCHA from "react-google-recaptcha";
import { Fade } from 'react-awesome-reveal';

const Signin = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loginUser, result] = useLoginpUserMutation();
const { isLoading, isSuccess, error } = result;
const navigate = useNavigate();
const [captchaValue, setCaptchaValue] = useState();
const [recaptchaToken, setRecaptchaToken] = useState("");
const [verifyCaptcha, res] = useVerifyCaptchaMutation();
  const { isLoading: isLoadingCaptcha } = res;
const dispatch = useDispatch();
const recaptchaRef = useRef();

useMemo(() => {
  if (isSuccess) {
    navigate("/companyscreen");
  }
}, [isSuccess]);

useMemo(() => {
  if (error) {
    toastError(error?.data?.message);
    setEmail("");
    setPassword("");
    setRecaptchaToken("")
    recaptchaRef.current.reset();
  }
}, [error]);

const handleSend = async () => {
  if (email === "") {
    toastError("Please enter email address");
    return;
  }

  if (password === "") {
    toastError("Please enter password");
    return;
  }

  if (!recaptchaToken) {
    toastError("Please Fill out Captcha.");
    return;
  }

  const { data: captchaResult } = await verifyCaptcha({
    recaptchaToken: recaptchaToken,
  });
  console.log(captchaResult);

  if (!captchaResult.success) {
    toastError("Invalid Captcha");
    return;
  }

  const {data, error} = await loginUser({ email: email, password: password });
  console.log(data);
  console.log(error);
  dispatch(setUserData(data?.user));
  console.log("data signin",data);
  navigate(data?.user?.isGroupClient ? "/group/phase1" : data.redirect);

};

const handleSigninWithGoogle = useGoogleLogin({
  onSuccess: async (res) => {
    const { data } = await loginUser({
      googleAccessToken: res.access_token,
    });
    console.log(data);
    if (data.success) {
        setTimeout(() => {
          navigate(data?.user?.isGroupClient ? "/group/phase1" : data.redirect);
        }, 900);
      
    }
  },
  onError: (error) => toastError("Login Failed", error),
});

function onChange(value) {
  console.log("Captcha value:", value);
  setRecaptchaToken(value);
}

// const handleCaptchaRes = async()=>{
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       auth,
//       "recaptcha-container",
//       {
//         size: "normal",
//         callback: async (response) => {
//           const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId);
//           setCaptchaValue(recaptchaResponse);
//         },
//         "expired-callback": () => {
//           console.log("Caprcha expired");
//           toastError("Captcha Expired.");
//           grecaptcha.reset(window.recaptchaWidgetId);
//         },
//       }
//     );
//     recaptchaVerifier.render().then(async (widgetId) => {
//       window.recaptchaWidgetId = widgetId;
//     });
  
// }

// useEffect(() => {
//   handleCaptchaRes();
// }, []);

  return (
    <div className="sinin-container">
      <div className="Container-forgetpassword">
        <div className="Forgetpassword-sub">
          <div className="left-side-signin">
            <Fade direction="up" duration={500}>
              <img src={Logo} alt="" className="Logo-img-signin" />
            </Fade>
            <Fade direction="left" duration={500}>
              <p className="Verfication-text-signin">Welcome Back</p>
            </Fade>
            <div className="login-form">
              <form>
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_SITE_KEY}
                  onChange={onChange}
                  style={{ marginTop: "2.5rem", marginLeft: "3.5rem" }}
                />

                <button
                  disabled={isLoading}
                  type="button"
                  onClick={handleSend}
                  style={
                    isLoading || isLoadingCaptcha
                      ? {
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          opacity: 0.55,
                          pointerEvents: "none",
                          userSelect: "none",
                        }
                      : {
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }
                  }
                >
                  {isLoading ? (
                    <Loader width={25} color={"#fff"} />
                  ) : isLoadingCaptcha ? (
                    <Loader />
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
              <NavLink className="forget-password" to={"/forgetpassword"}>
                Forgot Password?{" "}
              </NavLink>
              <p className="question-1">Don’t have an account?</p>
              <NavLink className="sgn-up-heading" to="/Signup">
                SIGN UP
              </NavLink>
              <p className="Or-gap">Or</p>
              <div
                className="sign-in-with-google"
                onClick={handleSigninWithGoogle}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={googlepic}
                  style={{ position: "relative", left: "26px" }}
                />
                <p className="sign-in-with-goolge-text">SIGN IN WITH GOOGLE</p>
              </div>
            </div>
          </div>

          <div className="right-side-forget-password">
            <img src={Sideimg} alt="" className="side-img-forget" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
