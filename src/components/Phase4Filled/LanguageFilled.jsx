import React, { useRef } from 'react'
import { NavLink } from "react-router-dom";
import chatbox from "../../Assets/chat-icon.svg";
import "../../style/Phase4.css";
import "../../style/buttons.css";
import star from "../../Assets/Star-svg.svg";
import moment from "moment";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";


const LanguageFilled = ({data,application}) => {
     const app = data?.languageProficiency;
     console.log("Language Proficiency filled", app);

      const pdfRef = useRef(null);
      const exportPDFWithComponent = () => {
        if (pdfRef.current) {
          pdfRef.current.save();
        }
      };
  return (
    <div className="fill-data-border-phase4">
      <button
        type="button"
        onClick={exportPDFWithComponent}
        className="download-btn"
      >
        Download File
      </button>

      {/* Language Proficiency */}
      <PDFExport
        forcePageBreak=".page-break"
        scale={0.8}
        paperSize="A4"
        margin="2cm"
        ref={pdfRef}
        fileName={`${application?.phase1?.name}-${application?.caseId}-Phase4-LanguageProficiency`}
      >
        <div className="phase-1">
          <p className="Form-data-heading">Language Proficiency</p>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              Do you have a degree taught in English?
            </p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.isDegreeTaughtInEnglish ? "Yes" : "No"}
            </p>
          </div>

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Have you passed any English Test?</p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.isPassedAnyEnglishTest ? "Yes" : "No"}
            </p>
          </div>

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">i. Please select the relevant test</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.testType}</p>
          </div>

          {/* Phase 1 div ends  */}
        </div>
      </PDFExport>
    </div>
  );
}

export default LanguageFilled