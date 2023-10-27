import React, { useEffect, useRef, useState } from 'react'
import { useGetApplicationByUserIdQuery } from '../services/api/applicationApi';
import Navbar from '../components/Navbar';
import { NavLink } from 'react-router-dom';
import GeneralFilled from '../components/Phase4Filled/GeneralFilled';
import AccomodationFilled from '../components/Phase4Filled/AccomodationFilled';
import FamilyFilled from '../components/Phase4Filled/FamilyFilled';
import LanguageFilled from '../components/Phase4Filled/LanguageFilled';
import EducationFilled from '../components/Phase4Filled/EducationFilled';
import EmploymentFilled from '../components/Phase4Filled/EmploymentFilled';
import MaintenanceFilled from '../components/Phase4Filled/MaintenanceFilled';
import TravelFilled from '../components/Phase4Filled/TravelFilled';
import CharacterFilled from '../components/Phase4Filled/CharacterFilled';

const Phase4FilledDataPage = () => {
    const { data } = useGetApplicationByUserIdQuery();
    const app = data?.application?.phase4;
    
    const topDivRef = useRef();
    const [activeTab, setActiveTab] = useState("/general");
    const [isAllowed, setIsAllowed] = useState(false);

    useEffect(() => {
      if (topDivRef.current) {
        topDivRef.current.scrollTop = 0;
      }
    }, [activeTab]);

    useEffect(() => {
      if (data?.application) {
        if (
          data?.application?.phaseSubmittedByClient === 4 
        ) {
          setIsAllowed(true);
        } else {
          setIsAllowed(false);
          navigate("/filldata");
        }
      }
    }, [data]);
  return (
    <>
      {isAllowed && (
        <div className="Container-forgetpassword-phase1">
          <Navbar />
          <div className="Forgetpassword-sub-2">
            <div className="left-side-forget-password-2">
              <p className="Required-data-text">Required Data*</p>
              <NavLink to="/filldata">
                <button type="button" className="back-button">
                  back
                </button>
              </NavLink>

              <div className="phase-4-all-phase">
                <span
                  className={`link-hover-effect ${
                    activeTab === "/general" ? "link-active" : ""
                  }`}
                  onClick={() => setActiveTab("/general")}
                  style={{ cursor: "pointer" }}
                >
                  <span>General</span>
                </span>
                <span
                  className={`link-hover-effect ${
                    activeTab === "/Accomodation" ? "link-active" : ""
                  }`}
                  onClick={() => setActiveTab("/Accomodation")}
                  style={{ cursor: "pointer" }}
                >
                  <span>Accomodation</span>
                </span>
                <span
                  className={`link-hover-effect ${
                    activeTab === "/family" ? "link-active" : ""
                  }`}
                  onClick={() => setActiveTab("/family")}
                  style={{ cursor: "pointer" }}
                >
                  <span>Family</span>
                </span>
                <span
                  className={`link-hover-effect ${
                    activeTab === "/languageprofeciency" ? "link-active" : ""
                  }`}
                  onClick={() => setActiveTab("/languageprofeciency")}
                  style={{ cursor: "pointer" }}
                >
                  <span>Language Proficiency</span>
                </span>
                <span
                  className={`link-hover-effect ${
                    activeTab === "/education" ? "link-active" : ""
                  }`}
                  onClick={() => setActiveTab("/education")}
                  style={{ cursor: "pointer" }}
                >
                  <span>Education</span>
                </span>
                <span
                  className={`link-hover-effect ${
                    activeTab === "/employement" ? "link-active" : ""
                  }`}
                  onClick={() => setActiveTab("/employement")}
                  style={{ cursor: "pointer" }}
                >
                  <span>Employment</span>
                </span>
                <span
                  className={`link-hover-effect ${
                    activeTab === "/maintenance" ? "link-active" : ""
                  }`}
                  onClick={() => setActiveTab("/maintenance")}
                  style={{ cursor: "pointer" }}
                >
                  <span>Maintenance</span>
                </span>
                <span
                  className={`link-hover-effect ${
                    activeTab === "/travel" ? "link-active" : ""
                  }`}
                  onClick={() => setActiveTab("/travel")}
                  style={{ cursor: "pointer" }}
                >
                  <span>Travel</span>
                </span>
                <span
                  className={`link-hover-effect ${
                    activeTab === "/character" ? "link-active" : ""
                  }`}
                  onClick={() => setActiveTab("/character")}
                  style={{ cursor: "pointer" }}
                >
                  <span>Character</span>
                </span>
              </div>

              <div className="Main-form">
                {activeTab === "/general" && data && (
                  <GeneralFilled data={app} />
                )}

                {activeTab === "/Accomodation" && data && (
                  <AccomodationFilled data={app} />
                )}

                {activeTab === "/family" && data && <FamilyFilled data={app} />}

                {activeTab === "/languageprofeciency" && data && (
                  <LanguageFilled data={app} />
                )}

                {activeTab === "/education" && data && (
                  <EducationFilled data={app} />
                )}

                {activeTab === "/employement" && data && (
                  <EmploymentFilled data={app} />
                )}

                {activeTab === "/maintenance" && data && (
                  <MaintenanceFilled data={app} />
                )}

                {activeTab === "/travel" && data && <TravelFilled data={app} />}

                {activeTab === "/character" && data && <CharacterFilled data={app} />}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Phase4FilledDataPage