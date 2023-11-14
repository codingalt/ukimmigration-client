import React, { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVerifyEmailMutation } from "../services/api/userApi";
import { toastError } from "./Toast";
import Loader from "./Loader";

const EmailVerify = () => {
  const navigate = useNavigate();
  const { userId, token } = useParams();
  const [verifyEmail, result] = useVerifyEmailMutation();
  const { data, error, isSuccess, isError, isLoading } = result;

  useMemo(()=>{
    if(isSuccess){
      navigate("/companyscreen")
    }
  },[isSuccess,isLoading])

  const handleVerifyEmail = async () => {
    await verifyEmail({ userId: userId, token: token });
  };

  useEffect(() => {
    if(userId && token){
      handleVerifyEmail();
    }
  }, [verifyEmail]);

  if(isLoading){
    return (
      <div style={{margin: "2rem auto",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",gap:"25px"}}>
        <Loader width={60} color={"#5d982e"} />
      <h3>Loading..</h3>
      </div>
    );
  }

  if (!isLoading && error) {
    return (
      <div>
        <h3>Invalid Link</h3>
      </div>
    );
  }

};

export default EmailVerify;
