import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Mobile must be 10 digits")
    .required("Mobile is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  cnfPassword: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  gender: Yup.string().required("Gender is required"),
});

export const profileValidationSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  mobile: Yup.string()
    .matches(/^\d{10}$/, "Mobile must be 10 digits")
    .required("Mobile is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  schoolname: Yup.string().required("field is required"),
  schoolcode: Yup.string().required("field is required"),
  teachercode: Yup.string().required("field is required"),
  classgroup: Yup.string().required("field is required"),
  subjectname: Yup.string().required("field is required"),
  state: Yup.string().required("field required"),
  district: Yup.string().required("field required"),
  block: Yup.string().required("field required"),
  village: Yup.string().required("village is required"),
  t_state: Yup.string().required("state is required"),
  t_district: Yup.string().required("district is required"),
  t_block: Yup.string().required("block is required"),
  t_village: Yup.string().required("village is required"),
});
