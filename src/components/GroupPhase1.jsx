import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useGetCompanyDetailsByIdQuery, useGetGroupClientAppByIdQuery, useGetGroupClientAppByUserIdQuery, usePostGroupClientPhase1Mutation } from '../services/api/companyClient';
import { toastError, toastSuccess } from './Toast';
import Congratspopup from './Congratspopup';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import { Link, NavLink } from "react-router-dom";
import "../style/groupphase1.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SelectCountry from './SelectCountry';
import Loader from './Loader';
import { groupPhase1Schema } from '../utils/ValidationSchema';
import CongratsGroupPhase1 from './CongratsGroupPhase1';
import MainContext from './Context/MainContext';
import { useSelector } from 'react-redux';

const GroupPhase1 = () => {
    const { user, applicationType } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const [show,setShow] = useState();
    const { socket } = useContext(MainContext);
    const { data } =
      useGetGroupClientAppByUserIdQuery(null, {
        refetchOnMountOrArgChange: true,
      });
      const applicationId = data?.application?._id;
      const userId = data?.application?.userId;

    const { data: company } = useGetCompanyDetailsByIdQuery(
      data?.application?.companyId,
      { skip: !data?.application?.companyId }
    );

    console.log("Appl",data?.application);
    const[postGroupClientPhase1,res] = usePostGroupClientPhase1Mutation();
    const {isLoading,error,isSuccess} = res;

    useMemo(() => {
      if (error) {
        toastError(error?.data?.message);
      }
    }, [error]);

    useMemo(() => {
      if (isSuccess) {
      }
    }, [isSuccess]);

    const initialValues = {
      fullNameAsPassport: "",
      postalAddress: "",
      birthDate: "",
      nationality: "",
      passportNumber: "",
    };

    const handleSubmit = async(values,{resetForm}) => {
      console.log(values); 
      const { data: resp } = await postGroupClientPhase1({
        applicationId: applicationId,
        values: values,
      });  
      console.log("Group Client phase 1 data", resp);
      if (resp.success) {
        console.log(resp);
        socket.emit("send phase data", {
          userId: userId,
          applicationId: applicationId,
          phase: 1,
          phaseSubmittedByClient: 1,
          result: resp,
        });

        const { result } = resp;

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
          navigate("/group/filldata");
        }, 7000);
      }
      resetForm({
        values: initialValues, 
      });
    }

    useEffect(()=>{
      if (data && !isSuccess) {
        if (data?.application?.phaseSubmittedByClient === 1) {
          setShow(false);
          navigate("/group/filldata");
        } else {
          setShow(true);
        }
      }
    },[data]);

  return (
    <>
      {isSuccess && <CongratsGroupPhase1 />}

      {show && (
        <div className="Container-forgetpassword-phase1">
          <Navbar />
          <div className="Forgetpassword-sub-2">
            <div className="left-side-forget-password-2">
              <div
                className="Group-dataa-main-2"
                style={{ flexDirection: "column" }}
              >
                <p className="req-term-con-text">Company Details</p>

                <div className="com-phase1-row">
                  <div className="com-left">
                    <p>Company Name</p>
                    <div className="com-border"></div>
                    <p className="second-p">{company?.company?.name}</p>
                  </div>
                  <div className="com-right">
                    <p>Company Email</p>
                    <div className="com-border"></div>
                    <p className="second-p">{company?.company?.email}</p>
                  </div>
                </div>
                <div className="com-phase1-row">
                  <div className="com-left">
                    <p>Full Name</p>
                    <div className="com-border"></div>
                    <p className="second-p">{company?.company?.fullName}</p>
                  </div>
                  <div className="com-right">
                    <p>Company Address</p>
                    <div className="com-border"></div>
                    <p className="second-p">{company?.company?.address}</p>
                  </div>
                </div>

                {/* <div className="new-group-input-phase1">
                  <div className="company-name-group">
                    <p className="company-name">Company Name</p>
                    <div className="border-line-between"></div>
                    <p>{company?.company?.name}</p>
                  </div>

                  <div className="company-name-group-2">
                    <p className="company-name">Full Name of Company</p>
                    <div className="border-line-between"></div>
                    <p>{company?.company?.fullName}</p>
                  </div>
                </div>

                <div className="new-group-input-2-phase1">
                  <div className="company-name-group">
                    <p className="company-name">Company Address</p>
                    <div className="border-line-between"></div>
                    <p>{company?.company?.address}</p>
                  </div>

                  <div className="company-name-group-2">
                    <p className="company-name">Company E-Mail</p>
                    <div className="border-line-between"></div>
                    <p>{company?.company?.email}</p>
                  </div>
                </div> */}
              </div>
              <p className="Required-data-text-Phase1">Required Data*</p>

              <Formik
                validationSchema={groupPhase1Schema}
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, errors, resetForm, touched }) => (
                  <Form>
                    <div className="phase-1-form">
                      <p className="phase-1-text-left-side">
                        Full name as it appears in the passport
                      </p>
                      <Field
                        className="genral-input-left-side"
                        type="text"
                        placeholder="John Snow"
                        name="fullNameAsPassport"
                        id="fullNameAsPassport"
                        style={
                          errors.fullNameAsPassport &&
                          touched.fullNameAsPassport && {
                            border: "1px solid red",
                          }
                        }
                      />
                    </div>
                    <div className="email-input">
                      <p className="phase-1-text-left-side">
                        Full Postal Address
                      </p>
                      <Field
                        className="genral-input-left-side"
                        type="Postal Address"
                        placeholder="Add Company address"
                        name="postalAddress"
                        id="postalAddress"
                        style={
                          errors.postalAddress &&
                          touched.postalAddress && {
                            border: "1px solid red",
                          }
                        }
                      />
                    </div>
                    <div className="Phone-number">
                      <p className="phase-1-text-left-side">Date of Birth</p>
                      <Field
                        className="genral-input-left-side"
                        type="date"
                        placeholder="Select Date of Birth"
                        name="birthDate"
                        id="birthDate"
                        style={
                          errors.birthDate &&
                          touched.birthDate && {
                            border: "1px solid red",
                          }
                        }
                      />
                    </div>
                    <div className="email-input">
                      <p className="phase-1-text-left-side">Nationality</p>
                      <SelectCountry
                        name="nationality"
                        id="nationality"
                        className="genral-input-left-side-selector"
                      ></SelectCountry>
                    </div>
                    <div className="Phone-number">
                      <p className="phase-1-text-left-side">Passport Number</p>
                      <Field
                        className="genral-input-left-side"
                        type="text"
                        placeholder="9846-4744648-6854764"
                        name="passportNumber"
                        id="passportNumber"
                        style={
                          errors.passportNumber &&
                          touched.passportNumber && {
                            border: "1px solid red",
                          }
                        }
                      />
                    </div>

                    <button
                      disabled={isLoading}
                      style={
                        isLoading
                          ? {
                              opacity: 0.55,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }
                          : {
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }
                      }
                      type="submit"
                      className="submit-email-btn-2"
                    >
                      {isLoading ? <Loader /> : "Submit"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default GroupPhase1