import React, { useEffect } from "react";
import { useFormik } from "formik";
import Container from "../../Components/Container";
import Button from "../../Components/Button";
import { useRegisterMutation } from "../../services/auth.api";
import Input from "../../Components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import SelectInput from "../../Components/Input/SelectInput";
import { fields, statesWithDistricts } from "../../constant";
import Logo from "../../Components/Logo";
import logoImg from "../../assets/images/logo.jpg";
import { registerValidationSchema } from "../../validation/registerValidation";
import FullScreenLoader from "../../Components/Loader/Loader";
import { useToast } from "../../context/ToastContext";

const Register = () => {
  const [register, { data, isLoading, isSuccess, error, status, isError }] =
    useRegisterMutation();
  const { showToast } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    showToast("Login successful!", "success");
  }, []);
  useEffect(() => {
    if (isSuccess && status === "fulfilled") {
      showToast(
        `User is created successfully and username is ${data?.username}`,
        "success"
      );
      let timeoutRoute = setTimeout(() => {
        navigate("/signin");
      }, 3000);
      return () => {
        clearTimeout(timeoutRoute);
      };
    }
  }, [isSuccess, status]);
  const formik: any = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      mobile: "",
      email: "",
      password: "",
      cnfPassword: "",
      gender: "",
    },
    validationSchema: registerValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async (values) => {
      formik.setTouched({
        firstname: true,
        lastname: true,
        mobile: true,
        email: true,
        password: true,
        cnfPassword: true,
        gender: true,
      });
      try {
        await register({
          firstname: values.firstname,
          lastname: values.lastname,
          mobile: values.mobile,
          email: values.email,
          password: values.password,
          confirmPassword: values.cnfPassword,
          gender: values.gender,
        }).unwrap();
        formik.resetForm();
      } catch (error: any) {
        // console.log(error, "mmmmmmm");
        showToast("something went wrong!", "error");
      }
    },
  });

  const selectedStateObj = statesWithDistricts.find(
    (s) => s.state === formik.values.state
  );
  return (
    <Container className="md:w-[100%] flex justify-center items-center h-screen">
      {isLoading && <FullScreenLoader />}
      <div className="h-fit xl:w-4/5 lg:w-full md:w-[100%] sm:w-full xs:w-full shadow-custom rounded-xl p-8 bg-gray-100">
        <div>
          <div className="flex justify-center mb-6">
            <Logo src={logoImg} size={150} />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-3 gap-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1">
              {fields.map(({ label, name, type }) => (
                <Input
                  key={name}
                  label={label}
                  name={name}
                  type={type}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched[name] && formik.errors[name]}
                  className="w-full"
                />
              ))}
              <div className="flex gap-4">
                <div>Select Gender</div>
                <div className="flex items-center space-x-6">
                  <label className="inline-flex items-center text-white">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      onChange={formik.handleChange}
                      checked={formik.values.gender === "Male"}
                      className="form-radio text-blue-500"
                    />
                    <span className="ml-2">Male</span>
                  </label>

                  <label className="inline-flex items-center text-white">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      onChange={formik.handleChange}
                      checked={formik.values.gender === "Female"}
                      className="form-radio text-pink-500"
                    />
                    <span className="ml-2">Female</span>
                  </label>
                </div>
              </div>
              {/* <SelectInput
                name="state"
                label="Work Location (State)"
                value={formik.values.state}
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldValue("district", ""); // Reset district on state change
                }}
                onBlur={formik.handleBlur}
                options={statesWithDistricts.map((s) => ({
                  label: s.state,
                  value: s.state,
                }))}
                error={formik.touched.state && formik.errors.state}
              /> */}

              {/* {formik.values.state && (
                <SelectInput
                  name="district"
                  label="Work Location (District)"
                  value={formik.values.district}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  options={(selectedStateObj?.districts || []).map(
                    (district) => ({
                      label: district,
                      value: district,
                    })
                  )}
                  error={formik.touched.district && formik.errors.district}
                />
              )} */}
            </div>
            <div>
              <div className="w-full flex justify-evenly gap-10">
                <div className="mt-3  w-[30%]">
                  <Button
                    variant="success"
                    type="submit"
                    className="w-[100%] h-10 text-primary text-bold mt-5"
                  >
                    SUBMIT
                  </Button>
                  <p className="font-bold">
                    click here for{" "}
                    <Link className="text-blue underline" to="/signin">
                      Login.
                    </Link>
                  </p>
                </div>

                <Button
                  variant="secondary"
                  type="button"
                  className=" w-[30%] h-10 text-primary text-bold mt-5"
                  onClick={() => formik.resetForm()}
                >
                  RESET
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Register;
