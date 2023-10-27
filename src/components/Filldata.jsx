import React, { useEffect, useState, useRef } from 'react';
import Logo2 from '../Assets/Ukimmigration-logo.png';
import bellicon2 from "../Assets/bell-icon-svg.svg"
import profileimg from "../Assets/profile-img-svg.svg"
import dropdownicon from "../Assets/dropdown-icon-svg.svg"
import { Link, NavLink } from 'react-router-dom';
import "../style/filldata.css"
import star from "../Assets/Star-svg.svg"
import NotificationBox from './Notification';
import SettingBox from "./Settingbox"
import chatbox from "../Assets/chat-icon.svg"
import { useGetApplicationByUserIdQuery } from '../services/api/applicationApi';
import moment from "moment";
import PDfimg from "../Assets/pdf-img.png";
import Navbar from './Navbar';
import { usePDF } from "react-to-pdf";
import { useReactToPrint } from "react-to-print";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDF from './Documents/PDF';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { renderToString } from "react-dom/server";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";


const Filldata = () => {
   const { toPDF, targetRef } = usePDF({ filename: "ukimmigration.pdf" });

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
     documentTitle: "UK Immigration"
   });

   const {data,isLoading} = useGetApplicationByUserIdQuery();
   const application = data?.application;
   console.log(application);


  return (
    <div className="Container-forgetpassword-phase1">
      <Navbar />
      <div className="Forgetpassword-sub-2" ref={targetRef}>
        <div className="fill-data-border">

          <button
            onClick={() => {
              if (pdfRef.current) {
                pdfRef.current.save();
              }
            }}
            className="download-btn"
          >
            Download File
          </button>

          {/* Phase 1 */}
          <PDFExport
            // forcePageBreak=".page-break"
            scale={0.8}
            paperSize="A3"
            margin="2cm"
            ref={pdfRef}   
            fileName='UkImmigration'
          >
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
                  <p className="Name-title">Name</p>
                  <div className="border-y"></div>
                  <p className="Name-text">{application?.phase1?.name}</p>
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
                  <p className="Name-title">Email</p>
                  <div className="border-y"></div>
                  <p className="Name-text">{application?.phase1?.email}</p>
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
                  <p className="Name-title">Contact</p>
                  <div className="border-y"></div>
                  <p className="Name-text">{application?.phase1?.contact}</p>
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
                  <p className="Name-title">Date Of Birth</p>
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
                  <p className="Name-title">Country</p>
                  <div className="border-y"></div>
                  <p className="Name-text">{application?.phase1?.country}</p>
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
                  <p className="Name-title">
                    Do you have residence in this country?*
                  </p>
                  <div className="border-y"></div>
                  <p className="Name-text">
                    {application?.phase1?.sameResidence ? "Yes" : "No"}
                  </p>
                </div>

                {application?.phase1?.sameResidence && (
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
                      If Yes, what type of permission do you have to be in the
                      country?
                    </p>
                    <div className="border-y"></div>
                    <p className="Name-text">
                      {application?.phase1?.permissionInCountry}
                    </p>
                  </div>
                )}

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
                  <p className="Name-title">Do you speak English?*</p>
                  <div className="border-y"></div>
                  <p className="Name-text">
                    {application?.phase1?.speakEnglish ? "Yes" : "No"}
                  </p>
                </div>

                {application?.phase1?.speakEnglish && (
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
                      If Yes, what level of proficiency?
                    </p>
                    <div className="border-y"></div>
                    <p className="Name-text">
                      {application?.phase1?.proficiency}
                    </p>
                  </div>
                )}

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
                    What other languages do you speak?
                  </p>
                  <div className="border-y"></div>
                  {application?.phase1?.otherLanguagesSpeak?.map((item) => (
                    <p key={item} className="Name-text">
                      {item},
                    </p>
                  ))}
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
                  <p className="Name-title">
                    Have you ever been refused a visa/entry to any country in
                    the world?
                  </p>
                  <div className="border-y"></div>
                  <p className="Name-text">
                    {application?.phase1.isRefusedVisaEntry ? "Yes" : "No"}
                  </p>
                </div>

                {application?.phase1.isRefusedVisaEntry && (
                  <>
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
                        if yes, please provide type of visa refused
                      </p>
                      <div className="border-y"></div>
                      <p className="Name-text">
                        {application?.phase1?.refusedVisaType}
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
                      <p className="Name-title">Date</p>
                      <div className="border-y"></div>
                      <p className="Name-text">
                        {moment(application?.phase1?.refusedVisaDate).format(
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
                      <p className="Name-title">
                        if yes, please provide type of visa refused reason
                      </p>
                      <div className="border-y"></div>
                      <p className="Name-text">
                        {application?.phase1?.refusedVisaReason}
                      </p>
                    </div>
                  </>
                )}

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
                    Please provide in your own words how we can help you?
                  </p>
                  <div className="border-y"></div>
                  <p className="Name-text">{application?.phase1?.message}</p>
                </div>
              </div>

              {/* Phase 2  */}
              {application?.phaseSubmittedByClient > 1 && (
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
                          {application?.phase2?.utilityBill?.split("/Uploads/")}{" "}
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
                      <p className="Name-title">EGLISH LANGUAGE CERTIFICATES</p>
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

                  {application?.phase2?.other && (
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
            <NavLink to="">
              <button className="case-approved-option">
                case is under final Review{" "}
              </button>
            </NavLink>
            <NavLink to="/message">
              <img src={chatbox} alt="" className="chat-icon-box" />
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filldata