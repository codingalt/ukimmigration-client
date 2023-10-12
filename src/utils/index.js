import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth, messaging } from "../firebase";
import { getToken } from "@firebase/messaging";

export const onCaptchaVerify = async() => {
   window.recaptchaVerifier = new RecaptchaVerifier(
     auth,
     "recaptcha-container",
     {
       size: "normal",
       callback: async(response) => {
     const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId);
      console.log("res", recaptchaResponse);
      return recaptchaResponse;
       },
       "expired-callback": () => {
         console.log("Caprcha expired");
         grecaptcha.reset(window.recaptchaWidgetId);
       },
     }
   );
   recaptchaVerifier.render().then(async(widgetId) => {
     window.recaptchaWidgetId = widgetId;
   });
};

export const onCaptchaVerify2 = async (contact) => {
  console.log(contact);
  window.recaptchaVerifier = new RecaptchaVerifier(
    auth,
    "recaptcha-container",
    {
      size: "invisible",
      callback: async (response) => {
        console.log(contact);
        const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId);
        // onSendOTP(contact);
      },
      "expired-callback": () => {
        console.log("Caprcha expired");
        grecaptcha.reset(window.recaptchaWidgetId);
      },
    }
  );
 
};

export const onSendOTP = async(contact) => {
  const appVerifier = window.recaptchaVerifier;
  console.log("App Verifier", appVerifier);
  const formatPhone = "+" + contact;
  try {

    const data = await signInWithPhoneNumber(auth, formatPhone, appVerifier);
    window.confirmationResult = data;
    return data;
    
  } catch (error) {
    console.log(error);
    grecaptcha.reset(window.recaptchaWidgetId);
    return error;
  }
  
    // .then((confirmationResult) => {
    //   console.log(confirmationResult);
    //   return true;
    // })
    // .catch((error) => {
    //   console.error(error);
    //   return false;
    // });
};

export const getNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    // Generate Token
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_VAPID_KEY,
    });
    return token;
  } else if (permission === "denied") {
  }
};

// Format Time 
export const formatTime = (time) => {
  if (time > 0) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    return `${formattedMinutes}:${formattedSeconds}`;
  } else {
    return `00:00`;
  }
};

