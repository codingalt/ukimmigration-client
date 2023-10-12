import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useVerifyEmailMutation } from "../services/api/userApi";
import { toastError } from "./Toast";

const EmailVerify = () => {
  const { userId, token } = useParams();
  const [verifyEmail, result] = useVerifyEmailMutation();
  const { data, error, isSuccess, isError } = result;

  useMemo(() => {
    if (error) toastError("Invalid Link");
  }, [error]);

  const handleVerifyEmail = async () => {
    await verifyEmail({ userId: userId, token: token });
  };

  useEffect(() => {
    handleVerifyEmail();
  }, []);
  console.log(userId, token);
  return (
    <>
      {isSuccess && <div>Email Verified Successfully. Now you can close this tab</div>}

      {isError && <div>Invalid Link</div>}
    </>
  );
};

export default EmailVerify;
