import React, { useState } from 'react';
import '../style/OTPGenerator.css';

const OTPGenerator = () => {
  const [otp, setOTP] = useState('');
  const numberOfInputs = 6; // Number of OTP input boxes

  // Function to handle input changes
  const handleInputChange = (event, index) => {
    const { value } = event.target;
    const updatedOTP = otp.split('');
    updatedOTP[index] = value.slice(-1); // Only keep the last character
    setOTP(updatedOTP.join(''));
  };

  return (
    <div className="otp-container">
      {/* <h2>Enter One-Time Password (OTP)</h2> */}
      <div className="otp-inputs">
        {Array.from({ length: numberOfInputs }, (_, index) => (
          <input
            key={index}
            className="otp-input" // Changed the class name to "otp-input"
            type="text"
            value={otp[index] || ''}
            onChange={(event) => handleInputChange(event, index)}
            maxLength="1"
            autoFocus={index === 0} // Autofocus on the first input box
          />
        ))}
      </div>
    </div>
  );
};

export default OTPGenerator;

