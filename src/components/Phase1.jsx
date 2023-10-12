import React, { useEffect, useState, useRef,useMemo } from 'react';
import "../style/forgetpassword.css"
import "../style/Phase1.css"
import Logo2 from '../Assets/Ukimmigration-logo.png';
import bellicon2 from "../Assets/bell-icon-svg.svg"
import profileimg from "../Assets/profile-img-svg.svg"
import dropdownicon from "../Assets/dropdown-icon-svg.svg"
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
import NotificationBox from './Notification';
import SettingBox from "./Settingbox"
import { usePostPhase1Mutation } from "../services/api/applicationApi";
import { toastError, toastSuccess } from "./Toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { phase1Schema } from "../utils/ValidationSchema";
import { useSelector } from "react-redux";
import Loader from './Loader';

const Phase1 = () => {

    const [isNotificationBoxVisible, setIsNotificationBoxVisible] = useState(false);
    const [isSettingsBoxVisible, setIsSettingsBoxVisible] = useState(false);
    const notificationRef = useRef(null);
    const settingsRef = useRef(null);
    const { user,applicationType } = useSelector((state) => state.user);
    const [permissionInCountryErr, setPermissionInCountryErr] = useState(true);
    const [speakEnglishErr, setSpeakEnglishErr] = useState(true);
    const [refusedVisaErr, setRefusedVisaErr] = useState(true);
    const [languagesArr,setLanguagesArr] = useState([]);
    const languageRef = useRef();
    const { _id } = user;
    const [postPhase1, result] = usePostPhase1Mutation();
    const { isLoading, isSuccess, error } = result;
    const navigate = useNavigate();

    const initialValues = {
      userId: _id,
      phase1: {
        applicationType: applicationType ? applicationType : localStorage.getItem("phase1-applicationType"),
        name: "",
        email: "",
        contact: "",
        birthDate: "",
        country: "",
        sameResidence: true,
        permissionInCountry: "",
        speakEnglish: true,
        proficiency: "",
        otherLanguagesSpeak: languagesArr,
        isRefusedVisaEntry: true,
        refusedVisaType: "",
        refusedVisaDate: "",
        refusedVisaReason: "",
        message: "",
      },
    };

    console.log(applicationType);

    useMemo(() => {
      if (error) {
        toastError(error?.data?.message);
      }
    }, [error]);

    useMemo(() => {
      if (isSuccess) {
        toastSuccess("Application Submitted.");
      }
    }, [isSuccess]);

    const handleSubmit = async(values,{resetForm}) => {
      console.log(values);
      await postPhase1(values);
      resetForm({
        values: initialValues, 
      });
      setTimeout(() => {
        navigate("/filldata")
      }, 1000);
    };

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
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleNotificationBox = () => {
        setIsNotificationBoxVisible(!isNotificationBoxVisible);
    };

    const toggleSettingsBox = () => {
        setIsSettingsBoxVisible(!isSettingsBoxVisible);
    };

    const handleOtherLanguages = (e,setFieldValue)=>{
        if(!languagesArr.includes(e.target.value)){
            setLanguagesArr([...languagesArr, e.target.value]);
            setFieldValue("phase1.otherLanguagesSpeak", [
              ...languagesArr,
              e.target.value,
            ]);
        }
    }


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

        <div className="Forgetpassword-sub-2">
          <Formik
            validationSchema={phase1Schema}
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, errors, resetForm }) => (
              <Form style={{ display: "flex", justifyContent: "center" }}>
                <div className="left-side-forget-password-2">
                  <p className="Required-data-text">Required Data*</p>
                  <NavLink to="/companyscreen">
                    <button type="submit" className="back-button">
                      back
                    </button>
                  </NavLink>

                  <div className="phase-1-form">
                    <p className="phase-1-text-left-side">Name</p>
                    <Field
                      type="text"
                      id="phase1.name"
                      name="phase1.name"
                      className="phase-1-input-left-side"
                      placeholder="John Leo"
                    />
                    <ErrorMessage
                      name="phase1.name"
                      component="div"
                      style={{
                        color: "red",
                        fontSize: ".8rem",
                        marginLeft: "7px",
                      }}
                    />
                    <div className="email-input">
                      <p className="phase-1-text-left-side">Email</p>
                      <Field
                        type="email"
                        id="phase1.email"
                        name="phase1.email"
                        placeholder="email@email.com"
                        className="phase-1-input-left-side"
                      />
                      <ErrorMessage
                        name="phase1.email"
                        component="div"
                        style={{
                          color: "red",
                          fontSize: ".8rem",
                          marginLeft: "7px",
                        }}
                      />
                    </div>
                    <div className="Phone-number">
                      <p className="phase-1-text-left-side">Contact</p>
                      <Field
                        type="number"
                        id="phase1.contact"
                        name="phase1.contact"
                        placeholder="(485)-845-8542658"
                        className="phase-1-input-left-side"
                      />
                      <ErrorMessage
                        name="phase1.contact"
                        component="div"
                        style={{
                          color: "red",
                          fontSize: ".8rem",
                          marginLeft: "7px",
                        }}
                      />
                    </div>
                    <div className="Date-input">
                      <p className="phase-1-text-left-side">Date of Birth</p>
                      <Field
                        type="date"
                        id="phase1.birthDate"
                        name="phase1.birthDate"
                        className="phase-1-input-left-side"
                      />
                      <ErrorMessage
                        name="phase1.birthDate"
                        component="div"
                        style={{
                          color: "red",
                          fontSize: ".8rem",
                          marginLeft: "7px",
                        }}
                      />
                    </div>
                    <div className="nationalty-input">
                      <p className="phase-1-text-left-side">Country</p>
                      <Field
                        as="select"
                        id="phase1.country"
                        name="phase1.country"
                        className="phase-1-input-left-side-selector"
                      >
                        <option value="">Select Country</option>
                        <option value="pakistan">Pakistan</option>
                        <option value="usa">USA</option>
                        <option value="uk">UK</option>
                      </Field>
                      <ErrorMessage
                        name="phase1.country"
                        component="div"
                        style={{
                          color: "red",
                          fontSize: ".8rem",
                          marginLeft: "7px",
                        }}
                      />

                      <p className="country-cnfrm-text">
                        Do you have residence in this country
                      </p>

                      <div className="checkbox-phase1">
                        <p className="yes-check-text">Yes</p>
                        <input
                          defaultChecked
                          required
                          type="radio"
                          id="phase1.sameResidence-yes"
                          name="phase1.sameResidence"
                          onChange={(e) => {
                            setFieldValue("phase1.sameResidence", true);
                            setPermissionInCountryErr(true);
                          }}
                        />
                        <p className="no-check-text">No</p>
                        <input
                          required
                          type="radio"
                          id="phase1.sameResidence-no"
                          name="phase1.sameResidence"
                          onChange={(e) => {
                            setFieldValue("phase1.sameResidence", false);
                            setFieldValue("phase1.permissionInCountry", "");
                            setPermissionInCountryErr(false);
                          }}
                        />
                      </div>
                      {permissionInCountryErr && (
                        <>
                          <p className="phase-1-text-left-side">
                            If Yes, what type of permission do you have to be in
                            the country?*
                          </p>
                          <Field
                            required={permissionInCountryErr}
                            as="select"
                            id="phase1.permissionInCountry"
                            name="phase1.permissionInCountry"
                            className="phase-1-input-left-side"
                          >
                            <option value="">Select Type of permission</option>
                            <option value="National">National</option>
                            <option value="Settlement">Settlement</option>
                            <option value="TemporaryVisa">
                              Temporary Visa
                            </option>
                          </Field>
                        </>
                      )}
                    </div>
                    {/* Nationality Input div ends  */}
                  </div>
                </div>

                <div className="right-side-forget-password-2">
                  <p className="phase-1-text-right-side">
                    Do you speak English?*
                  </p>

                  <div className="checkbox-phase1">
                    <p className="yes-check-text">Yes</p>
                    <input
                      defaultChecked
                      required
                      type="radio"
                      id="phase1.speakEnglish-yes"
                      name="phase1.speakEnglish"
                      onChange={(e) => {
                        setFieldValue("phase1.speakEnglish", true);
                        setSpeakEnglishErr(true);
                      }}
                      className="yes-check"
                    />
                    <p className="no-check-text">No</p>
                    <input
                      required
                      type="radio"
                      id="phase1.speakEnglish-no"
                      name="phase1.speakEnglish"
                      onChange={(e) => {
                        setFieldValue("phase1.speakEnglish", false);
                        setFieldValue("phase1.proficiency", "");
                        setSpeakEnglishErr(false);
                      }}
                      className="no-check"
                    />
                  </div>

                  {speakEnglishErr && (
                    <>
                      <p className="phase-1-text-right-side">
                        If Yes, what level of proficiency?*
                      </p>

                      <div className="phase-1-all-checkboxes">
                        <p className="phase-1-text-right-side">Beginner</p>
                        <input
                          defaultChecked
                          required={speakEnglishErr}
                          type="radio"
                          id="phase1.proficiency-beginner"
                          name="phase1.proficiency"
                          onChange={(e) => {
                            setFieldValue("phase1.proficiency", "Beginner");
                          }}
                          className="checks"
                        />
                        <p className="phase-1-text-right-side">Moderate</p>
                        <input
                          required={speakEnglishErr}
                          type="radio"
                          id="phase1.proficiency-moderate"
                          name="phase1.proficiency"
                          onChange={(e) => {
                            setFieldValue("phase1.proficiency", "Moderate");
                          }}
                          className="checks"
                        />
                        <p className="phase-1-text-right-side">Fluent</p>
                        <input
                          required={speakEnglishErr}
                          type="radio"
                          id="phase1.proficiency-fluent"
                          name="phase1.proficiency"
                          onChange={(e) => {
                            setFieldValue("phase1.proficiency", "Fluent");
                          }}
                          className="checks"
                        />
                        <p className="phase-1-text-right-side">Native</p>
                        <input
                          required={speakEnglishErr}
                          type="radio"
                          id="phase1.proficiency-native"
                          name="phase1.proficiency"
                          onChange={(e) => {
                            setFieldValue("phase1.proficiency", "Native");
                          }}
                          className="checks"
                        />
                      </div>
                    </>
                  )}

                  <p className="phase-1-text-right-side">
                    What other languages do you speak?*
                  </p>

                  <Field
                    as="select"
                    id="phase1.otherLanguagesSpeak"
                    name="phase1.otherLanguagesSpeak"
                    className="phase-1-input-right-side-selector"
                    value={languagesArr[-1]}
                    ref={languageRef}
                    onChange={(e) => handleOtherLanguages(e, setFieldValue)}
                    required
                  >
                    <option value="">Select Other Languages</option>
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                  </Field>
                  <ErrorMessage
                    name="phase1.otherLanguagesSpeak"
                    component="div"
                    style={{
                      color: "red",
                      fontSize: ".8rem",
                      marginLeft: "7px",
                    }}
                  />

                  <div
                    className="languages-display"
                    style={{
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      width: "100%",
                      flexWrap: "wrap",
                      marginTop: "10px",
                      marginLeft: "4px",
                    }}
                  >
                    {languagesArr.map((item) => (
                      <div
                        key={item}
                        style={{
                          background: "#F7F7F7",
                          padding: "0px 10px",
                          borderRadius: "3px",
                          fontSize: ".82rem",
                          border: "1px solid #E2E2E4",
                        }}
                        className="language-item"
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <p className="phase-1-text-right-side">
                    Have you ever been refused a visa/entry to any country in
                    the world?*
                  </p>

                  <div className="checkbox-phase1">
                    <p className="yes-check-text">Yes</p>
                    <input
                      defaultChecked
                      required
                      type="radio"
                      id="phase1.isRefusedVisaEntry-yes"
                      name="phase1.isRefusedVisaEntry"
                      onChange={(e) => {
                        setFieldValue("phase1.isRefusedVisaEntry", true);
                        setRefusedVisaErr(true);
                      }}
                      className="yes-check"
                    />
                    <p className="no-check-text">No</p>
                    <input
                      required
                      type="radio"
                      id="phase1.isRefusedVisaEntry-no"
                      name="phase1.isRefusedVisaEntry"
                      onChange={(e) => {
                        setFieldValue("phase1.isRefusedVisaEntry", false);
                        setFieldValue("phase1.refusedVisaDate", "");
                        setFieldValue("phase1.refusedVisaReason", "");
                        setFieldValue("phase1.refusedVisaType", "");
                        setRefusedVisaErr(false);
                      }}
                      className="no-check"
                    />
                  </div>

                  {refusedVisaErr && (
                    <>
                      <p className="phase-1-text-right-side">
                        If yes, please provide type of visa refused*
                      </p>
                      <Field
                        as="select"
                        id="phase1.refusedVisaType"
                        name="phase1.refusedVisaType"
                        className="phase-1-input-right-side-selector"
                        required={refusedVisaErr}
                      >
                        <option value="">Type of visa refused</option>
                        <option value="Visit">Visit</option>
                        <option value="Study">Study</option>
                        <option value="Work">Work</option>
                        <option value="Settlement">Settlement </option>
                        <option value="Other">Other</option>
                      </Field>

                      <p className="phase-1-text-right-side">Date*</p>
                      <Field
                        className="phase-1-input-right-side"
                        type="date"
                        placeholder="Select Date"
                        name="phase1.refusedVisaDate"
                        id="phase1.refusedVisaDate"
                        required={refusedVisaErr}
                      />

                      <p className="phase-1-text-right-side">
                        If yes, please provide type of visa refused reason*
                      </p>
                      <Field
                        type="text"
                        placeholder="Type here"
                        className="phase-1-input-right-side"
                        name="phase1.refusedVisaReason"
                        id="phase1.refusedVisaReason"
                        required={refusedVisaErr}
                      />
                    </>
                  )}

                  <p className="phase-1-text-right-side">
                    Please provide in your own words how we can help you?*
                  </p>
                  <Field
                    type="text"
                    placeholder="Type here"
                    className="phase-1-input-right-side"
                    name="phase1.message"
                    id="phase1.message"
                  />

                  <ErrorMessage
                    name="phase1.message"
                    component="div"
                    style={{
                      color: "red",
                      fontSize: ".8rem",
                      marginLeft: "7px",
                    }}
                  />

                  <button
                    disabled={isLoading}
                    type="submit"
                    className="submit-email-btn-2"
                  >
                    {isLoading
                      ? <Loader width={25} color={"#fff"} />
                      : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
}

export default Phase1