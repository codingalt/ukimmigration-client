import React, { useEffect, useState } from 'react';
import '../style/forgetpassword.css';
import { Link, useNavigate } from 'react-router-dom';
import "../style/companyselct.css"
import uni from "../Assets/universty-placement.svg"
import imigrationmatter from '../Assets/imigartion-matters.svg';
import others from '../Assets/others-img.svg';
import { useGetApplicationByUserIdQuery } from '../services/api/applicationApi';
import { useDispatch } from 'react-redux';
import { setApplicationTypeToSlice } from '../services/redux/userSlice';
const CompanyScreen = () => {
  const {data, isLoading, error,isSuccess} = useGetApplicationByUserIdQuery();
  const [show, setShow] = useState(null);
  const [applicationType, setApplicationType] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("application",data);
  useEffect(() => {
    if (data && !data.application) {
      setShow(true);
    } else if (data?.application?.phaseSubmittedByClient >= 1) {
      setShow(false);
      !isLoading && navigate("/filldata");
    }else if (data?.application?.phaseSubmittedByClient === 0) {
      setShow(false);
      !isLoading && navigate("/phase1");
    }
  }, [data, isLoading, isSuccess]);

  const handleClick = (value)=>{
    dispatch(setApplicationTypeToSlice(value));
    localStorage.setItem("phase1-applicationType",value);
    setTimeout(() => {
      navigate(`/phase1`)
    }, 500);
  }

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
                <div className="sponser-li">
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
                <div className="sponser-li">
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

              <div
                className="profile-box-1"
                onClick={() => handleClick("Others")}
              >
                <div className="sponser-li">
                  <img src={others} alt="" className="company-imgss-1" />
                </div>

                <div className="title-space">
                  <p className="company-titles-1">Others</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CompanyScreen;
