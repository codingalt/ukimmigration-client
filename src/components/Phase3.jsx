import React, { useEffect, useState, useRef, useMemo, useContext } from 'react';
import Logo2 from '../Assets/Ukimmigration-logo.png';
import bellicon2 from "../Assets/bell-icon-svg.svg"
import profileimg from "../Assets/profile-img-svg.svg"
import dropdownicon from "../Assets/dropdown-icon-svg.svg"
import addicon from "../Assets/add-icon.svg"
import creditpic from "../Assets/debit-card-pic.svg"
import { Link, NavLink, useNavigate } from 'react-router-dom';
import NotificationBox from './Notification';
import SettingBox from "./Settingbox"
import "../style/Phase3.css"
import { useGetApplicationByUserIdQuery, usePayWithCardMutation, usePostPhase3Mutation } from '../services/api/applicationApi';
import { toastError, toastSuccess } from './Toast';
import Loader from './Loader';
import StripeCheckout from "react-stripe-checkout";
import Navbar from './Navbar';
import MainContext from './Context/MainContext';
import { useSelector } from 'react-redux';

const Phase3 = () => {
    const { user } = useSelector((state) => state.user);
    const [chalan, setChalan] = useState("");
    const chalanRef = useRef();
    const [fileName,setFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const [postPhase3, result] = usePostPhase3Mutation();
    const {isLoading,isSuccess,error} = result;
    const [payWithCard, res] = usePayWithCardMutation();
    const { isLoading: paymentLoading, error: paymentError, isSuccess: paymentSuccess } = res;
    const navigate = useNavigate();
    const { data: applicationData } = useGetApplicationByUserIdQuery();
    const application = applicationData?.application;
    console.log(application?._id);
    const [isAllowed, setIsAllowed] = useState(false);
    const { socket } = useContext(MainContext);

    useMemo(()=>{
        if(error){
            toastError(error?.data?.message);
        }
    },[error]);

    useMemo(()=>{
        if(isSuccess){
            toastSuccess("Chalan Submitted Successfully.");
            setTimeout(() => {
                navigate("/filldata")
            }, 1200);
        }
    },[isSuccess]);

    const openFile = (e) => {
      if (e.target.files && e.target.files[0]) {
        let pdf = e.target.files[0];
        setFileName(pdf.name);
        setChalan(pdf);
      }
    };

    const handleChalanUpload = async()=>{
        let formData = new FormData();
        formData.append("applicationId", application?._id);
        formData.append("chalan", chalan);
       const {data: response} = await postPhase3({formData: formData, applicationId: application?._id});
        if (response.success) {
          socket.emit("send phase data", {
            userId: application?.userId,
            applicationId: application?._id,
            phase: 3,
          });

          if (response?.application?.caseWorkerId) {
            if (response?.application?.caseWorkerId === user?.referringAgent) {
              socket.emit("send noti to caseworker", {
                userId: application?.userId,
                applicationId: application?._id,
                phase: 3,
                phaseSubmittedByClient: application?.phaseSubmittedByClient,
                caseWorkerId: response?.application?.caseWorkerId,
              });
            }
          }
        }
        
    }

    const handleToken = async (token) => {
      try {
       const {data: response} = await payWithCard({token: token, applicationId: application?._id})
        if (response.success) {
          if (response?.application?.caseWorkerId) {
            if (response?.application?.caseWorkerId === user?.referringAgent) {
              socket.emit("send noti to caseworker", {
                userId: application?.userId,
                applicationId: application?._id,
                phase: 3,
                phaseSubmittedByClient: application?.phaseSubmittedByClient,
                caseWorkerId: response?.application?.caseWorkerId,
              });
            }
          }
        }
        
      } catch (error) {
        console.log(error);
      }
    };

    useMemo(()=>{
      if(paymentError){
        toastError(paymentError?.data?.message);
      }
    },[paymentError]);

    useMemo(() => {
      if (paymentSuccess) {
        toastSuccess("Congratulations! Payment Successfull.");
        socket.emit("send phase data", {
          userId: application?.userId,
          applicationId: application?._id,
          phase: 3,
        });
        setTimeout(() => {
          navigate("/filldata")
        }, 1200);
      }
    }, [paymentSuccess]);

    useEffect(() => {
      if (application) {
        if (
          application.requestedPhase === 3 &&
          application.phaseSubmittedByClient === 2
        ) {
          setIsAllowed(true);
        } else if (application.phase === 4 && application.phaseStatus === "approved") {
          navigate("/phase4/data");
        } else if (application?.phase3?.status === "rejected") {
          setIsAllowed(true);
        } else {
          setIsAllowed(false);
          navigate("/filldata");
        }
      }
    }, [application]);

  const [activeTab, setActiveTab] = useState(0);


    return (
      <>
        {isAllowed && (
          <div className="Container-forgetpassword-phase1">
            <Navbar />
            <div className="Forgetpassword-sub-2">
              <div className="left-side-forget-password-2">
                <p className="Required-data-text">Choose your payment method</p>
                <NavLink to="/filldata">
                  <button type="submit" className="back-button">
                    back
                  </button>
                </NavLink>
                <p className="Pay-credit-text">Pay with Credit Card</p>

                <img src={creditpic} alt="" className="credit-card" />

                <p className="detail-text">Details</p>
                <div className="border-line-phase3"></div>

                <div className="Details">
                  <div>
                    <p>Service Fee</p>
                    <p>Tax</p>
                    <p>Total</p>
                  </div>

                  <div>
                    <p>${application?.phase3?.cost}</p>
                    <p>$0.00</p>
                    <p>${application?.phase3?.cost}</p>
                  </div>
                </div>
                <StripeCheckout
                  name="UK Immigration"
                  image={Logo2}
                  amount={parseInt(application?.phase3?.cost) * 100}
                  stripeKey={import.meta.env.VITE_STRIPE_KEY}
                  token={handleToken}
                >
                  <button
                    type="submit"
                    className="click-to-pay"
                    disabled={paymentLoading}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {paymentLoading ? <Loader /> : "Click to Pay"}
                  </button>
                </StripeCheckout>
    
              </div>

              <div className="Border-line-between"></div>
              <div className="right-side-phase3">
                <p className="pay-to-bank-text">Pay with Bank Account</p>
                <div className="pay-tabs">
                  <div
                    onClick={() => setActiveTab(0)}
                    className={
                      activeTab === 0 ? "pay-tab pay-tab-active" : "pay-tab"
                    }
                  >
                    GBP
                  </div>
                  <div
                    onClick={() => setActiveTab(1)}
                    className={
                      activeTab === 1 ? "pay-tab pay-tab-active" : "pay-tab"
                    }
                  >
                    EURO
                  </div>
                  <div
                    onClick={() => setActiveTab(2)}
                    className={
                      activeTab === 2 ? "pay-tab pay-tab-active" : "pay-tab"
                    }
                  >
                    PKR
                  </div>
                </div>

                {/* GBP Bank Details  */}
                {activeTab === 0 && (
                  <>
                    <p className="phase-3-right-text">Bank Name</p>
                    <input
                      disabled
                      className="Input-right-phase3"
                      type="text"
                      name="bankName"
                      placeholder="Barclays Bank Uk Plc United Kingdom"
                    />
                    <p className="phase-3-right-text">IBAN</p>
                    <input
                      disabled
                      className="Input-right-phase3"
                      type="text"
                      name="iban"
                      placeholder="GB44 BUKB 2009 7233 2091 72"
                    />
                    <p className="phase-3-right-text">SWIFTBIC</p>
                    <input
                      disabled
                      className="Input-right-phase3"
                      type="text"
                      name="iban"
                      placeholder="BUKBGB22"
                    />
                    <p className="phase-3-right-text">Sort Code</p>
                    <input
                      disabled
                      className="Input-right-phase3"
                      type="text"
                      name="iban"
                      placeholder="20-09-72"
                    />
                    <p className="phase-3-right-text">Company Recipient</p>
                    <input
                      disabled
                      className="Input-right-phase3"
                      type="text"
                      name="companyRecipient"
                      placeholder="UK IMMIGRATION SOLUTIONS LIMITED"
                    />
                  </>
                )}

                {/* Euro Bank Details  */}
                {activeTab === 1 && (
                  <>
                    <p className="phase-3-right-text">Bank Name</p>
                    <input
                      disabled
                      className="Input-right-phase3"
                      type="text"
                      name="bankName"
                      placeholder="Euro"
                    />
                    <p className="phase-3-right-text">IBAN</p>
                    <input
                      disabled
                      className="Input-right-phase3"
                      type="text"
                      name="iban"
                      placeholder="H5HG85H5J5M588580654"
                    />
                    <p className="phase-3-right-text">Company Recipient</p>
                    <input
                      disabled
                      className="Input-right-phase3"
                      type="text"
                      name="companyRecipient"
                      placeholder="20744764623315"
                    />
                  </>
                )}

                {/* PKR Bank Details  */}
                {activeTab === 2 && (
                  <>
                    <p className="phase-3-right-text">Bank Name</p>
                    <input
                      disabled
                      className="Input-right-phase3"
                      type="text"
                      name="bankName"
                      placeholder="Bank Alfalah"
                    />
                    <p className="phase-3-right-text">IBAN</p>
                    <input
                      disabled
                      className="Input-right-phase3"
                      type="text"
                      name="iban"
                      placeholder="D4HG85H5J5k58880644"
                    />
                    <p className="phase-3-right-text">Company Recipient</p>
                    <input
                      disabled
                      className="Input-right-phase3"
                      type="text"
                      name="companyRecipient"
                      placeholder="107427650923315"
                    />
                  </>
                )}
               

                <p className="If-you-paid-text">
                  {fileName
                    ? `Chalan Selected: ${fileName}`
                    : "If you have paid, please upload proof of payment."}{" "}
                </p>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <input
                    ref={chalanRef}
                    type="file"
                    id="passport"
                    name="passport"
                    accept=".pdf"
                    onChange={(event) => openFile(event)}
                    style={{ display: "none" }}
                  />
                  <button
                    style={{
                      width: "40%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "#FCFCFC",
                      color: "#000",
                      border: "1px solid #E2E2E4",
                    }}
                    type="button"
                    className="Upload-evidence"
                    onClick={() => chalanRef.current.click()}
                  >
                    Upload Evidence
                  </button>
                  <button
                    style={{
                      width: "40%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    type="button"
                    className="Upload-evidence"
                    disabled={isLoading}
                    onClick={handleChalanUpload}
                  >
                    {isLoading ? <Loader /> : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
}

export default Phase3