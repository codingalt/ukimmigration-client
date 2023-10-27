import React, { useRef } from 'react'
import { NavLink } from "react-router-dom";
import chatbox from "../../Assets/chat-icon.svg";
import "../../style/Phase4.css";
import "../../style/buttons.css";
import star from "../../Assets/Star-svg.svg";
import moment from "moment";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const AccomodationFilled = ({data}) => {
    const app = data?.accommodation;
    console.log("Accomodation filled", app);

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

      {/* Accomodation */}
      <PDFExport
        forcePageBreak=".page-break"
        scale={0.8}
        paperSize="A1"
        margin="2cm"
        ref={pdfRef}
        fileName="UkImmigration-Phase4-Accomodation"
      >
        <div className="phase-1">
          <p className="Form-data-heading">Accomodation</p>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Address 1*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.address1}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Address 2*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.address2}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Location Name*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.locationName}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Location Code*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.locationCode}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Town*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.town}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">County*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.county}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Post Code*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.postCode}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Country Prefix*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.countryPrefix}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Country*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.country}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">FAX</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.fax}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">VAT Rate</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.vatRate}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              What date did you move in ? (mm/dd/yyyy)*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">
              {moment(app?.moveInDate).format("dddd, MMMM Do")}
            </p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Time lived at current address?*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.timeLivedAtCurrentAddress}</p>
          </div>

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Is your home owned/rented/other ?*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.homeType}</p>
          </div>

          {app?.homeType != "Owned" && (
            <>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">i. Landlord's Name*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.landLordName}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">ii. Landlord's Email Address*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.landLordEmail}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">iii. Landlord's Telephone Number*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.landLordTelephone}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">iv. Landlord's Address 1*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.landLordAddress1}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">iv. Landlord's Address 2*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.landLordAddress2}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">v. Location Name*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.landLordLocationName}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">vi. Location Code</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.landLordLocationCode}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">vii. Town*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.landLordTown}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">viii. County*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.landLordCounty}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">ix. Post Code*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.landLordPostCode}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">x. Country Prefix*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.landLordCountryPrefix}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">xi. Country*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.landLordCountry}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">xii. FAX</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.landLordFax}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">xiii. VAT Rate</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.landLordVatRate}</p>
              </div>
            </>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              xiv. How many bedrooms are in your house ?*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.bedrooms}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              xv. How many other rooms are in your house ?*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.otherRooms}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              xvi. Who else lives there and their names?*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.otherWhoLives}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              Previous address details if you have lived at your address for
              less than 2 years*
            </p>
            <p className="Name-text"></p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">i. Address 1*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.previousHomeDetails?.address1}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">i. Address 2*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.previousHomeDetails?.address2}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">iii. Location Name*</p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.previousHomeDetails?.locationName}
            </p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">iv. Location Code*</p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.previousHomeDetails?.locationCode}
            </p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">v. Town*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.previousHomeDetails?.town}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">vi. County*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.previousHomeDetails?.county}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">vii. Post Code*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.previousHomeDetails?.postCode}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">viii. Country Prefix*</p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.previousHomeDetails?.countryPrefix}
            </p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">ix. Country*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.previousHomeDetails?.country}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">x. FAX</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.previousHomeDetails?.fax}</p>
          </div>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">xi. VAT Rate</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.previousHomeDetails?.vatRate}</p>
          </div>

          {/* Phase 1 Div Ends  */}
        </div>
      </PDFExport>
    </div>
  );
}

export default AccomodationFilled