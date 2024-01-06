import React, { useEffect, useState, useRef, useContext, useMemo } from "react";
import Logo2 from "../Assets/Ukimmigration-logo.png";
import bellicon2 from "../Assets/bell-icon-svg.svg";
import profileimg from "../Assets/profile-img-svg.svg";
import dropdownicon from "../Assets/dropdown-icon-svg.svg";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "../style/filldata.css";
import star from "../Assets/Star-svg.svg";
import NotificationBox from "./Notification";
import SettingBox from "./Settingbox";
import chatbox from "../Assets/chat-icon.svg";
import { useGetApplicationByUserIdQuery } from "../services/api/applicationApi";
import moment from "moment";
import PDfimg from "../Assets/pdf-img.png";
import Navbar from "./Navbar";
import { usePDF } from "react-to-pdf";
import { useReactToPrint } from "react-to-print";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from "./Documents/PDF";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { renderToString } from "react-dom/server";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import MainContext from "./Context/MainContext";
import { useGetCompanyDetailsByIdQuery, useGetGroupClientAppByUserIdQuery } from "../services/api/companyClient";
import { useSelector } from "react-redux";
import { useGetUserChatsQuery, useGetUserMessagesQuery, useReadMessagesByChatMutation } from "../services/api/chatApi";
import RejectpopupGroup from "./RejectPopupGroup";
import Rejectpopup from "./Rejectpopup";

