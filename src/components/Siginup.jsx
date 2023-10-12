import React, { useState } from 'react';
import '../style/forgetpassword.css';
import Logo from '../Assets/Ukimmigration-logo.png';
import Sideimg from '../Assets/side-img-forget.png';
import { Link } from 'react-router-dom';
import "../style/signup.css"
import googlepic from "../Assets/google-pic.svg"
import robort from "../Assets/recaptcha-img.svg"
import { useNavigate } from 'react-router-dom'; 
import { Formik, Form, Field, ErrorMessage } from "formik";
import signupSchema from '../utils/ValidationSchema';
import { useSignupUserMutation } from '../services/api/userApi';
import { auth } from "../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getNotificationPermission, onCaptchaVerify, onSendOTP } from '../utils';
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import * as cg from "react-icons"
import { toastError, toastSuccess } from "./Toast";
import { useMemo } from 'react';
import { useEffect } from 'react';
import Loader from './Loader';
import { useDispatch } from 'react-redux';
import { setUserData } from '../services/redux/userSlice';

const Signup = () => {
  const [signupUser, result] = useSignupUserMutation();
  const { isLoading, isSuccess, error, isError } = result;
  const [phone, setPhone] = useState("");
  const [fcmToken, setFcmToken] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    referringAgent: "",
  };

  useMemo(() => {
    if (error) {
      console.log(error?.data?.message);
      toastError(error?.data?.message);
    }
  }, [error]);

  useEffect(() => {
    onCaptchaVerify();
  }, []);

  const handleSubmit = async (values) => {
    setPhone(values.contact);

    // Signup User
    // const { data } = await signupUser({
    //   name: values.name,
    //   email: values.email,
    //   contact: values.contact,
    //   password: values.password,
    //   confirmPassword: values.confirmPassword,
    //   referringAgent: values.referringAgent,
    //   fcmToken: fcmToken,
    // });
    // console.log(data);

    // Only send OTP if the captcha is verified
    const result = await onSendOTP(values.contact);
    console.log(result);
    window.confirmationResult= result;
    navigate("/otp");
    if (!result) {
      toastError("Error Sending OTP. Try again in few seconds");
    }

    // if (data?.success) {
      // dispatch(setUserData(data?.user));
    //   navigate("/otp");
    // }
  };

  const handleSigninWithGoogle = useGoogleLogin({
    onSuccess: async (res) => {
      const { data } = await signupUser({
        googleAccessToken: res.access_token,
        fcmToken: fcmToken,
      });
      console.log(data);
      if (data.success) {
        setTimeout(() => {
          navigate("/otpmail");
        }, 1500);
      }
    },
    onError: (error) => toastError("Login Failed", error),
  });

  useEffect(() => {
    const getTokenValue = async () => {
      const fcmToken = await getNotificationPermission();
      if (fcmToken) {
        setFcmToken(fcmToken);
      }
    };

    getTokenValue();
  }, []);

  console.log("FCM Token", fcmToken);


  return (
    <div className="Container-forgetpassword">
      <div className="Forgetpassword-sub">
        <div className="left-side-signup">
          <img src={Logo} alt="" className="Logo-img-singup" />
          <p className="Verfication-text-signup">Sign Up</p>

          <div className="login-form-2">
            <Formik
              initialValues={initialValues}
              validationSchema={signupSchema}
              onSubmit={handleSubmit}
            >
              {({ errors }) => (
                <Form>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    className={errors.name && "redborder"}
                  />
                  {/* <ErrorMessage name="name" component="div" className="error" /> */}

                  <Field
                    type="text"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    className={errors.email && "redborder"}
                  />
                  {/* <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  /> */}

                  <Field
                    type="text"
                    id="contact"
                    name="contact"
                    placeholder="Contact"
                    className={errors.contact && "redborder"}
                  />
                  {/* <ErrorMessage
                    name="contact"
                    component="div"
                    className="error"
                  /> */}

                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className={errors.password && "redborder"}
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error"
                  />

                  <Field
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    className={errors.confirmPassword && "redborder"}
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="error"
                  />

                  <Field
                    placeholder="Referring Agent"
                    type="text"
                    id="referringAgent"
                    name="referringAgent"
                    className={errors.referringAgent && "redborder"}
                  />
                  <ErrorMessage
                    name="referringAgent"
                    component="div"
                    className="error"
                  />

                  <div
                    id="recaptcha-container"
                    style={{
                      marginLeft: "3.3rem",
                      marginTop: "2rem",
                      borderRadius: "10px",
                    }}
                  ></div>

                  <button disabled={isLoading} type="submit">{isLoading ? <Loader width={25} color={'#fff'} /> : "Sign Up"}</button>
                </Form>
              )}
            </Formik>

            <p className="Or-gap-2">Or</p>
            <div
              className="sign-in-with-google-2"
              style={{ cursor: "pointer" }}
              onClick={handleSigninWithGoogle}
            >
              <img
                src={googlepic}
                style={{ position: "relative", left: "26px" }}
              />
              <p className="sign-in-with-goolge-text-2">SIGN UP WITH GOOGLE</p>
            </div>
          </div>
        </div>

        <div className="right-side-forget-password">
          <img src={Sideimg} alt="" className="side-img-forget" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
