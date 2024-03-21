import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import "../style/forgetpassword.css";
import "../style/Phase1.css";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import {
  useGetApplicationByUserIdQuery,
  usePostPhase1Mutation,
} from "../services/api/applicationApi";
import { toastError, toastSuccess } from "./Toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { phase1Schema } from "../utils/ValidationSchema";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import SelectCountry from "./SelectCountry";
import LanguageList from "./LanguageList";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Navbar from "./Navbar";
import Congratspopup from "./Congratspopup";
import MainContext from "./Context/MainContext";

const Phase1 = () => {
  const { user, applicationType } = useSelector((state) => state.user);
  const [isTempVisa, setIsTempVisa] = useState(false);
  const [permissionInCountryErr, setPermissionInCountryErr] = useState(true);
  const [speakEnglishErr, setSpeakEnglishErr] = useState(true);
  const [refusedVisaErr, setRefusedVisaErr] = useState(true);
  const [languagesArr, setLanguagesArr] = useState([]);
  const languageRef = useRef();
  const [postPhase1, result] = usePostPhase1Mutation();
  const { isLoading, isSuccess, error } = result;
  const navigate = useNavigate();
  const { socket } = useContext(MainContext);
  const { data: application } = useGetApplicationByUserIdQuery();
  const app = application?.application;
  const [isAllowed, setIsAllowed] = useState(false);

  const initialValues = {
    userId: user?._id,
    phase1: {
      applicationType: applicationType
        ? applicationType
        : localStorage.getItem("phase1-applicationType"),
      name: user?.name,
      email: user?.email,
      contact: user?.contact,
      birthDate: "",
      country: "",
      sameResidence: true,
      permissionInCountry: "",
      temporaryVisaDetails: "",
      temporaryVisaValidUntill: "",
      speakEnglish: true,
      proficiency: "Beginner",
      otherLanguagesSpeak: languagesArr,
      isRefusedVisaEntry: true,
      refusedVisaType: "",
      refusedVisaDate: "",
      refusedVisaReason: "",
      message: "",
    },
  };

  useMemo(() => {
    if (error) {
      toastError(error?.data?.message);
    }
  }, [error]);

  useMemo(() => {
    if (isSuccess) {
    }
  }, [isSuccess]);

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    const { data } = await postPhase1(values);

    resetForm({
      values: initialValues,
    });
    const { result } = data;
    console.log("Result", result);
    socket.emit("send phase data", {
      userId: result?.userId,
      applicationId: result?._id,
      phase: 1,
      phaseSubmittedByClient: result.phaseSubmittedByClient,
      result: result,
    });

    if (result?.caseWorkerId) {
      if (result?.caseWorkerId === user?.referringAgent) {
        socket.emit("send noti to caseworker", {
          userId: result?.userId,
          applicationId: result?._id,
          phase: 1,
          phaseSubmittedByClient: result.phaseSubmittedByClient,
          caseWorkerId: result?.caseWorkerId,
        });
      }
    }
    setTimeout(() => {
      navigate("/filldata");
    }, 3500);
  };

  const handleRemove = (value) => {
    if (languagesArr.includes(value)) {
      const tempArr = [...languagesArr];
      const filteredArray = tempArr.filter((item) => item !== value);
      setLanguagesArr(filteredArray);
    }
  };

  useEffect(() => {
    console.log(user, "user");
    if (app && !isSuccess) {
      if (app.phaseSubmittedByClient === 0) {
        setIsAllowed(true);
      } else {
        setIsAllowed(false);
        navigate("/filldata");
      }
    } else {
      setIsAllowed(true);
    }
  }, [app]);

  const handleTempVisa = (e, setFieldValue) => {
    if (e.target.value === "TemporaryVisa") {
      setIsTempVisa(true);
      setFieldValue("phase1.permissionInCountry", e.target.value);
    } else {
      setIsTempVisa(false);
      setFieldValue("phase1.permissionInCountry", e.target.value);
      setFieldValue("phase1.temporaryVisaDetails", "");
      setFieldValue("phase1.temporaryVisaValidUntill", "");
    }
  };

  return (
    <>
      {isAllowed && (
        <div className="Container-forgetpassword-phase1">
          <Navbar />

          {isSuccess && <Congratspopup />}

          <div className="Forgetpassword-sub-2">
            <Formik
              validationSchema={phase1Schema}
              initialValues={initialValues}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, errors, resetForm, values }) => (
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
                          disabled
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
                        <SelectCountry
                          name="phase1.country"
                          id="phase1.country"
                          className="phase-1-input-left-side-selector"
                        ></SelectCountry>

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
                              If Yes, what type of permission do you have to be
                              in the country?*
                            </p>
                            <Field
                              required={permissionInCountryErr}
                              as="select"
                              id="phase1.permissionInCountry"
                              name="phase1.permissionInCountry"
                              className="phase-1-input-left-side"
                              value={values.phase1.permissionInCountry}
                              onChange={(e) => handleTempVisa(e, setFieldValue)}
                            >
                              <option value="">
                                Select Type of Permission
                              </option>
                              <option value="National">National</option>
                              <option value="Settlement">Settlement</option>
                              <option value="TemporaryVisa">
                                Temporary Visa
                              </option>
                            </Field>
                          </>
                        )}
                        {isTempVisa && (
                          <>
                            <div className="Date-input">
                              <p className="phase-1-text-left-side">
                                Temporary Visa Details
                              </p>
                              <Field
                                required={isTempVisa}
                                type="text"
                                id="phase1.temporaryVisaDetails"
                                name="phase1.temporaryVisaDetails"
                                className="phase-1-input-left-side"
                                placeholder="Type Temporary Visa Details"
                              />
                            </div>
                            <div className="Date-input">
                              <p className="phase-1-text-left-side">
                                Valid Untill
                              </p>
                              <Field
                                required={isTempVisa}
                                type="date"
                                id="phase1.temporaryVisaValidUntill"
                                name="phase1.temporaryVisaValidUntill"
                                className="phase-1-input-left-side"
                              />
                              <ErrorMessage
                                name="phase1.temporaryVisaValidUntill"
                                component="div"
                                style={{
                                  color: "red",
                                  fontSize: ".8rem",
                                  marginLeft: "7px",
                                }}
                              />
                            </div>
                            <div
                              className="Date-input"
                              style={{ visibility: "hidden" }}
                            >
                              <Field
                                type="text"
                                className="phase-1-input-left-side"
                              />
                            </div>
                          </>
                        )}
                      </div>
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

                    <LanguageList
                      name="phase1.otherLanguagesSpeak"
                      className="phase-1-input-right-side-selector"
                      onChange={setLanguagesArr}
                      prevValue={languagesArr}
                      setFieldValue={setFieldValue}
                    ></LanguageList>

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
                      {languagesArr?.map((item) => (
                        <div
                          key={item}
                          style={{
                            background: "#F7F7F7",
                            padding: "2px 10px",
                            borderRadius: "3px",
                            fontSize: ".82rem",
                            border: "1px solid #E2E2E4",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "15px",
                          }}
                          className="language-item"
                        >
                          {item}
                          <span
                            onClick={() => handleRemove(item)}
                            style={{
                              cursor: "pointer",
                              color: "red",
                              fontSize: "1.04rem",
                            }}
                          >
                            x
                          </span>
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
                        <ErrorMessage
                          name="phase1.refusedVisaDate"
                          component="div"
                          style={{
                            color: "red",
                            fontSize: ".8rem",
                            marginLeft: "7px",
                          }}
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
                      style={isLoading ? { opacity: 0.55 } : {}}
                    >
                      {isLoading ? (
                        <Loader width={25} color={"#fff"} />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
};

export default Phase1;