const GroupFilledData = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;
  const { user } = useSelector((state) => state.user);
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
  
  const { toPDF, targetRef } = usePDF({ filename: "ukimmigration.pdf" });
  const { socket } = useContext(MainContext);
  const [received, setReceived] = useState(null);
  const { messageCount } = useSelector((state) => state.user);

  const pdfRef = useRef(null);
  const pdfExportComponent = useRef(null);
  const generatePDF = () => {
    let element = pdfRef.current || document.body;
    savePDF(element, {
      paperSize: "A3",
      margin: "2cm",
      fileName: `UkImmigration`,
    });
  };
  const exportPDFWithComponent = () => {
    if (pdfExportComponent.current) {
      pdfExportComponent.current.save();
    }
  };

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "UK Immigration",
  });

  const { data, isLoading, refetch, isFetching } =
    useGetGroupClientAppByUserIdQuery(null, {
      refetchOnMountOrArgChange: true,
    });
  const application = data?.application;

  const { data: company } = useGetCompanyDetailsByIdQuery(
    data?.application?.companyId,
    { skip: !data?.application?.companyId }
  );

  useEffect(() => {
    socket.on("phase notification received", (phaseNoti) => {
      setReceived(phaseNoti);
      console.log("phase notification received application", phaseNoti);
    });
  });

  useEffect(() => {
    if (received) {
      refetch();
    }
  }, [received]);

  useEffect(()=>{
      if (data) {
        if (data?.application?.phaseSubmittedByClient > 3) {
          setShow(false);
          navigate("/phase4/group/data");
        } else {
          setShow(true);
        }
      }
    },[data]);

  const handleRejectClick = () => {
    setIsReject(true);
    setCompanyId(true);
  };

  const handlePdfDownload = () => {
    setShow(true);
    if (pdfRef.current) {
      pdfRef.current.save();
    }
  };

  return (
    <div className="Container-forgetpassword-phase1">
      {companyId
        ? isReject && <RejectpopupGroup show={isReject} setShow={setIsReject} />
        : isReject && <Rejectpopup show={isReject} setShow={setIsReject} />}
      <Navbar />
      <div className="Forgetpassword-sub-2" ref={targetRef}>
        <div className="fill-data-border">
          <button onClick={handlePdfDownload} className="download-btn">
            Download File
          </button>

          <PDFExport
            // scale={0.8}
            // paperSize="A2"
            margin="2cm"
            ref={pdfRef}
            fileName={`${application?.phase1?.fullNameAsPassport}-${application?.caseId}`}
          >
            {show && (
              <div className="hidden-logo" style={{ marginLeft:"31px",marginBottom:"-36px" }}>
                <img src={Logo2} alt="" />
              </div>
            )}
            <div
              className="Group-dataa-main"
              style={{ flexDirection: "column" }}
            >
              <p className="req-term-con-text"> Company Details</p>

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
            </div>

            {/* Phase 1 */}

            <div>
              <div
                className="phase-1"
                style={{
                  width: "2000px",
                  // height: "1200px",
                }}
              >
                <p className="Form-data-heading">Form Phase (i)</p>
                <div
                  className="fill"
                  style={{
                    display: "flex",
                    width: "1100px",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <img src={star} alt="" className="star" />
                  <p className="Name-title">
                    Full name as it appears in the passport
                  </p>
                  <div className="border-y"></div>
                  <p className="Name-text">
                    {application?.phase1?.fullNameAsPassport}
                  </p>
                </div>
                <div
                  className="fill"
                  style={{
                    display: "flex",
                    width: "1100px",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <img src={star} alt="" className="star" />
                  <p className="Name-title">Full Postal Address</p>
                  <div className="border-y"></div>
                  <p className="Name-text">
                    {application?.phase1?.postalAddress}
                  </p>
                </div>
                <div
                  className="fill"
                  style={{
                    display: "flex",
                    width: "1100px",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <img src={star} alt="" className="star" />
                  <p className="Name-title">Date of Birth</p>
                  <div className="border-y"></div>
                  <p className="Name-text">
                    {moment(application?.phase1?.birthDate).format(
                      "dddd, MMMM Do"
                    )}
                  </p>
                </div>
                <div
                  className="fill"
                  style={{
                    display: "flex",
                    width: "1100px",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <img src={star} alt="" className="star" />
                  <p className="Name-title">Nationality</p>
                  <div className="border-y"></div>
                  <p className="Name-text">
                    {application?.phase1?.nationality}
                  </p>
                </div>
                <div
                  className="fill"
                  style={{
                    display: "flex",
                    width: "1100px",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <img src={star} alt="" className="star" />
                  <p className="Name-title">Passport Number</p>
                  <div className="border-y"></div>
                  <p className="Name-text">
                    {application?.phase1?.passportNumber}
                  </p>
                </div>
              </div>

              {/* Phase 2  */}
              {application?.phaseSubmittedByClient > 1 &&
                application?.phase2?.status != "rejected" && (
                  <div
                    className="Phase-2"
                    style={{
                      width: "1300px",
                      // height: "700px",
                    }}
                  >
                    <p className="Form-data-heading">Form Phase (ii)</p>
                    {application?.phase2?.passport && (
                      <div
                        className="fill"
                        style={{
                          display: "flex",
                          width: "1100px",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <img src={star} alt="" className="star" />
                        <p className="Name-title">PASSPORT</p>
                        <div className="border-y"></div>
                        <p className="Name-text">
                          <a
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "18px",
                            }}
                            href={`${import.meta.env.VITE_IMG_URI}${
                              application?.phase2?.passport
                            }`}
                            target="_blank"
                          >
                            {application?.phase2?.passport?.split("/Uploads/")}{" "}
                            <img src={PDfimg} alt="" />
                          </a>
                        </p>
                      </div>
                    )}

                    {application?.phase2?.dependantPassport && (
                      <div
                        className="fill"
                        style={{
                          display: "flex",
                          width: "1100px",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <img src={star} alt="" className="star" />
                        <p className="Name-title">DEPENDANT PASSPORT</p>
                        <div className="border-y"></div>
                        <p className="Name-text">
                          <a
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "18px",
                            }}
                            href={`${import.meta.env.VITE_IMG_URI}${
                              application?.phase2?.dependantPassport
                            }`}
                            target="_blank"
                          >
                            {application?.phase2?.dependantPassport?.split(
                              "/Uploads/"
                            )}{" "}
                            <img src={PDfimg} alt="" />
                          </a>
                        </p>
                      </div>
                    )}

                    {application?.phase2?.utilityBill && (
                      <div
                        className="fill"
                        style={{
                          display: "flex",
                          width: "1100px",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <img src={star} alt="" className="star" />
                        <p className="Name-title">UTILITY BILL</p>
                        <div className="border-y"></div>
                        <p className="Name-text">
                          <a
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "18px",
                            }}
                            href={`${import.meta.env.VITE_IMG_URI}${
                              application?.phase2?.utilityBill
                            }`}
                            target="_blank"
                          >
                            {application?.phase2?.utilityBill?.split(
                              "/Uploads/"
                            )}{" "}
                            <img src={PDfimg} alt="" />
                          </a>
                        </p>
                      </div>
                    )}

                    {application?.phase2?.brp && (
                      <div
                        className="fill"
                        style={{
                          display: "flex",
                          width: "1100px",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <img src={star} alt="" className="star" />
                        <p className="Name-title">BRP</p>
                        <div className="border-y"></div>
                        <p className="Name-text">
                          <a
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "18px",
                            }}
                            href={`${import.meta.env.VITE_IMG_URI}${
                              application?.phase2?.brp
                            }`}
                            target="_blank"
                          >
                            {application?.phase2?.brp?.split("/Uploads/")}{" "}
                            <img src={PDfimg} alt="" />
                          </a>
                        </p>
                      </div>
                    )}

                    {application?.phase2?.previousVisaVignettes && (
                      <div
                        className="fill"
                        style={{
                          display: "flex",
                          width: "1100px",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <img src={star} alt="" className="star" />
                        <p className="Name-title">PREVIOUS VISA VIGNETTES</p>
                        <div className="border-y"></div>
                        <p className="Name-text">
                          <a
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "18px",
                            }}
                            href={`${import.meta.env.VITE_IMG_URI}${
                              application?.phase2?.previousVisaVignettes
                            }`}
                            target="_blank"
                          >
                            {application?.phase2?.previousVisaVignettes?.split(
                              "/Uploads/"
                            )}{" "}
                            <img src={PDfimg} alt="" />
                          </a>
                        </p>
                      </div>
                    )}

                    {application?.phase2?.refusalLetter && (
                      <div
                        className="fill"
                        style={{
                          display: "flex",
                          width: "1100px",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <img src={star} alt="" className="star" />
                        <p className="Name-title">REFUSAL LETTER</p>
                        <div className="border-y"></div>
                        <p className="Name-text">
                          <a
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "18px",
                            }}
                            href={`${import.meta.env.VITE_IMG_URI}${
                              application?.phase2?.refusalLetter
                            }`}
                            target="_blank"
                          >
                            {application?.phase2?.refusalLetter?.split(
                              "/Uploads/"
                            )}{" "}
                            <img src={PDfimg} alt="" />
                          </a>
                        </p>
                      </div>
                    )}

                    {application?.phase2?.educationCertificates && (
                      <div
                        className="fill"
                        style={{
                          display: "flex",
                          width: "1100px",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <img src={star} alt="" className="star" />
                        <p className="Name-title">EDUCATION CERTIFICATES</p>
                        <div className="border-y"></div>
                        <p className="Name-text">
                          <a
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "18px",
                            }}
                            href={`${import.meta.env.VITE_IMG_URI}${
                              application?.phase2?.educationCertificates
                            }`}
                            target="_blank"
                          >
                            {application?.phase2?.educationCertificates?.split(
                              "/Uploads/"
                            )}{" "}
                            <img src={PDfimg} alt="" />
                          </a>
                        </p>
                      </div>
                    )}

                    {application?.phase2?.englishLanguageCertificate && (
                      <div
                        className="fill"
                        style={{
                          display: "flex",
                          width: "1100px",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <img src={star} alt="" className="star" />
                        <p className="Name-title">
                          EGLISH LANGUAGE CERTIFICATES
                        </p>
                        <div className="border-y"></div>
                        <p className="Name-text">
                          <a
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "18px",
                            }}
                            href={`${import.meta.env.VITE_IMG_URI}${
                              application?.phase2?.englishLanguageCertificate
                            }`}
                            target="_blank"
                          >
                            {application?.phase2?.englishLanguageCertificate?.split(
                              "/Uploads/"
                            )}{" "}
                            <img src={PDfimg} alt="" />
                          </a>
                        </p>
                      </div>
                    )}

                    {application?.phase2?.marriageCertificate && (
                      <div
                        className="fill"
                        style={{
                          display: "flex",
                          width: "1100px",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <img src={star} alt="" className="star" />
                        <p className="Name-title">MARRIAGE CERTIFICATE</p>
                        <div className="border-y"></div>
                        <p className="Name-text">
                          <a
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "18px",
                            }}
                            href={`${import.meta.env.VITE_IMG_URI}${
                              application?.phase2?.marriageCertificate
                            }`}
                            target="_blank"
                          >
                            {application?.phase2?.marriageCertificate?.split(
                              "/Uploads/"
                            )}{" "}
                            <img src={PDfimg} alt="" />
                          </a>
                        </p>
                      </div>
                    )}

                    {application?.phase2?.bankStatements && (
                      <div
                        className="fill"
                        style={{
                          display: "flex",
                          width: "1100px",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <img src={star} alt="" className="star" />
                        <p className="Name-title">BANK STATEMENTS</p>
                        <div className="border-y"></div>
                        <p className="Name-text">
                          <a
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "18px",
                            }}
                            href={`${import.meta.env.VITE_IMG_URI}${
                              application?.phase2?.bankStatements
                            }`}
                            target="_blank"
                          >
                            {application?.phase2?.bankStatements?.split(
                              "/Uploads/"
                            )}{" "}
                            <img src={PDfimg} alt="" />
                          </a>
                        </p>
                      </div>
                    )}

                    {application?.phase2?.other.length > 0 && (
                      <div
                        className="fill"
                        style={{
                          display: "flex",
                          width: "1100px",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <img src={star} alt="" className="star" />
                        <p className="Name-title">OTHERS*</p>
                        <div className="border-y"></div>
                        <p className="Name-text">
                          {application?.phase2?.other?.map((item) => (
                            <a
                              key={item}
                              style={{
                                textDecoration: "underline",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: "18px",
                              }}
                              href={`${import.meta.env.VITE_IMG_URI}${item}`}
                              target="_blank"
                            >
                              <span key={item}>{item?.split("/Uploads/")}</span>

                              <img src={PDfimg} alt="" />
                            </a>
                          ))}{" "}
                        </p>
                      </div>
                    )}
                  </div>
                )}

              {/* phase 3  */}
              {application?.phaseSubmittedByClient > 2 && (
                <div
                  className="phase-3"
                  style={{
                    width: "1300px",
                  }}
                >
                  <p className="Form-data-heading">Form Phase (iii)</p>
                  {application?.phase3?.isOnlinePayment && (
                    <div
                      className="fill"
                      style={{
                        display: "flex",
                        width: "1100px",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <img src={star} alt="" className="star" />
                      <p className="Name-title">PAYMENT RECEIPT</p>
                      <div className="border-y"></div>
                      <p className="Name-text">
                        <a
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          href={application?.phase3?.onlinePaymentEvidence}
                          target="_blank"
                          download={true}
                        >
                          Download Receipt
                        </a>
                        <img src={PDfimg} alt="" />
                      </p>
                    </div>
                  )}
                  {application?.phase3?.paymentEvidence && (
                    <div
                      className="fill"
                      style={{
                        display: "flex",
                        width: "1100px",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <img src={star} alt="" className="star" />
                      <p className="Name-title">PAYMENT RECEIPT</p>
                      <div className="border-y"></div>
                      <p className="Name-text">
                        <a
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                          href={`${import.meta.env.VITE_IMG_URI}${
                            application?.phase3?.paymentEvidence
                          }`}
                          target="_blank"
                          download={true}
                        >
                          Download Receipt
                        </a>
                        <img src={PDfimg} alt="" />
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </PDFExport>

          <div className="button-container-2">
            <NavLink to="#">
              <button
                onClick={() =>
                  application?.applicationStatus === "rejected"
                    ? handleRejectClick()
                    : null
                }
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
                        // width: "auto",
                        minWidth: "11rem",
                        paddingLeft: "15px",
                        paddingRight: "13px",
                      }
                }
              >
                {application?.applicationStatus != "rejected" &&
                  application?.phase === 4 &&
                  application?.phaseStatus === "approved" &&
                  "Case is been Prepared for Submission to Authorities."}
                {application?.phase <= 4 &&
                  application?.applicationStatus != "rejected" &&
                  "Case is under Final Review"}
                {application?.applicationStatus === "rejected" &&
                  "Case Rejected by case worker"}
              </button>
            </NavLink>
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
      </div>
    </div>
  );
};

export default GroupFilledData;
