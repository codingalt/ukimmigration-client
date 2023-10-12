import * as Yup from "yup";

const signupSchema = Yup.object({
  name: Yup.string().min(3).required("Name is Required"),
  email: Yup.string()
    .email("Please Enter a valid email address")
    .required("Email is Required"),
  contact: Yup.string().required("Contact is Required"),
  password: Yup.string().min(6).required("Password is Required"),
  confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Password not matched"),
  referringAgent: Yup.string(), 
});

export const resetPasswordSchema = Yup.object({
  password: Yup.string().min(6).required("Password is Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Password not matched"
  ),
});

export const changePasswordSchema = Yup.object({
  password: Yup.string().min(6).required("Password is Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password")],
    "Password not matched"
  ),
  currentPassword: Yup.string().min(6),
});

// Phases 1 Schema
export const phase1Schema = Yup.object().shape({
  phase1: Yup.object().shape({
    name: Yup.string().min(3).required("Name is Required"),
    email: Yup.string()
      .email("Please Enter a valid email address")
      .required("Email is Required"),
    contact: Yup.string().required("Contact is Required"),
    birthDate: Yup.date().required("Date of Birth is Required"),
    country: Yup.string().required("Country is Required"),
    sameResidence: Yup.boolean().required(
      "Do you have residence in this country?"
    ),
    speakEnglish: Yup.boolean().required("Do you Speak English?"),
    otherLanguagesSpeak: Yup.array().required(
      "What Other Languages do you speak?"
    ),
    isRefusedVisaEntry: Yup.boolean().required("Please check this option."),
    refusedVisaType: Yup.string(),
    refusedVisaDate: Yup.date(),
    refusedVisaReason: Yup.string(),
    message: Yup.string().required(
      "Please provide in your own words how we can help you?*"
    ),
    permissionInCountry: Yup.string().when(
      "sameResidence",
      (sameResidence, schema) => {
        sameResidence ? Yup.string().required() : schema;
      }
    ),
  }),
});


export default signupSchema