import React, { useEffect, useRef, useState } from "react";
import "../style/forgetpassword.css";
import { Link, useNavigate } from "react-router-dom";
import "../style/companyselct.css";
import uni from "../Assets/universty-placement.svg";
import imigrationmatter from "../Assets/imigartion-matters.svg";
import others from "../Assets/others-img.svg";
import { useGetApplicationByUserIdQuery } from "../services/api/applicationApi";
import { useDispatch, useSelector } from "react-redux";
import { setApplicationTypeToSlice } from "../services/redux/userSlice";
import { toastError } from "./Toast";
import { useGetGroupClientAppByUserIdQuery } from "../services/api/companyClient";
const CompanyScreen = () => {
  const { user } = useSelector((state) => state.user);
  const { data, isLoading, error, isSuccess } =
    useGetApplicationByUserIdQuery();

  const {
    data: groupApp,
    isLoading: isLoadingGroup,
    isSuccess: isSuccessGroup,
  } = useGetGroupClientAppByUserIdQuery(null, {
    refetchOnMountOrArgChange: true,
  });

  const [show, setShow] = useState(true);
  const [applicationType, setApplicationType] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      if (user?.isGroupClient) {
        // Group client checks
        if (groupApp && !groupApp.application) {
          setShow(false);
          !isLoadingGroup && navigate("/group/phase1");
        } else if (
          groupApp?.application?.phase === 4 &&
          groupApp?.application?.phaseStatus === "approved"
        ) {
          !isLoadingGroup && navigate("/phase4/group/data");
        } else if (groupApp?.application?.phaseSubmittedByClient >= 1) {
          setShow(false);
          !isLoadingGroup && navigate("/group/filldata");
        } else if (groupApp?.application?.phaseSubmittedByClient === 0) {
          setShow(false);
          !isLoadingGroup && navigate("/group/phase1");
        }
        return;
      } else {
        // Single Client checks
        if (data && !data.application) {
          setShow(true);
        } else if (
          data?.application?.phase === 4 &&
          data?.application?.phaseStatus === "approved"
        ) {
          !isLoading && navigate("/phase4/data");
        } else if (data?.application?.phaseSubmittedByClient >= 1) {
          setShow(false);
          !isLoading && navigate("/filldata");
        } else if (data?.application?.phaseSubmittedByClient === 0) {
          setShow(false);
          !isLoading && navigate("/phase1");
        }
      }
    }
  }, [data, isLoading, isSuccess, isLoadingGroup, isSuccessGroup, user]);

  const handleClick = (value) => {
    setApplicationType(value);
    dispatch(setApplicationTypeToSlice(value));
    localStorage.setItem("phase1-applicationType", value);
  };

  const handleNext = () => {
    if (applicationType === "") {
      toastError("Please Select Service Type");
      return;
    }
    navigate("/phase1");
  };

  const selectRef = useRef();

  const openSelectDropdown = () => {
    selectRef.current.click();
  };

  return (
    <>
      {show && (
        <div className="Container-forgetpassword">
          <div className="Forgetpassword-sub">
            <div className="company-confirm">
              <p className="confirmation-text">
                Please confirm how we can help you today
              </p>
            </div>

            <div className="comapny-boxes">
              <div
                className="profile-box-1"
                onClick={() => handleClick("University Placement")}
              >
                <div
                  className="sponser-li"
                  style={
                    applicationType === "University Placement"
                      ? { border: "1.5px solid #5d982e" }
                      : {}
                  }
                >
                  <img src={uni} alt="" className="company-imgss-1" />
                </div>

                <div className="title-space">
                  <p className="company-titles-1">University Placement</p>
                </div>
              </div>

              <div
                className="profile-box-1"
                onClick={() => handleClick("Immigration Matter")}
              >
                <div
                  className="sponser-li"
                  style={
                    applicationType === "Immigration Matter"
                      ? { border: "1.5px solid #5d982e" }
                      : {}
                  }
                >
                  <img
                    src={imigrationmatter}
                    alt=""
                    className="company-imgss-1"
                  />
                </div>

                <div className="title-space">
                  <p className="company-titles-1">Immigration Matter</p>
                </div>
              </div>

              <div className="profile-box-1">
                <div
                 style={
                  applicationType === "Other"
                    ? { border: "1.5px solid #5d982e" }
                    : {}
                }
                  ref={selectRef}
                  className="sponser-li"
                  onClick={() => handleClick('Other')}
                >
                  <img src={others} alt="" className="company-imgss-1" />
                </div>
                <div className="title-space">
                  <p className="company-titles-2">Other</p>
                </div>
{/* 
                <select
                  ref={selectRef}
                  className="title-space-option"
                  onChange={(e) => handleClick(e.target.value)}
                >
                  <option value="">Other</option>
                  <option value="AN1 – Naturalisation">
                    AN1 – Naturalisation{" "}
                  </option>
                  <option value="MN1 – Registration">
                    MN1 – Registration{" "}
                  </option>
                  <option value="ILR – Indefinite Leave to Remain">
                    ILR – Indefinite Leave to Remain
                  </option>
                  <option value="FLR – Further Leave to Remain">
                    FLR – Further Leave to Remain{" "}
                  </option>
                  <option value="FLR(FP)">FLR(FP)</option>
                  <option value="FLR(M)">FLR(M) </option>
                  <option value="SW – Skilled Worker">
                    SW – Skilled Worker{" "}
                  </option>
                  <option value="SL- Sponsor Licence">
                    SL- Sponsor Licence{" "}
                  </option>
                  <option value="Student">Student </option>
                  <option value="Student Child">Student Child</option>
                  <option value="Graduate Visa">Graduate Visa</option>
                  <option value="ECS- Entry Clearance Spouse">
                    ECS- Entry Clearance Spouse{" "}
                  </option>
                  <option value="ECV – Entry Clearance Visitor">
                    ECV – Entry Clearance Visitor{" "}
                  </option>
                  <option value="ECD – Entry Clearance Dependant">
                    ECD – Entry Clearance Dependant{" "}
                  </option>
                  <option value="PS – Pre Settled Status">
                    PS – Pre Settled Status
                  </option>
                  <option value="SS – Settled Status">
                    SS – Settled Status{" "}
                  </option>
                  <option value="Others">Other</option>
                </select> */}
              </div>
            </div>

            <div className="button-company-screen">
              <button
                type="button"
                onClick={handleNext}
                className="Next-btn-company-screen"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyScreen;
