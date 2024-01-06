import React, { useRef, useState } from 'react'
import { NavLink } from "react-router-dom";
import chatbox from "../../Assets/chat-icon.svg";
import "../../style/Phase4.css";
import "../../style/buttons.css";
import star from "../../Assets/Star-svg.svg";
import moment from "moment";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";
import Logo2 from "../../Assets/Ukimmigration-logo.png";


const MaintenanceFilled = ({data,application}) => {
    const app = data?.maintenance;
  const [show, setShow] = useState(false);
    console.log("Maintenance filled", app);

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

      {/* Maintenance */}
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
        }-${application?.caseId}-Phase4-Maintenance`}
      >
        <div className="phase-1">
          {show && (
            <div className="hidden-logo" style={{ marginBottom: "10px" }}>
              <img src={Logo2} alt="" />
            </div>
          )}
          <p className="Form-data-heading">Maintenance</p>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Name of Bank*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.bankName}</p>
          </div>

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              Is it a registered recognized financial institute ?*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.isRegisteredFinancialInstitute}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Country funds held in*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.countryFundsHeldIn}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Currency funds held in?*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.currencyFundsHeldIn}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Amount held?*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.amountHeld}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Date the funds have been held from?*</p>
            <div className="border-y"></div>
            <p className="Name-text">
              {moment(app?.fundsDateHeldFrom).format("dddd, MMMM Do")}
            </p>
          </div>

          {/* Phase 1 div ends  */}
        </div>
      </PDFExport>
    </div>
  );
}

export default MaintenanceFilled