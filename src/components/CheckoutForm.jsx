import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "../style/Adddetails.css";
import {
  useStripe,
  useElements,
  PaymentElement,
  CardElement,
} from "@stripe/react-stripe-js";
import Loader from "./Loader";
import { toastError, toastSuccess } from "./Toast";
import { usePayWithCardMutation } from "../services/api/applicationApi";

const CheckoutForm = ({ clientSecret }) => {
  const navigate = useNavigate();
  const {applicationId} = useParams();
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [payWithCard, result] = usePayWithCardMutation();
  const {isLoading,error,isSuccess} = result;
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/filldata`,
      },
      redirect: "if_required",
    });
    // const paymentElement = elements?.create("card");
    // paymentElement.mount(".StripeElement")

    // const { token, error } = await stripe.createToken(
    //   paymentElement
    //   );
    // const { token, error } = await stripe.createToken(
    //   elements.getElement(CardElement)
    // );
    //   console.log(token);

    // await payWithCard({ token: token.id, applicationId: applicationId });
    // if (error) {
    //   toastError(error.message);
    // } else {
    //   // Here, 'token' contains the payment token you can pass to your backend.
    //   // You can use 'token.id' to process the payment on the backend.
    //   toastSuccess("Card information has been tokenized successfully.");
    //   // setTimeout(() => {
    //   //   navigate("/filldata");
    //   // }, 1400);
    // }

    if (error) {
      toastError(error.message);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      toastSuccess("Congratulations! Payment Succeeded.");
      await payWithCard({token: paymentIntent.id, applicationId: applicationId});
      setTimeout(() => {
        navigate("/filldata");
      }, 1400);
    } else {
      toastError("Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <>
      <form
        style={{ marginTop: "2rem", zIndex: "10", width: "30rem" }}
        id="payment-form"
        onSubmit={handleSubmit}
      >
        <PaymentElement />
        {clientSecret && (
          <button
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            disabled={loading}
            type="submit"
            className="submit-details"
          >
            {loading ? <Loader /> : "Submit"}
          </button>
        )}
      </form>
      <div className="right-side-forget-password-2"></div>
    </>
  );
};

export default CheckoutForm
