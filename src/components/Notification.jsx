import React, { useContext, useEffect, useMemo, useState } from 'react';
import "../style/notifictaionbox.css"
import approved from "../Assets/approved-noti.svg"
import reject from "../Assets/reject-noti.svg"
import { Link, useNavigate } from 'react-router-dom';
import { useGetClientNotificationQuery } from '../services/api/userApi';
import { toastError } from './Toast';
import MainContext from './Context/MainContext';
import Loader from './Loader';

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


  if(!isLoading && data?.notifications?.length === 0){
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
  console.log("noti---",data);
  const handleNavigate = (item)=>{
    if(data?.companyClient){
      navigate(
        item.phaseStatus === "rejected"
          ? `/group/reject`
          : item.phase === 1
          ? "/group/agreement"
          : item.phase === 2
          ? "/group/phase3"
          : item.phase === 3
          ? "/group/phase4"
          : item.phase === 4
          ? "/congrats/phase4"
          : "/group/filldata"
      );
    }else{
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
      );
    }
  }

  return (
    <div className="notification-box">
      <div className="notification-header">
        <h1 className="notifiction-box-heading">Notifications</h1>
      </div>
      <div className="notification-list">
        <ul>
          {isLoading && (
            <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center",marginTop:"3.5rem"}}>
              <Loader width={36} color={"#5D982E"} />
            </div>
          )}
          {!isLoading &&
            data?.notifications?.map((item) => (
              <li
                className="notification-item"
                key={item._id}
                style={{ cursor: "pointer" }}
                onClick={()=>handleNavigate(item)}
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
        </ul>
      </div>
    </div>
  );
};

export default NotificationBox;

