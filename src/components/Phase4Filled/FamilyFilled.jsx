import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import chatbox from "../../Assets/chat-icon.svg";
import "../../style/Phase4.css";
import "../../style/buttons.css";
import star from "../../Assets/Star-svg.svg";
import moment from "moment";
import { PDFExport, savePDF } from "@progress/kendo-react-pdf";

const FamilyFilled = ({ data,application }) => {
  const app = data?.family;
  console.log("Family filled", app);

  const [showModal, setShowModal] = useState(false);
  const [selectedChild, setSelectedChild] = useState(1);

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

      {/* Family */}
      <PDFExport
        forcePageBreak=".page-break"
        scale={0.8}
        paperSize="A2"
        margin="2cm"
        ref={pdfRef}
        fileName={`${application?.phase1?.name}-${application?.caseId}-Phase4-Family`}
      >
        <div className="phase-1">
          <p className="Form-data-heading">Family</p>
          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Marital Status*</p>
            <div className="border-y"></div>
            <p className="Name-text" style={{ textTransform: "capitalize" }}>
              {app?.maritalStatus}
            </p>
          </div>
          {app?.maritalStatus != "single" && (
            <>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">Name of Spouse*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.spouseName}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">Date of Marriage*</p>
                <div className="border-y"></div>
                <p className="Name-text">
                  {moment(app?.marriageDate).format("dddd, MMMM Do")}
                </p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">Where you got married*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.whereGotMarried}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">Date of birth of spouse *</p>
                <div className="border-y"></div>
                <p className="Name-text">
                  {moment(app?.spouseDob).format("dddd, MMMM Do")}
                </p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">Nationality of spouse*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.spouseNationality}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">Passport number for spouse*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.spousePassportNumber}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">Where did you meet?*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.whereDidYouMeet}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">When did your relationship began*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.whenDidRelationshipBegan}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">When you last saw each other*</p>
                <div className="border-y"></div>
                <p className="Name-text">
                  {moment(app?.whenLastSawEachOther).format("dddd, MMMM Do")}
                </p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">Do you live together ?*</p>
                <div className="border-y"></div>
                <p className="Name-text">
                  {app?.isLiveTogether ? "Yes" : "No"}
                </p>
              </div>
              {app?.isLiveTogether && (
                <>
                  {" "}
                  <div className="fill">
                    <img src={star} alt="" className="star" />
                    <p className="Name-title">
                      i. What date you started living together?*
                    </p>
                    <div className="border-y"></div>
                    <p className="Name-text">
                      {moment(app?.whichDateStartedLivingTogether).format(
                        "dddd, MMMM Do"
                      )}
                    </p>
                  </div>
                </>
              )}

              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">Do you have any children ?*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.isChildren ? "Yes" : "No"}</p>
              </div>

              {app?.isChildren && (
                <>
                  <div className="fill">
                    <img src={star} alt="" className="star" />
                    <p className="Name-title">i. Number of childes?</p>
                    <div className="border-y"></div>
                    <p className="Name-text">{app?.numberOfChildren}</p>
                    <button
                      onClick={() => setShowModal(true)}
                      style={{
                        width: "6.4rem",
                        height: "1.8rem",
                        outline: "none",
                        border: "none",
                        borderRadius: "6px",
                        background: "#5D982E",
                        color: "#fff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "10px",
                        cursor: "pointer",
                      }}
                      type="button"
                    >
                      Child Details
                    </button>
                  </div>

                  {showModal && (
                    <div className="modal active">
                      <div
                        className="modal-content"
                        //   ref={topDivRef}
                        style={{ scrollBehavior: "smooth" }}
                      >
                        <div className="child-tabs">
                          {app?.childDetails?.map((option, index) => (
                            <button
                              key={index}
                              className={`child-tab ${
                                index + 1 === selectedChild ? "active" : ""
                              }`}
                              onClick={() => setSelectedChild(index + 1)}
                              type="button"
                            >
                              Child {index + 1}
                            </button>
                          ))}
                        </div>

                        <div
                          className="child-details"
                          style={{ display: "flex", width: "100%" }}
                        >
                          <div
                            className="fill-data-border-phase4"
                            style={{
                              width: "97%",
                              height: "100%",
                              top: "5rem",
                              borderRadius: "5px",
                              left: "0",
                              right: "0",
                              marginLeft: "auto",
                              marginRight: "auto",
                              border: "none",
                            }}
                          >
                            <div className="phase-1">
                              <p
                                className="Form-data-heading"
                                style={{
                                  fontSize: ".9rem",
                                  marginTop: "10px",
                                  marginBottom: "10px",
                                }}
                              >
                                Child Details
                              </p>
                              {app?.childDetails?.map((item, index) => (
                                <>
                                  {index + 1 === selectedChild && (
                                    <>
                                      <div className="fill">
                                        <img
                                          src={star}
                                          alt=""
                                          className="star"
                                        />
                                        <p className="Name-title">
                                          ii. Child's Name*
                                        </p>
                                        <div className="border-y"></div>
                                        <p className="Name-text">
                                          {item?.childName}
                                        </p>
                                      </div>
                                      <div className="fill">
                                        <img
                                          src={star}
                                          alt=""
                                          className="star"
                                        />
                                        <p className="Name-title">
                                          iii. Gender
                                        </p>
                                        <div className="border-y"></div>
                                        <p className="Name-text">
                                          {item?.childGender}
                                        </p>
                                      </div>
                                      <div className="fill">
                                        <img
                                          src={star}
                                          alt=""
                                          className="star"
                                        />
                                        <p className="Name-title">
                                          iv. Date of Birth*
                                        </p>
                                        <div className="border-y"></div>
                                        <p className="Name-text">
                                          {moment(item?.childDob).format(
                                            "dddd, MMMM Do"
                                          )}
                                        </p>
                                      </div>
                                      <div className="fill">
                                        <img
                                          src={star}
                                          alt=""
                                          className="star"
                                        />
                                        <p className="Name-title">
                                          v. Nationality of Child*
                                        </p>
                                        <div className="border-y"></div>
                                        <p className="Name-text">
                                          {item?.childNationality}
                                        </p>
                                      </div>

                                      <div className="fill">
                                        <img
                                          src={star}
                                          alt=""
                                          className="star"
                                        />
                                        <p className="Name-title">
                                          vii. Passport Number*
                                        </p>
                                        <div className="border-y"></div>
                                        <p className="Name-text">
                                          {item?.childPassportNumber}
                                        </p>
                                      </div>
                                      <div className="fill">
                                        <img
                                          src={star}
                                          alt=""
                                          className="star"
                                        />
                                        <p className="Name-title">
                                          viii. Passport Issued Date*
                                        </p>
                                        <div className="border-y"></div>
                                        <p className="Name-text">
                                          {item?.childPassportIssueDate
                                            ? moment(
                                                item?.childPassportIssueDate
                                              ).format("dddd, MMMM Do")
                                            : ""}
                                        </p>
                                      </div>
                                      <div className="fill">
                                        <img
                                          src={star}
                                          alt=""
                                          className="star"
                                        />
                                        <p className="Name-title">
                                          ix. Passport Expiry Date*
                                        </p>
                                        <div className="border-y"></div>
                                        <p className="Name-text">
                                          {item?.childPassportExpiryDate
                                            ? moment(
                                                item?.childPassportExpiryDate
                                              ).format("dddd, MMMM Do")
                                            : ""}
                                        </p>
                                      </div>

                                      <div className="fill">
                                        <img
                                          src={star}
                                          alt=""
                                          className="star"
                                        />
                                        <p className="Name-title">
                                          xii. Visa Issued Date*
                                        </p>
                                        <div className="border-y"></div>
                                        <p className="Name-text">
                                          {item?.childVisaIssueDate
                                            ? moment(
                                                item?.childVisaIssueDate
                                              ).format("dddd, MMMM Do")
                                            : ""}
                                        </p>
                                      </div>
                                      <div className="fill">
                                        <img
                                          src={star}
                                          alt=""
                                          className="star"
                                        />
                                        <p className="Name-title">
                                          xii. Visa Expiry Date*
                                        </p>
                                        <div className="border-y"></div>
                                        <p className="Name-text">
                                          {item?.childVisaExpiryDate
                                            ? moment(
                                                item?.childVisaExpiryDate
                                              ).format("dddd, MMMM Do")
                                            : ""}
                                        </p>
                                      </div>
                                    </>
                                  )}
                                </>
                              ))}
                              <button
                                type="button"
                                className="Close-btn-modal"
                                style={{
                                  marginLeft: "auto",
                                  display: "flex",
                                  justifySelf: "flex-end",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  marginBottom: "1rem",
                                  position: "absolute",
                                  bottom: "13%",
                                  right: "5%",
                                }}
                                onClick={() => setShowModal(false)}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">Have you been married before ?*</p>
            <div className="border-y"></div>
            <p className="Name-text">{app?.isMarriedBefore ? "Yes" : "No"}</p>
          </div>

          {app?.isMarriedBefore && (
            <>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">i. Name of Ex*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.exName}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">ii. Date of Birth (mm/dd/yyyy)*</p>
                <div className="border-y"></div>
                <p className="Name-text">
                  {moment(app?.exDob).format("dddd, MMMM Do")}
                </p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">iii. Nationality ?*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.exNationality}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">iv. Date of Marriage (mm/dd/yyyy)*</p>
                <div className="border-y"></div>
                <p className="Name-text">
                  {moment(app?.marriageDateWithEx).format("dddd, MMMM Do")}
                </p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">v. Date of Divorce (mm/dd/yyyy)*</p>
                <div className="border-y"></div>
                <p className="Name-text">
                  {moment(app?.divorceDateWithEx).format("dddd, MMMM Do")}
                </p>
              </div>
            </>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              Has your current partner been married before?*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.isCurrentPartnerMarriedBefore ? "Yes" : "No"}
            </p>
          </div>

          {app?.isCurrentPartnerMarriedBefore && (
            <>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">i. Name of Ex-Partner*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.currentPartnerExName}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">ii. Date of Birth*</p>
                <div className="border-y"></div>
                <p className="Name-text">
                  {moment(app?.currentPartnerExDob).format("dddd, MMMM Do")}
                </p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">iii. Nationality ?*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.currentPartnerExNationality}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">iv. Date of Marriage*</p>
                <div className="border-y"></div>
                <p className="Name-text">
                  {moment(app?.currentPartnerExMarriageDate).format(
                    "dddd, MMMM Do"
                  )}
                </p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">v. Date of Divorce*</p>
                <div className="border-y"></div>
                <p className="Name-text">
                  {moment(app?.currentPartnerExDivorceDate).format(
                    "dddd, MMMM Do"
                  )}
                </p>
              </div>
            </>
          )}

          <div className="fill">
            <img src={star} alt="" className="star" />
            <p className="Name-title">
              What family/friends do you have in your home country ?*
            </p>
            <div className="border-y"></div>
            <p className="Name-text">
              {app?.isFamilyFriendsInHomeCountry ? "Yes" : "No"}
            </p>
          </div>

          {app?.isFamilyFriendsInHomeCountry && (
            <>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">i. Name of Relative*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.relativeName}</p>
              </div>
              <div className="fill">
                <img src={star} alt="" className="star" />
                <p className="Name-title">ii. Relationship*</p>
                <div className="border-y"></div>
                <p className="Name-text">{app?.relationship}</p>
              </div>
            </>
          )}

          {/* Phase 1 Div Ends  */}
        </div>
      </PDFExport>
    </div>
  );
};

export default FamilyFilled;
