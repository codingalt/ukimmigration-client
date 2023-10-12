import React, { useState } from 'react';
import "../style/notifictaionbox.css"
import approved from "../Assets/approved-noti.svg"
import reject from "../Assets/reject-noti.svg"
import { Link } from 'react-router-dom';

const NotificationBox = () => {
  const [notifications, setNotifications] = useState([

    // Add more dummy notifications here
  ]);

  return (
    <div className="notification-box">
      <div className="notification-header">
        <h1 className='notifiction-box-heading'>Notifications</h1>

      </div>
      <div className="notification-list">
        <ul>
          <Link to="/phase2">
            <li className="notification-item">
              <div className='Notifiction-img'>
                <img src={approved} alt="" className='approved' />
              </div>
              <div className='right-side-noti'>
                <p className="notification-heading">Phase 1 </p>
                <p className='notification-status-approved'>Approved</p>
                <p className='notification-text'>Click here to proceed next step</p>
              </div>
            </li>
          </Link>
          <Link to="/Rejectpopup">
            <li className="notification-item">
              <div className='Notifiction-img'>
                <img src={reject} alt="" className='approved' />
              </div>
              <div className='right-side-noti'>
                <p className="notification-heading">Phase 1 </p>
                <p className='notification-status-rejct'>Reject</p>
                <p className='notification-text'>Click here to proceed next step</p>
              </div>
            </li>
          </Link>

          <Link to="/agreement">
            <li className="notification-item">
              <div className='Notifiction-img'>
                <img src={approved} alt="" className='approved' />
              </div>
              <div className='right-side-noti'>
                <p className="notification-heading">Phase 2 </p>
                <p className='notification-status-approved'>Approved</p>
                <p className='notification-text'>Click here to proceed next step</p>
              </div>
            </li>
          </Link>

          <Link to="/Rejectpopup">
            <li className="notification-item">
              <div className='Notifiction-img'>
                <img src={reject} alt="" className='approved' />
              </div>
              <div className='right-side-noti'>
                <p className="notification-heading">Phase 2 </p>
                <p className='notification-status-rejct'>Reject</p>
                <p className='notification-text'>Click here to proceed next step</p>
              </div>
            </li>
          </Link>


          <Link to="/phase4">
            <li className="notification-item">
              <div className='Notifiction-img'>
                <img src={approved} alt="" className='approved' />
              </div>

              <div className='right-side-noti'>
                <p className="notification-heading">Phase 3 </p>
                <p className='notification-status-approved'>Approved</p>
                <p className='notification-text'>Click here to proceed next step</p>
              </div>
            </li>
          </Link>

          <Link to="/Rejectpopup">
            <li className="notification-item">
              <div className='Notifiction-img'>
                <img src={reject} alt="" className='approved' />
              </div>
              <div className='right-side-noti'>
                <p className="notification-heading">Phase 3 </p>
                <p className='notification-status-rejct'>Reject</p>
                <p className='notification-text'>Click here to proceed next step</p>
              </div>
            </li>
          </Link>

          <Link to="/congratsphase4">
            <li className="notification-item">
              <div className='Notifiction-img'>
                <img src={approved} alt="" className='approved' />
              </div>

              <div className='right-side-noti'>
                <p className="notification-heading">Phase 4 </p>
                <p className='notification-status-approved'>Approved</p>
                <p className='notification-text'>Click here to proceed next step</p>
              </div>
            </li>
          </Link>
          <li className="notification-item">
            <div className='Notifiction-img'>
              <img src={reject} alt="" className='approved' />
            </div>
            <div className='right-side-noti'>
              <p className="notification-heading">Phase 4 </p>
              <p className='notification-status-rejct'>Reject</p>
              <p className='notification-text'>Click here to proceed next step</p>
            </div>
          </li>
          <Link to="/Approvedbyauthority">
            <li className="notification-item">
              <div className='Notifiction-img'>
                <img src={approved} alt="" className='approved' />
              </div>
              <div className='right-side-noti'>
                <p className="notification-heading">Approved by Authority</p>
                <p className='notification-status-approved'>Approved</p>
                <p className='notification-text'>Click here to proceed next step</p>
              </div>
            </li>
          </Link>
          <Link to="/rejectbyauthority">
            <li className="notification-item">
              <div className='Notifiction-img'>
                <img src={reject} alt="" className='approved' />
              </div>
              <div className='right-side-noti'>
                <p className="notification-heading">Reject By Authority</p>
                <p className='notification-status-rejct'>Reject</p>
                <p className='notification-text'>Click here to proceed next step</p>
              </div>
            </li>
          </Link>
          {/* Add more static notification items here */}
        </ul>
      </div>
    </div>
  );
};

export default NotificationBox;

