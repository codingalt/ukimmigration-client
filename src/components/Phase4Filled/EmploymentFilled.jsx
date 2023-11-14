import React, { useRef } from 'react'
import { NavLink } from "react-router-dom";
import chatbox from "../../Assets/chat-icon.svg";
import "../../style/Phase4.css";
import "../../style/buttons.css";
import star from "../../Assets/Star-svg.svg";
import moment from "moment";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const EmploymentFilled = ({data,application}) => {
    const app = data?.employment;
    console.log("Employment filled", app);

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

      {/* Employment */}
      <PDFExport
        forcePageBreak=".page-break"
        scale={0.8}
        paperSize="A2"
        margin="2cm"
        ref={pdfRef}
        fileName={`${application?.phase1?.name}-${application?.caseId}-Phase4-Employment`}
      >
        <div className="phase-1">
          <p className="Form-data-heading">Employment</p>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Are you (Employed/Self-Employed)?*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.isEmployed ? "Yes" : "No"}</p>
          </div>

          {app?.isEmployed && (
            <>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">i. When did you start your job ?*</p>
                <div className="border-y"></div>
                <p className="Name-text">
                  {moment(app?.jobStartDate).format("dddd, MMMM Do")}
                </p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">
                  ii. What is the name of your employer ?*
                </p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.employerName}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">
                  iii. Telephone number of your employer*
                </p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.employerTelephone}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">
                  iv. Email address of your employer*
                </p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.employerEmail}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">v. What is your annual salary*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.annualSalary}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">vi. What is your job title?*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.jobTitle}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">
                  Please provide your employer's address{" "}
                </p>
                {/* <div className="border-y"></div> */}
                <p className="Name-text"></p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">i. Address 1*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.employerAddress1}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">ii. Address 2*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.employerAddress2}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">iii. Location Name*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.employerLocation}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">iv. Location Code</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.employerLocationCode}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">v. Town</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.employerTown}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">vi. County*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.employerCounty}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">vii. Post Code*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.employerPostCode}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">viii. Country Prefix*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.employerCountryPrefix}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">ix. Country*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.employerCountry}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">x. FAX</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.employerFax}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">xi. VAT Rate</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.employerVatRate}</p>
              </div>
            </>
          )}

          {/* Phase 1 ends  */}
        </div>
      </PDFExport>
    </div>
  );
}

export default EmploymentFilled