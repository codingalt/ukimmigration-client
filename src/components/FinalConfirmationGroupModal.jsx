import React, { useContext, useMemo, useRef, useState } from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/material";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { TiTick } from "react-icons/ti";
import { FiUpload } from "react-icons/fi";
import pdfImg from "../Assets/pdf-img.png";
import { useGetApplicationByUserIdQuery } from "../services/api/applicationApi";
import { Link, useNavigate } from "react-router-dom";
import { FaWindowClose } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useGetGroupClientAppByUserIdQuery } from "../services/api/companyClient";

const FinalConfirmationGroupModal = ({
  confirmationModal2,
  setConfirmationModal2,
  applicationId,
}) => {
  const navigate = useNavigate();
  const { data, isLoading, refetch, isFetching } =
    useGetGroupClientAppByUserIdQuery(null, {
      refetchOnMountOrArgChange: true,
    });
  const application = data?.application;

  const handleClose = () => {
    setConfirmationModal2(false);
  };

  return (
    <>
      <Dialog onClose={handleClose} open={confirmationModal2}>
        <Backdrop
          sx={{
            color: "#fff",
            backgroundColor: "transparent",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <DialogTitle>Final Confirmation</DialogTitle>
        <Divider />
        <Box sx={{ p: 1.4, pb: 2.9, px: 3, minWidth: "530px" }}>
          <Box
            sx={{
              width: "5rem",
              height: "5rem",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              background:
                application?.finalConfirmation?.status === "approved"
                  ? "rgba(93, 152, 46, 1)"
                  : "red",
              margin: ".3rem auto",
            }}
          >
            {application?.finalConfirmation?.status === "approved" ? (
              <TiTick fontSize={"3.4rem"} />
            ) : (
              <IoMdClose fontSize={"3rem"} />
            )}
          </Box>

          <Link
            to={
              import.meta.env.VITE_IMG_URI + application?.finalConfirmation?.pdf
            }
            target="_blank"
          >
            <Box
              sx={{
                width: "100%",
                height: "3.2rem",
                background:
                  "linear-gradient(0deg, #E2E2E4, #E2E2E4),linear-gradient(0deg, #F7F7F7, #F7F7F7)",
                borderRadius: "12px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 3,
                mt: 3,
                cursor: "pointer",
                boxSizing: "border-box",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <Typography color="blue">
                  {/* {application?.finalConfirmation?.pdf?.split("/Uploads/")} */}
                  Click here to view document
                </Typography>
              </Box>
              <Box sx={{ mt: 0.5 }}>
                <img src={pdfImg} alt="" />
              </Box>
            </Box>
          </Link>

          {/* Description  */}
          <Box
            sx={{
              width: "100%",
              borderRadius: "12px",
              mt: 1.2,
              boxSizing: "border-box",
            }}
          >
            <textarea
              disabled
              readonly
              value={application?.finalConfirmation?.description}
              style={{
                height: "100%",
                width: "100%",
                borderRadius: "12px",
                padding: "15px 15px",
                outline: "none",
                border: "1px solid gray",
                boxSizing: "border-box",
                background:
                  "linear-gradient(0deg, #E2E2E4, #E2E2E4),linear-gradient(0deg, #F7F7F7, #F7F7F7)",
              }}
              rows={9}
              cols={10}
              placeholder="Description"
            />
          </Box>

          {/* Buttons  */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              mt: 3,
              gap: "15px",
            }}
          >
            <Button
              onClick={handleClose}
              sx={{
                width: "8rem",
                px: 4,
                py: 0.7,
                bgcolor: "#5D982E",
                borderRadius: ".5rem",
              }}
              variant="contained"
              color="success"
            >
              Done
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
};

export default FinalConfirmationGroupModal;
