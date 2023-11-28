import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthQuery } from "../services/api/userApi";
import { useDispatch } from "react-redux";
import { setMessageCount, setSocket, setUserData } from "../services/redux/userSlice";
import io from "socket.io-client";
import MainContext from "./Context/MainContext";
const ENDPOINT = import.meta.env.VITE_IMG_URI;
var socket, selectedChatCompare;

const Protected = ({ Component }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(null);
  const { data, isSuccess, isLoading } = useAuthQuery();
  console.log(data?.data);

  // Get Unread Messages Count 
  // const {data: count,refetch,isLoading: loadingUnread} = useGetUnreadMessagesCountQuery(null,{refetchOnMountOrArgChange: true});

  // useEffect(()=>{
  //   if(count){
  //     dispatch(setMessageCount(count?.count))
  //   }
  // },[count]);

  useEffect(() => {
    socket = io(ENDPOINT);
    if(data){
      socket.emit("setup", data?.data);
      socket.on("connected", () => {});
    }
  }, [data]);

  useEffect(() => {
    if(data){
      socket.emit("setup", data?.data?._id);
      socket.emit("join chat", data?.data?._id);
    }
  }, [data]);

  useEffect(() => {
    if (!data) {
      setShow(false);
      !isLoading && navigate("/");
    } else {
      dispatch(setUserData(data));
      setShow(true);
    }
  }, [data, isLoading, isSuccess]);
  return (
    show && (
      <MainContext.Provider value={{socket}}>
        <Component />
      </MainContext.Provider>
    )
  );
};

export default Protected;
