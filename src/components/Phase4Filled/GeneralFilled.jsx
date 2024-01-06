import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import chatbox from "../../Assets/chat-icon.svg";
import "../../style/Phase4.css";
import "../../style/buttons.css";
import star from "../../Assets/Star-svg.svg";
import moment from "moment";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import { Fade } from "react-awesome-reveal";
import { useSelector } from "react-redux";
import MainContext from "../Context/MainContext";
import {
  useGetUserChatsQuery,
  useGetUserMessagesQuery,
  useReadMessagesByChatMutation,
} from "../../services/api/chatApi";
import RejectpopupGroup from "../RejectPopupGroup";
import Rejectpopup from "../Rejectpopup";
import Logo2 from "../../Assets/Ukimmigration-logo.png";

const GeneralFilled = ({ data, application }) => {
  const location = useLocation();
  const state = location.state;
  const { user } = useSelector((state) => state.user);
  const { socket } = useContext(MainContext);
  const [count, setCount] = useState();
  const [chatId, setChatId] = useState();
  const [messages, setMessages] = useState([]);
  const [isReject, setIsReject] = useState();
  const [companyId, setCompanyId] = useState();
  const [show, setShow] = useState(false);

  const { data: chat, refetch: refetchChat } = useGetUserChatsQuery();
  const [readMessagesByChat, res] = useReadMessagesByChatMutation();

  const {
    data: messageData,
    isLoading: loading,
    refetch: refetchMessages,
  } = useGetUserMessagesQuery(chat?.chats[0]._id, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (messageData) {
      setMessages(messageData?.result);
    }
  }, [messageData]);

  useEffect(() => {
    let countTemp = 0;
    messages?.map((item) => {
      if (item.isRead === 0 && item.sender != user?._id) {
        countTemp++;
      }
    });
    setCount(countTemp);
  }, [messages]);

  useMemo(() => {
    if (state?.from === "/message") {
      readMessagesByChat(chat?.chats[0]._id);
    }
  }, [state]);

  useEffect(() => {
    socket?.on("message notification", async (newMessageReceived) => {
      setChatId(newMessageReceived?.result?.chatId);
      setMessages([...messages, newMessageReceived.result]);
    });
  });

  useEffect(() => {
    if (chatId) {
      refetchMessages();
    }
  }, [chatId]);

  const app = data?.general;
  console.log("General filled", app);

  const pdfRef = useRef(null);
  const exportPDFWithComponent = () => {
    if (pdfRef.current) {
      pdfRef.current.save();
    }
  };

  const handleRejectClick = () => {
    if (application.companyId) {
      setCompanyId(true);
    } else {
      setCompanyId(true);
    }
    setIsReject(true);
  };

  const handlePdfDownload = () => {
    setShow(true);
    if (pdfRef.current) {
      pdfRef.current.save();
    }
  };

  return (
    <div className="fill-data-border-phase4">
      {companyId
        ? isReject && <RejectpopupGroup show={isReject} setShow={setIsReject} />
        : isReject && <Rejectpopup show={isReject} setShow={setIsReject} />}
      <button
        type="button"
        onClick={handlePdfDownload}
        className="download-btn"
      >
        Download File
      </button>

      {/* Genral */}
      <PDFExport
        // forcePageBreak=".page-break"
        // scale={0.8}
        // paperSize="A2"
        margin="3cm"
        ref={pdfRef}
        fileName={`${
          application?.phase1?.name
            ? application?.phase1?.name
            : application?.phase1?.fullNameAsPassport
        }-${application?.caseId}-Phase4-General`}
      >
        <div className="phase-1 phase1-general">
          {show && (
            <div className="hidden-logo" style={{ marginBottom: "10px" }}>
              <img src={Logo2} alt="" />
            </div>
          )}
          <p className="Form-data-heading">Genral</p>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Full Name</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.fullName}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              Have you been known by any other names ?*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.isKnownByOtherName ? "Yes" : "No"}
            </p>
          </div>
          {app?.isKnownByOtherName && (
            <>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">Previous Name</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.previousName}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">From</p>
                <div className="border-y"></div>
                <p className="Name-text">
                  {moment(app?.prevNameFrom).format("dddd, MMMM Do")}
                </p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">To</p>
                <div className="border-y"></div>
                <p className="Name-text">
                  {moment(app?.prevNameTo).format("dddd, MMMM Do")}
                </p>
              </div>
            </>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Country of Birth</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.countryOfBirth}</p>
          </div>

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Place of Birth</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.placeOfBirth}</p>
          </div>

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Any other Nationalities?</p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.isOtherNationality ? "Yes" : "No"}
            </p>
          </div>

          {app?.isOtherNationality && (
            <>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">i. Other Nationality*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.otherNationality}</p>
              </div>

              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">ii. From</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.nationalityFrom}</p>
              </div>

              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">iii. Until*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.nationalityUntill}</p>
              </div>
            </>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Current passport number*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.currentPassportNumber}</p>
          </div>

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Issue date</p>
            <div className="border-y"></div>
            <p className="Name-text">
              {moment(app?.passportIssueDate).format("dddd, MMMM Do")}
            </p>
          </div>

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Expiry date</p>
            <div className="border-y"></div>
            <p className="Name-text">
              {moment(app?.passportExpiryDate).format("dddd, MMMM Do")}
            </p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Issuing authority</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.issuingAuthority}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Place of issue</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.passportPlaceOfIssue}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              Do you have a national ID card for your country of nationality ?
            </p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.isNationalIDCard ? "Yes" : "No"}</p>
          </div>

          {app?.isNationalIDCard && (
            <>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">i. National Id card Number</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.idCardNumber}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">ii. Date of issue*</p>
                <div className="border-y"></div>
                <p className="Name-text">
                  {moment(app?.idCardIssueDate).format("dddd, MMMM Do")}
                </p>
              </div>
            </>
          )}

          <div className="fill">
              <img src={star} alt="" className="star" />
              <p className="Name-title">Do you have a BRP?</p>
            <div className="border-y"></div>
              <p className="Name-text">{app?.isBrp ? "Yes" : "No"}</p>
          </div>

          {app?.isBrp && (
            <>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">i. BRP Number</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.brpNumber}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">ii. Date of issue</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.brpIssueDate}</p>
              </div>
            </>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Name of Mother</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.motherName}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Date of Birth</p>
            <div className="border-y"></div>
            <p className="Name-text">
              {moment(app?.motherDob).format("dddd, MMMM Do")}
            </p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Nationality</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.motherNationality}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Country</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.motherCountry}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Mother's Place of Birth</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.motherPlaceOfBirth}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Name of Father</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.fatherName}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Date of Birth</p>
            <div className="border-y"></div>
            <p className="Name-text">
              {moment(app?.fatherDob).format("dddd, MMMM Do")}
            </p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Nationality</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.fatherNationality}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Country</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.fatherCountry}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Father's Place of Birth</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.fatherPlaceOfBirth}</p>
          </div>

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Do you have a UK NI Number ?</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.isUKNINumber ? "Yes" : "No"}</p>
          </div>

          {app?.isUKNINumber && (
            <>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">i. UK NI Number</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.ukNINumber}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">ii. Date of issue*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.niNumberIssueDate}</p>
              </div>
            </>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Do you have a UK driving license ?</p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.isUKDrivingLicense ? "Yes" : "No"}
            </p>
          </div>

          {app?.isUKDrivingLicense && (
            <>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">i. UK driving license Number</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.ukDrivingLicenseNumber}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">ii. Date of issue*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.ukLicenseIssueDate}</p>
              </div>
            </>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Email Address*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.email}</p>
          </div>

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Mobile Number*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.mobileNumber}</p>
          </div>

          {/* Ending Main Div  */}
        </div>
      </PDFExport>

      <div className="button-container-2">
        <button
          onClick={() =>
            application?.applicationStatus === "rejected"
              ? handleRejectClick()
              : null
          }
          type="button"
          className="case-approved-option"
          style={
            application?.applicationStatus === "rejected"
              ? {
                  backgroundColor: "#DD2025",
                  width: "auto",
                  paddingLeft: "15px",
                  paddingRight: "13px",
                  border: "none",
                }
              : {
                  width: "auto",
                  paddingLeft: "15px",
                  paddingRight: "13px",
                }
          }
        >
          {application?.applicationStatus != "rejected" &&
            application?.phase === 4 &&
            application?.phaseStatus === "approved" &&
            "Case is been prepared for submission to authorities."}
          {application?.phase <= 4 &&
            application?.applicationStatus != "rejected" &&
            "Case is under Final Review"}
          {application?.applicationStatus === "rejected" &&
            "Case Rejected by case worker"}
        </button>

        <NavLink to="/message" style={{ position: "relative" }}>
          {chat && count > 0 && (
            <span
              style={{
                position: "absolute",
                right: "0",
                top: "-1rem",
                width: "26px",
                height: "26px",
                background: "red",
                borderRadius: "50%",
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "20",
              }}
            >
              {count}
            </span>
          )}
          <img src={chatbox} alt="" className="chat-icon-box" />
        </NavLink>
      </div>
    </div>
  );
};

export default GeneralFilled;
