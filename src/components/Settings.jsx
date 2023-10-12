import React, { useEffect, useState, useRef, useMemo } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector } from "react-redux";
import {
  useChangePasswordMutation,
  useUpdateUserDataMutation,
} from "../services/api/userApi";
import { toastError, toastSuccess } from "./Toast";
import { changePasswordSchema } from "../utils/ValidationSchema";
import "../style/forgetpassword.css";
import "../style/Phase1.css";
import Logo2 from "../Assets/Ukimmigration-logo.png";
import bellicon2 from "../Assets/bell-icon-svg.svg";
import profileimg from "../Assets/profile-img-svg.svg";
import dropdownicon from "../Assets/dropdown-icon-svg.svg";
import { Link, NavLink } from "react-router-dom";
import NotificationBox from "./Notification";
import SettingBox from "./Settingbox";
import settingprofileimg from "../Assets/setting-profile.svg";
import "../style/setting.css";
import Loader from "./Loader";

const Settings = () => {
  const [isNotificationBoxVisible, setIsNotificationBoxVisible] =
    useState(false);
  const [isSettingsBoxVisible, setIsSettingsBoxVisible] = useState(false);
  const notificationRef = useRef(null);
  const settingsRef = useRef(null);
  const [imageName, setImageName] = useState();

  const { user } = useSelector((state) => state.user);
  const { name, email, contact, profilePic,googleId } = user && user;
  const [updateUserData, result] = useUpdateUserDataMutation();
  const { isLoading, isSuccess, error, isError } = result;
  const [changePassword, res] = useChangePasswordMutation();
  const {
    error: passError,
    isLoading: passLoading,
    isSuccess: passSuccess,
  } = res;
  const [image, setImage] = useState(null);
  const imageRef = useRef();

  useMemo(() => {
    if (error) {
      toastError(error?.data?.message);
    }
  }, [error]);

  useMemo(() => {
    if (passError) {
      toastError(passError?.data?.message);
    }
  }, [passError]);

  useMemo(() => {
    if (passSuccess) {
      toastSuccess("Password Updated.");
    }
  }, [passSuccess]);

  useMemo(() => {
    if (isSuccess) {
      toastSuccess("Profile Updated.");
    }
  }, [isSuccess]);

  const initialValues = {
    name,
    email,
    contact,
    profilePic,
  };

  const initialValuesPass = {
    password: "",
    confirmPassword: "",
    currentPassword: "",
  };

  const handleUpdateData = async (values) => {
    let formData = new FormData();
    formData.append("name", values.name);
    formData.append("email", values.email);
    formData.append("contact", values.contact);
    if (image) {
      formData.append("profilePic", values.profilePic);
    }
    try {
      const response = await updateUserData(formData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePassword = async (values) => {
    try {
      console.log(values);
      const response = await changePassword(values);
      console.log(response);
      if (response.success) {
        toastSuccess(response.message);
        initialValuesPass.password = "";
      }
    } catch (error) {
      console.error(error);
      toastError(error.message);
    }
  };

  const openImage = (e, setFieldValue) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0];
      console.log(img);
      setImageName(img?.name);
      setFieldValue("profilePic", img);
      setImage({
        image: URL.createObjectURL(img),
      });
    }
  };

  console.log(image);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        settingsRef.current &&
        !settingsRef.current.contains(event.target)
      ) {
        setIsNotificationBoxVisible(false);
        setIsSettingsBoxVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleNotificationBox = () => {
    setIsNotificationBoxVisible(!isNotificationBoxVisible);
  };

  const toggleSettingsBox = () => {
    setIsSettingsBoxVisible(!isSettingsBoxVisible);
  };

  return (
    <div className="Container-forgetpassword-phase1">
      <div className="Header-topbar">
        <div className="left-side-header">
          <img src={Logo2} alt="" />
        </div>
        <div className="right-side-header">
          <img
            src={bellicon2}
            alt=""
            className="bell-icon-notification"
            onClick={toggleNotificationBox}
          />
          <img src={profileimg} alt="" className="profile-img" />
          <p className="Jhon-profile-text">John Leo</p>
          <p className="Admin-text">Admin</p>
          <div ref={settingsRef}>
            <img
              src={dropdownicon}
              alt=""
              className="dropdown"
              onClick={toggleSettingsBox}
            />
          </div>
        </div>

        {/* Render NotificationBox conditionally */}
        {isNotificationBoxVisible && (
          <div ref={notificationRef}>
            <NotificationBox />
          </div>
        )}
        {isSettingsBoxVisible && <SettingBox />}
      </div>
      <div className="Forgetpassword-sub-2" style={{justifyContent:"flex-start"}}>
        <div className="left-side-forget-password-2">
          <p className="Required-data-text">Setting*</p>
          <NavLink to="/filldata">
            <button type="submit" className="back-button">
              back
            </button>
          </NavLink>

          <Formik initialValues={initialValues} onSubmit={handleUpdateData}>
            {({ setFieldValue }) => (
              <Form>
                <div
                  className="profile-picture-section"
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                  onClick={() => imageRef.current.click()}
                >
                  <input
                    ref={imageRef}
                    type="file"
                    id="profilePic"
                    name="profilePic"
                    accept="image/*"
                    onChange={(event) => openImage(event, setFieldValue)}
                    style={{ display: "none" }}
                  />
                  <img
                    src={
                       image
                        ? image.image 
                        : profilePic
                        ? `${import.meta.env.VITE_IMG_URI+profilePic}`
                        : settingprofileimg
                    }
                    alt=""
                    className="Profile-img"
                    style={{
                      width: "5rem",
                      borderRadius: "50%",
                      height: "5rem",
                    }}
                  />
                  <p className="uploading-text">
                    {imageName ? image && imageName : "Click to upload"}
                  </p>
                  <p className="maximum-size-text">Maximun image size 3MB</p>
                </div>
                <p className="add-case-lable">Name:</p>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="basic-inputs-add-case"
                />
                <ErrorMessage name="name" component="div" className="error" />

                <p className="add-case-lable">Email:</p>
                <Field
                  type="text"
                  id="email"
                  name="email"
                  className="basic-inputs-add-case"
                />
                <ErrorMessage name="email" component="div" className="error" />
                <p className="add-case-lable">Contact:</p>
                <Field
                  type="text"
                  id="contact"
                  name="contact"
                  className="basic-inputs-add-case"
                />
                <ErrorMessage
                  name="contact"
                  component="div"
                  className="error"
                />
                <button
                  type="submit"
                  className="sumbit-change-password"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {isLoading ? <Loader /> : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        </div>

        <div className="right-side-setting-2">
          <Formik
            validationSchema={changePasswordSchema}
            initialValues={initialValuesPass}
            onSubmit={handleChangePassword}
          >
            <Form>
              <p className="add-case-lable">Password:</p>
              <Field
                type="password"
                id="password"
                name="password"
                className="basic-inputs-add-case-2"
                placeholder="*******"
              />
              <ErrorMessage name="password" component="div" className="error" />
              <p className="add-case-lable">Confirm Password:</p>
              <Field
                type="password"
                id="confirmPassword-1"
                name="confirmPassword"
                className="basic-inputs-add-case-2"
                placeholder="*******"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />
              {!googleId && (
                <>
                  <p className="add-case-lable">Enter Your Last Password*:</p>
                  <Field
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    className="basic-inputs-add-case-2"
                    placeholder="*******"
                    required
                  />
                  <ErrorMessage
                    name="currentPassword"
                    component="div"
                    className="error"
                  />
                </>
              )}

              <button
                type="submit"
                className="Change-passowrd-cp"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign:"center"
                }}
              >
                {passLoading ? <Loader /> : "Change Password"}
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Settings;
