import React, { useEffect, useState, useRef, useMemo, useContext } from 'react';
import "../style/forgetpassword.css"
import "../style/Phase1.css"
import Logo2 from '../Assets/Ukimmigration-logo.png';
import bellicon2 from "../Assets/bell-icon-svg.svg"
import profileimg from "../Assets/profile-img-svg.svg"
import dropdownicon from "../Assets/dropdown-icon-svg.svg"
import { Link, NavLink, useNavigate } from 'react-router-dom';
import pdfimg from "../Assets/pdf-img.png"
import "../style/Phase2.css"
import NotificationBox from './Notification';
import SettingBox from "./Settingbox"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useGetApplicationByUserIdQuery, usePostPhase2Mutation } from '../services/api/applicationApi';
import { toastError, toastSuccess } from './Toast';
import Loader from './Loader';
import Navbar from './Navbar';
import Congratspopup from './Congratspopup';
import MainContext from './Context/MainContext';

const Phase2 = () => {

    const [isNotificationBoxVisible, setIsNotificationBoxVisible] = useState(false);
    const [isSettingsBoxVisible, setIsSettingsBoxVisible] = useState(false);
    const notificationRef = useRef(null);
    const settingsRef = useRef(null);
    const [isAllowed,setIsAllowed] = useState(false)
    const navigate = useNavigate();
    const { socket } = useContext(MainContext);

    const {data,isLoading} = useGetApplicationByUserIdQuery();
    const application = data?.application;
    console.log(data);

    const [postPhase2, result] = usePostPhase2Mutation();
    const {isLoading: isLoadingPostPhase, isSuccess, error} = result;

    useMemo(()=>{
        if(error){
            toastError(error?.data?.message)
        }
    },[error]);

    useMemo(() => {
      if (isSuccess) {

      }
    }, [isSuccess]);

    const passportRef = useRef(null);
    const dependentPassportRef = useRef(null);
    const utilityBillRef = useRef(null);
    const brpRef = useRef(null);
    const previousVisaVignettesRef = useRef(null);
    const refusalLetterRef = useRef(null);
    const educationCertificatesRef = useRef(null);
    const englishLanguageCertificateRef = useRef(null);
    const marriageCertificateRef = useRef(null);
    const bankStatementsRef = useRef(null);
    const otherRef = useRef(null);

    const initialValues = {
      passport: "",
      dependantPassport: "",
      utilityBill: "",
      brp: "",
      previousVisaVignettes: "",
      refusalLetter: "",
      educationCertificates: "",
      englishLanguageCertificate: "",
      marriageCertificate: "",
      bankStatements: "",
      other: "",
    };

     const phase2Schema = Yup.object({
       passport:
         application?.phase2?.passport == "" &&
         Yup.mixed().nullable().required("Passport is Required"),
       dependantPassport:
         application?.phase2?.dependantPassport == "" &&
         Yup.mixed().nullable().required("Dependent Passport is Required"),
       utilityBill:
         application?.phase2?.utilityBill == "" &&
         Yup.mixed().nullable().required(),
       brp: application?.phase2?.brp == "" && Yup.mixed().nullable().required(),
       previousVisaVignettes:
         application?.phase2?.previousVisaVignettes == "" &&
         Yup.mixed().nullable().required(),
       refusalLetter:
         application?.phase2?.refusalLetter == "" &&
         Yup.mixed().nullable().required(),
       educationCertificates:
         application?.phase2?.educationCertificates == "" &&
         Yup.mixed().nullable().required(),
       englishLanguageCertificate:
         application?.phase2?.englishLanguageCertificate == "" &&
         Yup.mixed().nullable().required(),
       marriageCertificate:
         application?.phase2?.marriageCertificate == "" &&
         Yup.mixed().nullable().required(),
       bankStatements:
         application?.phase2?.bankStatements == "" &&
         Yup.mixed().nullable().required(),
       other:
         application?.phase2?.other.length > 0 &&
         application?.phase2?.other[0] != "notreq" &&
         Yup.mixed().nullable().required(),
     });

    const handleSubmit = async(values, {resetForm})=>{
        let formData = new FormData();
        formData.append("applicationId", application?._id);
        formData.append("passport", values.passport);
        formData.append("dependantPassport", values.dependantPassport);
        formData.append("utilityBill", values.utilityBill);
        formData.append("brp", values.brp);
        formData.append("previousVisaVignettes", values.previousVisaVignettes);
        formData.append("refusalLetter", values.refusalLetter);
        formData.append("educationCertificates", values.educationCertificates);
        formData.append(
          "englishLanguageCertificate",
          values.englishLanguageCertificate
        );
        formData.append("marriageCertificate", values.marriageCertificate);
        formData.append("bankStatements", values.bankStatements);
        formData.append("other", values.other);

        if (!application || !application._id) {
          console.error(
            "Invalid application object or application._id is missing"
          );
          return;
        }
        try {
          const {data} = await postPhase2(formData);
          resetForm({
            values: initialValues,
          });
          socket.emit("send phase data", {
            userId: application?.userId,
            applicationId: application?._id,
            phaseSubmittedByClient: application?.phaseSubmittedByClient,
            phase: 2,
          });
          if(data.success){
            setTimeout(() => {
              navigate("/filldata");
            }, 3500);
          }
          
        } catch (error) {
          console.error(error);
        }
        
    }

    const openFile = (e,setFieldValue)=>{
        if (e.target.files && e.target.files[0]) {
          let pdf = e.target.files[0];
          setFieldValue(e.target.name, pdf);
        }
    }

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


    useEffect(()=>{
      if(application){
        if(application.requestedPhase === 2 && application.phaseSubmittedByClient === 1){
          setIsAllowed(true)
        } else if (
          application.phase === 4 &&
          application.phaseStatus === "approved"
        ) {
          navigate("/phase4/data");
        } else {
          setIsAllowed(false);
          navigate("/filldata");
        }
      }
    },[application]);

    return (
      <>
        {isAllowed && (
          <div className="Container-forgetpassword-phase1">
            <Navbar />

            {isSuccess && <Congratspopup />}
            <div className="Forgetpassword-sub-2">
              <Formik
                initialValues={initialValues}
                validationSchema={phase2Schema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, errors, values, touched }) => (
                  <Form
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <div className="left-side-forget-password-2">
                      <p className="Required-data-text">Required Data*</p>
                      <NavLink to="/filldata">
                        <button type="submit" className="back-button">
                          back
                        </button>
                      </NavLink>

                      {application?.phase2?.passport != "notreq" && (
                        <>
                          <input
                            ref={passportRef}
                            type="file"
                            id="passport"
                            name="passport"
                            accept=".pdf"
                            onChange={(event) => openFile(event, setFieldValue)}
                            style={{ display: "none" }}
                          />
                          <p className="password-text">PASSPORT*</p>
                          <div
                            className="pdf-input"
                            style={
                              errors.passport &&
                              touched.passport && { border: "1px solid red" }
                            }
                            onClick={() => passportRef.current.click()}
                          >
                            <span>
                              {values.passport
                                ? values.passport.name
                                : "Click here to open PDF"}
                            </span>

                            <img src={pdfimg} alt="" className="pdf-icon" />
                          </div>
                        </>
                      )}

                      {application?.phase2?.dependantPassport != "notreq" && (
                        <>
                          <p className="password-text">DEPENDANT PASSPORT*</p>
                          <input
                            ref={dependentPassportRef}
                            type="file"
                            id="dependantPassport"
                            name="dependantPassport"
                            accept=".pdf"
                            onChange={(event) => openFile(event, setFieldValue)}
                            style={{ display: "none" }}
                          />
                          <div
                            className="pdf-input"
                            style={
                              errors.dependantPassport &&
                              touched.dependantPassport && {
                                border: "1px solid red",
                              }
                            }
                            onClick={() => dependentPassportRef.current.click()}
                          >
                            {values.dependantPassport
                              ? values.dependantPassport.name
                              : "Click here to open PDF"}
                            <img src={pdfimg} alt="" className="pdf-icon" />
                          </div>
                        </>
                      )}

                      {application?.phase2?.utilityBill != "notreq" && (
                        <>
                          <p className="password-text">UTILITY BILL*</p>
                          <input
                            ref={utilityBillRef}
                            type="file"
                            id="utilityBill"
                            name="utilityBill"
                            accept=".pdf"
                            onChange={(event) => openFile(event, setFieldValue)}
                            style={{ display: "none" }}
                          />
                          <div
                            className="pdf-input"
                            style={
                              errors.utilityBill &&
                              touched.utilityBill && { border: "1px solid red" }
                            }
                            onClick={() => utilityBillRef.current.click()}
                          >
                            {values.utilityBill
                              ? values.utilityBill.name
                              : "Click here to open PDF"}
                            <img src={pdfimg} alt="" className="pdf-icon" />
                          </div>
                        </>
                      )}

                      {application?.phase2?.brp != "notreq" && (
                        <>
                          <p className="password-text">BRP*</p>
                          <input
                            ref={brpRef}
                            type="file"
                            id="brp"
                            name="brp"
                            accept=".pdf"
                            onChange={(event) => openFile(event, setFieldValue)}
                            style={{ display: "none" }}
                          />
                          <div
                            className="pdf-input"
                            style={
                              errors.brp &&
                              touched.brp && { border: "1px solid red" }
                            }
                            onClick={() => brpRef.current.click()}
                          >
                            {values.brp
                              ? values.brp.name
                              : "Click here to open PDF"}
                            <img src={pdfimg} alt="" className="pdf-icon" />
                          </div>
                        </>
                      )}

                      {application?.phase2?.previousVisaVignettes !=
                        "notreq" && (
                        <>
                          <p className="password-text">
                            PREVIOUS VISA VIGNETTES
                          </p>
                          <input
                            ref={previousVisaVignettesRef}
                            type="file"
                            id="previousVisaVignettes"
                            name="previousVisaVignettes"
                            accept=".pdf"
                            onChange={(event) => openFile(event, setFieldValue)}
                            style={{ display: "none" }}
                          />
                          <div
                            className="pdf-input"
                            style={
                              errors.previousVisaVignettes &&
                              touched.previousVisaVignettes && {
                                border: "1px solid red",
                              }
                            }
                            onClick={() =>
                              previousVisaVignettesRef.current.click()
                            }
                          >
                            {values.previousVisaVignettes
                              ? values.previousVisaVignettes.name
                              : "Click here to open PDF"}
                            <img src={pdfimg} alt="" className="pdf-icon" />
                          </div>
                        </>
                      )}

                      {application?.phase2?.refusalLetter != "notreq" && (
                        <>
                          <p className="password-text">REFUSAL LETTER</p>
                          <input
                            ref={refusalLetterRef}
                            type="file"
                            id="refusalLetter"
                            name="refusalLetter"
                            accept=".pdf"
                            onChange={(event) => openFile(event, setFieldValue)}
                            style={{ display: "none" }}
                          />
                          <div
                            className="pdf-input"
                            style={
                              errors.refusalLetter &&
                              touched.refusalLetter && {
                                border: "1px solid red",
                              }
                            }
                            onClick={() => refusalLetterRef.current.click()}
                          >
                            {values.refusalLetter
                              ? values.refusalLetter.name
                              : "Click here to open PDF"}
                            <img src={pdfimg} alt="" className="pdf-icon" />
                          </div>
                        </>
                      )}
                    </div>

                    <div className="right-side-phase2">
                      {application?.phase2?.educationCertificates !=
                        "notreq" && (
                        <>
                          <p className="password-text">
                            EDUCATION CERTIFICATES*
                          </p>
                          <input
                            ref={educationCertificatesRef}
                            type="file"
                            id="educationCertificates"
                            name="educationCertificates"
                            accept=".pdf"
                            onChange={(event) => openFile(event, setFieldValue)}
                            style={{ display: "none" }}
                          />
                          <div
                            className="pdf-input"
                            style={
                              errors.educationCertificates &&
                              touched.educationCertificates && {
                                border: "1px solid red",
                              }
                            }
                            onClick={() =>
                              educationCertificatesRef.current.click()
                            }
                          >
                            {values.educationCertificates
                              ? values.educationCertificates.name
                              : "Click here to open PDF"}
                            <img src={pdfimg} alt="" className="pdf-icon" />
                          </div>
                        </>
                      )}

                      {application?.phase2?.englishLanguageCertificate !=
                        "notreq" && (
                        <>
                          <p className="password-text">
                            ENGLISH LANGUAGE CERTIFICATE*
                          </p>
                          <input
                            ref={englishLanguageCertificateRef}
                            type="file"
                            id="englishLanguageCertificate"
                            name="englishLanguageCertificate"
                            accept=".pdf"
                            onChange={(event) => openFile(event, setFieldValue)}
                            style={{ display: "none" }}
                          />
                          <div
                            className="pdf-input"
                            style={
                              errors.englishLanguageCertificate &&
                              touched.englishLanguageCertificate && {
                                border: "1px solid red",
                              }
                            }
                            onClick={() =>
                              englishLanguageCertificateRef.current.click()
                            }
                          >
                            {values.englishLanguageCertificate
                              ? values.englishLanguageCertificate.name
                              : "Click here to open PDF"}
                            <img src={pdfimg} alt="" className="pdf-icon" />
                          </div>
                        </>
                      )}

                      {application?.phase2?.marriageCertificate != "notreq" && (
                        <>
                          <p className="password-text">MARRIAGE CERTIFICATE*</p>
                          <input
                            ref={marriageCertificateRef}
                            type="file"
                            id="marriageCertificate"
                            name="marriageCertificate"
                            accept=".pdf"
                            onChange={(event) => openFile(event, setFieldValue)}
                            style={{ display: "none" }}
                          />
                          <div
                            className="pdf-input"
                            style={
                              errors.marriageCertificate &&
                              touched.marriageCertificate && {
                                border: "1px solid red",
                              }
                            }
                            onClick={() =>
                              marriageCertificateRef.current.click()
                            }
                          >
                            {values.marriageCertificate
                              ? values.marriageCertificate.name
                              : "Click here to open PDF"}
                            <img src={pdfimg} alt="" className="pdf-icon" />
                          </div>
                        </>
                      )}

                      {application?.phase2?.bankStatements != "notreq" && (
                        <>
                          <p className="password-text">BANK STATEMENTS*</p>
                          <input
                            ref={bankStatementsRef}
                            type="file"
                            id="bankStatements"
                            name="bankStatements"
                            accept=".pdf"
                            onChange={(event) => openFile(event, setFieldValue)}
                            style={{ display: "none" }}
                          />
                          <div
                            className="pdf-input"
                            style={
                              errors.bankStatements &&
                              touched.bankStatements && {
                                border: "1px solid red",
                              }
                            }
                            onClick={() => bankStatementsRef.current.click()}
                          >
                            {values.bankStatements
                              ? values.bankStatements.name
                              : "Click here to open PDF"}
                            <img src={pdfimg} alt="" className="pdf-icon" />
                          </div>
                        </>
                      )}

                      {application?.phase2?.other.length > 0 &&
                        application?.phase2?.other[0] != "notreq" && (
                          <>
                            <p className="password-text">OTHER</p>
                            <input
                              ref={otherRef}
                              type="file"
                              id="other"
                              name="other"
                              accept=".pdf"
                              onChange={(event) =>
                                openFile(event, setFieldValue)
                              }
                              style={{ display: "none" }}
                              multiple
                            />
                            <div
                              className="pdf-input"
                              style={
                                errors.other &&
                                touched.other && { border: "1px solid red" }
                              }
                              onClick={() => otherRef.current.click()}
                            >
                              {values.other
                                ? values.other.name
                                : "Click here to open PDF"}
                              <img src={pdfimg} alt="" className="pdf-icon" />
                            </div>
                          </>
                        )}

                      <button
                        disabled={isLoadingPostPhase}
                        type="submit"
                        className="submit-email-btn-2"
                        style={
                          isLoading
                            ? {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                opacity: 0.55,
                              }
                            : {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }
                        }
                      >
                        {isLoadingPostPhase ? <Loader /> : "Submit"}
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
}

export default Phase2