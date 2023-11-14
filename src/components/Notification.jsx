import React, { useContext, useEffect, useMemo, useState } from 'react';
import "../style/notifictaionbox.css"
import approved from "../Assets/approved-noti.svg"
import reject from "../Assets/reject-noti.svg"
import { Link, useNavigate } from 'react-router-dom';
import { useGetClientNotificationQuery } from '../services/api/userApi';
import { toastError } from './Toast';
import MainContext from './Context/MainContext';

const NotificationBox = () => {
 
  const {data,refetch,isLoading,isFetching} = useGetClientNotificationQuery();
  const navigate = useNavigate();
  const {socket} = useContext(MainContext);
  const [received, setReceived] = useState(null);
  console.log(data);

  useEffect(() => {
    socket.on("phase notification received", (phaseNoti) => {
      setReceived(phaseNoti);
      console.log(phaseNoti);
      console.log("phase notification received", phaseNoti);
    });
  }, [received]);

  useEffect(() => {
    if (received) {
      refetch();
    }
  }, [received]);


  if(data?.notifications?.length === 0){
    return (
      <div className="notification-box">
        <div className="notification-header">
          <h1 className="notifiction-box-heading">Notifications</h1>
        </div>
        <div
          className="notification-list"
          style={{ height: "100%", width: "100%" }}
        >
          <ul
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <li style={{ color: "#DD2025",fontWeight:"500",fontFamily:"Poppins" }}>No Notifications Yet</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="notification-box">
      <div className="notification-header">
        <h1 className="notifiction-box-heading">Notifications</h1>
      </div>
      <div className="notification-list">
        <ul>
          {data?.notifications?.map((item) => (
            <li
              className="notification-item"
              key={item._id}
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(
                  item.phaseStatus === "rejected"
                    ? `/reject`
                    : item.phase === 1
                    ? "/phase2"
                    : item.phase === 2
                    ? "/agreement"
                    : item.phase === 3
                    ? "/phase4"
                    : item.phase === 4
                    ? "/congrats/phase4"
                    : "/filldata"
                )
              }
            >
              <div className="Notifiction-img">
                <img
                  src={item.phaseStatus === "approved" ? approved : reject}
                  alt=""
                  className="approved"
                />
              </div>
              <div className="right-side-noti">
                <p className="notification-heading">Phase {item?.phase}</p>
                <p
                  className={
                    item.phaseStatus === "approved"
                      ? "notification-status-approved"
                      : "notification-status-rejct"
                  }
                  style={{ textTransform: "capitalize" }}
                >
                  {item?.phaseStatus}
                </p>
                <p className="notification-text">
                  Click here to proceed next step
                </p>
              </div>
            </li>
          ))}
          {/* <Link to="/phase2">
            <li className="notification-item">
              <div className="Notifiction-img">
                <img src={approved} alt="" className="approved" />
              </div>
              <div className="right-side-noti">
                <p className="notification-heading">Phase 1 </p>
                <p className="notification-status-approved">Approved</p>
                <p className="notification-text">
                  Click here to proceed next step
                </p>
              </div>
            </li>
          </Link>
          <Link to="/Rejectpopup">
            <li className="notification-item">
              <div className="Notifiction-img">
                <img src={reject} alt="" className="approved" />
              </div>
              <div className="right-side-noti">
                <p className="notification-heading">Phase 1 </p>
                <p className="notification-status-rejct">Reject</p>
                <p className="notification-text">
                  Click here to proceed next step
                </p>
              </div>
            </li>
          </Link>

          <Link to="/agreement">
            <li className="notification-item">
              <div className="Notifiction-img">
                <img src={approved} alt="" className="approved" />
              </div>
              <div className="right-side-noti">
                <p className="notification-heading">Phase 2 </p>
                <p className="notification-status-approved">Approved</p>
                <p className="notification-text">
                  Click here to proceed next step
                </p>
              </div>
            </li>
          </Link>

          <Link to="/Rejectpopup">
            <li className="notification-item">
              <div className="Notifiction-img">
                <img src={reject} alt="" className="approved" />
              </div>
              <div className="right-side-noti">
                <p className="notification-heading">Phase 2 </p>
                <p className="notification-status-rejct">Reject</p>
                <p className="notification-text">
                  Click here to proceed next step
                </p>
              </div>
            </li>
          </Link>

          <Link to="/phase4">
            <li className="notification-item">
              <div className="Notifiction-img">
                <img src={approved} alt="" className="approved" />
              </div>

              <div className="right-side-noti">
                <p className="notification-heading">Phase 3 </p>
                <p className="notification-status-approved">Approved</p>
                <p className="notification-text">
                  Click here to proceed next step
                </p>
              </div>
            </li>
          </Link>

          <Link to="/Rejectpopup">
            <li className="notification-item">
              <div className="Notifiction-img">
                <img src={reject} alt="" className="approved" />
              </div>
              <div className="right-side-noti">
                <p className="notification-heading">Phase 3 </p>
                <p className="notification-status-rejct">Reject</p>
                <p className="notification-text">
                  Click here to proceed next step
                </p>
              </div>
            </li>
          </Link>

          <Link to="/congratsphase4">
            <li className="notification-item">
              <div className="Notifiction-img">
                <img src={approved} alt="" className="approved" />
              </div>

              <div className="right-side-noti">
                <p className="notification-heading">Phase 4 </p>
                <p className="notification-status-approved">Approved</p>
                <p className="notification-text">
                  Click here to proceed next step
                </p>
              </div>
            </li>
          </Link>
          <li className="notification-item">
            <div className="Notifiction-img">
              <img src={reject} alt="" className="approved" />
            </div>
            <div className="right-side-noti">
              <p className="notification-heading">Phase 4 </p>
              <p className="notification-status-rejct">Reject</p>
              <p className="notification-text">
                Click here to proceed next step
              </p>
            </div>
          </li>
          <Link to="/Approvedbyauthority">
            <li className="notification-item">
              <div className="Notifiction-img">
                <img src={approved} alt="" className="approved" />
              </div>
              <div className="right-side-noti">
                <p className="notification-heading">Approved by Authority</p>
                <p className="notification-status-approved">Approved</p>
                <p className="notification-text">
                  Click here to proceed next step
                </p>
              </div>
            </li>
          </Link>
          <Link to="/rejectbyauthority">
            <li className="notification-item">
              <div className="Notifiction-img">
                <img src={reject} alt="" className="approved" />
              </div>
              <div className="right-side-noti">
                <p className="notification-heading">Reject By Authority</p>
                <p className="notification-status-rejct">Reject</p>
                <p className="notification-text">
                  Click here to proceed next step
                </p>
              </div>
            </li>
          </Link> */}
          {/* Add more static notification items here */}
        </ul>
      </div>
    </div>
  );
};

export default NotificationBox;

