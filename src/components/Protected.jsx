import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthQuery } from "../services/api/userApi";
import { useDispatch } from "react-redux";
import { setUserData } from "../services/redux/userSlice";

const Protected = ({ Component }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(null);
  const { data, isSuccess, isLoading } = useAuthQuery();
  console.log(data);
  useEffect(() => {
    if (!data) {
      setShow(false);
      !isLoading && navigate("/");
    } else {
      dispatch(setUserData(data));
      setShow(true);
    }
  }, [data, isLoading, isSuccess]);
  return show && <Component />;
};

export default Protected;
