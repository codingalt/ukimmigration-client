import React, { useEffect, useState, useRef, useMemo, useContext } from "react";
import Logo2 from "../Assets/Ukimmigration-logo.png";
import bellicon2 from "../Assets/bell-icon-svg.svg";
import profileimg from "../Assets/profile-img-svg.svg";
import dropdownicon from "../Assets/dropdown-icon-svg.svg";
import addicon from "../Assets/add-icon.svg";
import creditpic from "../Assets/debit-card-pic.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import NotificationBox from "./Notification";
import SettingBox from "./Settingbox";
import "../style/Phase3.css";
import {
  useGetApplicationByUserIdQuery,
  usePayWithCardMutation,
  usePostPhase3Mutation,
} from "../services/api/applicationApi";
import { toastError, toastSuccess } from "./Toast";
import Loader from "./Loader";
import StripeCheckout from "react-stripe-checkout";
import Navbar from "./Navbar";
import MainContext from "./Context/MainContext";
import { useGetGroupClientAppByUserIdQuery, useGroupPayWithCardMutation, usePostGroupClientPhase3Mutation } from "../services/api/companyClient";
import { useSelector } from "react-redux";

const GroupPhase3 = () => {
    const { user } = useSelector((state) => state.user);
  const [chalan, setChalan] = useState("");
  const chalanRef = useRef();
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [postGroupClientPhase3, result] = usePostGroupClientPhase3Mutation();
  const { isLoading, isSuccess, error } = result;
  const [groupPayWithCard, res] = useGroupPayWithCardMutation();
  const {
    isLoading: paymentLoading,
    error: paymentError,
    isSuccess: paymentSuccess,
  } = res;
  const navigate = useNavigate();
  const { data: applicationData } = useGetGroupClientAppByUserIdQuery();
  const application = applicationData?.application;
  console.log(application?._id);
  const [isAllowed, setIsAllowed] = useState(false);
  const { socket } = useContext(MainContext);

  useMemo(() => {
    if (error) {
      toastError(error?.data?.message);
    }
  }, [error]);

  useMemo(() => {
    if (isSuccess) {
      toastSuccess("Chalan Submitted Successfully.");
      setTimeout(() => {
        navigate("/group/filldata");
      }, 1200);
    }
  }, [isSuccess]);

  const openFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      let pdf = e.target.files[0];
      setFileName(pdf.name);
      setChalan(pdf);
    }
  };

  const handleChalanUpload = async () => {
    let formData = new FormData();
    formData.append("applicationId", application?._id);
    formData.append("chalan", chalan);
    const {data: response} = await postGroupClientPhase3({
      formData: formData,
      applicationId: application?._id,
    });

    if(response.success){
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

    
  };

  const handleToken = async (token) => {
    try {
      const { data: response } = await groupPayWithCard({
        token: token,
        applicationId: application?._id,
      });
      
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

  useMemo(() => {
    if (paymentError) {
      toastError(paymentError?.data?.message);
    }
  }, [paymentError]);

  useMemo(() => {
    if (paymentSuccess) {
      toastSuccess("Congratulations! Payment Successfull.");
      socket.emit("send phase data", {
        userId: application?.userId,
        applicationId: application?._id,
        phase: 3,
      });
      setTimeout(() => {
        navigate("/group/filldata");
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
        navigate("/group/phase4/data");
      } else if (application?.phase3?.status === "rejected") {
        setIsAllowed(true);
      } else {
        setIsAllowed(false);
        navigate("/group/filldata");
      }
    }
  }, [application]);

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
              {/* <NavLink to="/adddetails">
                    <p className='Add-debit-text'>Add Debit / Credit Card <img src={addicon} alt="" /></p>
                    </NavLink> */}
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
              {/* <NavLink to={`/adddetails/${application?._id}`}> */}
              {/* <button
              onClick={() => paymentRef.current.click()}
              type="submit"
              className="click-to-pay"
            >
              Click to Pay
            </button> */}
              {/* </NavLink> */}
            </div>

            <div className="Border-line-between"></div>
            <div className="right-side-phase3">
              <p className="pay-to-bank-text">Pay with Bank Account</p>
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
                placeholder="B8HF85H5J58588580644"
              />
              <p className="phase-3-right-text">Company Recipient</p>
              <input
                disabled
                className="Input-right-phase3"
                type="text"
                name="companyRecipient"
                placeholder="907437640921315"
              />

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
};

export default GroupPhase3;
