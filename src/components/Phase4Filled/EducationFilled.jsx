import React, { useRef, useState } from 'react'
import { NavLink } from "react-router-dom";
import chatbox from "../../Assets/chat-icon.svg";
import "../../style/Phase4.css";
import "../../style/buttons.css";
import star from "../../Assets/Star-svg.svg";
import moment from "moment";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import Logo2 from "../../Assets/Ukimmigration-logo.png";


const EducationFilled = ({data,application}) => {
    const app = data?.education;
  const [show, setShow] = useState(false);
    console.log("Education filled", app);

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

      {/* Education */}
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
        }-${application?.caseId}-Phase4-Education`}
      >
        <div className="phase-1">
          {show && (
            <div className="hidden-logo" style={{ marginBottom: "10px" }}>
              <img src={Logo2} alt="" />
            </div>
          )}
          <p className="Form-data-heading">Education</p>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Qualification*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.qualification}</p>
          </div>

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Awarding Institute*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.awardingInstitute}</p>
          </div>

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Grade*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.grade}</p>
          </div>

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Course Subject*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.courseSubject}</p>
          </div>

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Course Length*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.courseLength}</p>
          </div>

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Year of Award*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.yearOfAward}</p>
          </div>

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Country of Award*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.countryOfAward}</p>
          </div>

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">State*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.state}</p>
          </div>

          {/* Phase 1 div ends  */}
        </div>
      </PDFExport>
    </div>
  );
}

export default EducationFilled