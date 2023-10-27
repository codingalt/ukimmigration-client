import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useVerifyEmailMutation } from "../services/api/userApi";
import { toastError } from "./Toast";
import Loader from "./Loader";

const EmailVerify = () => {
  const { userId, token } = useParams();
  const [verifyEmail, result] = useVerifyEmailMutation();
  const { data, error, isSuccess, isError, isLoading } = result;

  // useMemo(() => {
  //   if (error) toastError("Invalid Link");
  // }, [error]);

  const handleVerifyEmail = async () => {
    await verifyEmail({ userId: userId, token: token });
  };

  useEffect(() => {
    handleVerifyEmail();
  }, []);
  console.log(userId, token);

  if(isLoading){
    return (
      <div style={{margin: "2rem auto",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center",gap:"25px"}}>
        <Loader width={60} color={"#5d982e"} />
      <h3>Loading..</h3>
      </div>
    );
  }
  
  return (
    <>
      {isSuccess && (
        <div>
          <h3>Email Verified Successfully. Now you can close this tab</h3>
        </div>
      )}

      {isError && (
        <div>
          <h3>Invalid Link</h3>
        </div>
      )}
    </>
  );
};

export default EmailVerify;
