import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom';
import chatbox from "../../Assets/chat-icon.svg";
import "../../style/Phase4.css";
import "../../style/buttons.css";
import star from "../../Assets/Star-svg.svg";
import moment from 'moment';
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const GeneralFilled = ({data}) => {
    const app = data?.general;
    console.log("General filled", app);
    
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

      {/* Genral */}
      <PDFExport
        forcePageBreak=".page-break"
        scale={0.8}
        paperSize="A2"
        margin="2cm"
        ref={pdfRef}
        fileName="UkImmigration-Phase4-General"
      >
        <div className="phase-1 phase1-general">
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
        <button type="button" className="case-approved-option">
          case is under final Review{" "}
        </button>
        <NavLink to="/message">
          <img src={chatbox} alt="" className="chat-icon-box" />
        </NavLink>
      </div>
    </div>
  );
}

export default GeneralFilled