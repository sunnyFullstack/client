import React, { useEffect } from "react";
import { useFormik } from "formik";
import Container from "../../Components/Container";
import Button from "../../Components/Button";
import { useRegisterMutation } from "../../services/auth.api";
import Input from "../../Components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import SelectInput from "../../Components/Input/SelectInput";
import { profileEditField, statesWithDistricts } from "../../constant";
import Logo from "../../Components/Logo";
import logoImg from "../../assets/images/logo.jpg";
import { registerValidationSchema } from "../../validation/registerValidation";
import FullScreenLoader from "../../Components/Loader/Loader";

const ProfileEdit = ({ formData, onCancel }: any) => {
  const [register, { data, isLoading, isSuccess, error, status, isError }] =
    useRegisterMutation();
  const navigate = useNavigate();
  console.log(useRegisterMutation(), "+++", data);
  useEffect(() => {
    if (isSuccess && status === "fulfilled") {
      // showToast(
      //   `User is created successfully and username is ${data?.username}`
      // );
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
      firstname: formData.firstname,
      lastname: formData.lastname,
      mobile: formData.mobile,
      email: formData.email,
      password: "",
      cnfPassword: "",
      state: "Bihar",
      district: "",
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
        state: true,
        district: true,
      });
      try {
        await register({
          firstname: values.firstname,
          lastname: values.lastname,
          mobile: values.mobile,
          email: values.email,
          password: values.password,
          confirmPassword: values.cnfPassword,
          state: values.state,
          district: values.district,
        }).unwrap();

        formik.resetForm();
      } catch (error: any) {
        // showToast("something went wrong!");
      }
    },
  });

  const selectedStateObj: any = statesWithDistricts.find(
    (s) => s.state === formik.values.state
  );

  const selectedDistrictObj: any = selectedStateObj?.districts?.find(
    (d: any) => (typeof d === "object" ? d.name : d) === formik.values.district
  );

  return (
    <Container className="md:w-[90%] bg-primary flex justify-center items-center">
      {isLoading && <FullScreenLoader />}
      <div className="h-fit xl:w-4/5 lg:w-full md:w-[100%] sm:w-full xs:w-full  rounded-xl p-8 bg-gray-100">
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-3 gap-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1">
            {profileEditField?.map(({ label, name, type }) => (
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
            <SelectInput
              name="state"
              label="Work Location (State)"
              value={formik.values.state}
              onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldValue("district", "");
                formik.setFieldValue("block", "");
              }}
              onBlur={formik.handleBlur}
              options={statesWithDistricts.map((s) => ({
                label: s.state,
                value: s.state,
              }))}
              error={formik.touched.state && formik.errors.state}
            />

            {selectedStateObj && (
              <SelectInput
                name="district"
                label="Work Location (District)"
                value={formik.values.district}
                onChange={(e) => {
                  formik.handleChange(e);
                  formik.setFieldValue("block", "");
                }}
                onBlur={formik.handleBlur}
                options={(selectedStateObj?.districts || []).map(
                  (district: any) => ({
                    label:
                      typeof district === "string" ? district : district.name,
                    value:
                      typeof district === "string" ? district : district.name,
                  })
                )}
                error={formik.touched.district && formik.errors.district}
              />
            )}

            {selectedDistrictObj && selectedDistrictObj.blocks?.length > 0 && (
              <SelectInput
                name="block"
                label="Work Location (Block)"
                value={formik.values.block}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                options={selectedDistrictObj.blocks.map((block: string) => ({
                  label: block,
                  value: block,
                }))}
                error={formik.touched.block && formik.errors.block}
              />
            )}
          </div>
          <div>
            <div className="w-full flex justify-evenly gap-10">
              <div className="mt-3  w-[30%]">
                <Button
                  variant="success"
                  type="submit"
                  className="w-[100%] h-10 text-primary text-bold mt-5"
                >
                  Edit
                </Button>
              </div>

              <Button
                variant="secondary"
                type="button"
                className=" w-[30%] h-10 text-primary text-bold mt-5"
                onClick={onCancel}
              >
                GO BACK
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ProfileEdit;
