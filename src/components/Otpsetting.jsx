import React, { useState } from 'react';
import '../style/forgetpassword.css';
import Logo from '../Assets/Ukimmigration-logo.png';
import Sideimg from '../Assets/side-img-forget.png';
import { Link } from 'react-router-dom';

const Forgetpassword = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleCancelClick = () => {
    setEmail('');
  };

  const handleSubmitClick = () => {
    alert(`Email submitted: ${email}`);
  };

  return (
    <div className="Container-forgetpassword">
      <div className="Forgetpassword-sub">
        <div className="left-side-forget-password">
          <img src={Logo} alt="" className="Logo-img" />
          <p className="Verfication-text">Verification</p>
          <p className="Enter-text">
            Enter<span className="Email-address-text">Email Address</span>
          </p>
          <p className="Email-heading">Email</p>
          <input
            className="email-input-forgert-password"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
          <div className="button-container">
            <Link to="/phase1" >
            <button onClick={handleCancelClick} className="cancel-email-btn">
              Cancel
            </button>
            </Link>
            <button onClick={handleSubmitClick} className="submit-email-btn">
              Submit
            </button>
        
          </div>
        </div>

        <div className="right-side-forget-password">
          <img src={Sideimg} alt="" className="side-img-forget" />
        </div>
      </div>
    </div>
  );
};

export default Forgetpassword;
