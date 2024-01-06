import React, { useRef, useState } from 'react'
import { NavLink } from "react-router-dom";
import chatbox from "../../Assets/chat-icon.svg";
import "../../style/Phase4.css";
import "../../style/buttons.css";
import star from "../../Assets/Star-svg.svg";
import moment from "moment";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import Logo2 from "../../Assets/Ukimmigration-logo.png";


const CharacterFilled = ({data,application}) => {
     const app = data?.character;
  const [show, setShow] = useState(false);
     console.log("Character filled", app);

     const pdfRef = useRef(null);
     const exportPDFWithComponent = () => {
       if (pdfRef.current) {
         pdfRef.current.save();
       }
     };

     const handlePdfDownload = () => {
       setShow(true);
       if (pdfRef.current) {
         pdfRef.current.save();
       }
     };
  return (
    <div className="fill-data-border-phase4">
      <button
        type="button"
        onClick={handlePdfDownload}
        className="download-btn"
      >
        Download File
      </button>

      {/* Travel */}
      <PDFExport
        // forcePageBreak=".page-break"
        // scale={0.8}
        // paperSize="A4"
        margin="3cm"
        ref={pdfRef}
        fileName={`${
          application?.phase1?.name
            ? application?.phase1?.name
            : application?.phase1?.fullNameAsPassport
        }-${application?.caseId}-Phase4-Character`}
      >
        <div className="phase-1">
          {show && (
            <div className="hidden-logo" style={{ marginBottom: "10px" }}>
              <img src={Logo2} alt="" />
            </div>
          )}
          <p className="Form-data-heading">Character</p>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              Have you ever been charged with a criminal offence ?*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.everChargedWithCriminalOffence ? "Yes" : "No"}
            </p>
          </div>
          {app?.everChargedWithCriminalOffence && (
            <div className="fill">
              <img src={star} alt="" className="star" />
              <p className="Name-title">i. Please provide details*</p>
              <div className="border-y"></div>
              <p className="Name-text">{app?.reasonForCharged}</p>
            </div>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              Do you have any pending prosecutions ?*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.isPendingProsecutions ? "Yes" : "No"}
            </p>
          </div>
          {app?.isPendingProsecutions && (
            <div className="fill">
              <img src={star} alt="" className="star" />
              <p className="Name-title">i. Please provide details*</p>
              <div className="border-y"></div>
              <p className="Name-text">{app?.reasonForPendingProsecutions}</p>
            </div>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              Have you ever had any terrorist views or charged with or been
              questioned in relation to terrorist charges?*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.isTerroristViews ? "Yes" : "No"}</p>
          </div>
          {app?.isTerroristViews && (
            <div className="fill">
              <img src={star} alt="" className="star" />
              <p className="Name-title">i. Please provide details*</p>
              <div className="border-y"></div>
              <p className="Name-text">{app?.reasonForTerroristViews}</p>
            </div>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              Have you ever worked for the (Judiciary/Security Services/Media/
              Intelligence Agencies/Armed Forces) of any country?*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.isWorkedForJudiciary ? "Yes" : "No"}
            </p>
          </div>
          {app?.isWorkedForJudiciary && (
            <div className="fill">
              <img src={star} alt="" className="star" />
              <p className="Name-title">i. Please provide details*</p>
              <div className="border-y"></div>
              <p className="Name-text">{app?.reasonForJudiciaryWork}</p>
            </div>
          )}

          {/* Phase 1 div ends  */}
        </div>
      </PDFExport>
    </div>
  );
}

export default CharacterFilled