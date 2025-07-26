import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Container from "../../Components/Container";
import Button from "../../Components/Button";
import { useProfileEditMutation } from "../../services/auth.api";
import Input from "../../Components/Input/Input";
import { useNavigate } from "react-router-dom";
import SelectInput from "../../Components/Input/SelectInput";
import {
  classGroup,
  profileEditField,
  statesWithDistricts,
  teacherCode,
} from "../../constant";
import { profileValidationSchema } from "../../validation/registerValidation";
import FullScreenLoader from "../../Components/Loader/Loader";

const ProfileEdit = ({ formData, onCancel, setIsEditMode }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const [profileEdit, { data, isLoading, isSuccess, error, status, isError }] =
    useProfileEditMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (isSuccess && status === "fulfilled") {
      let timeoutRoute = setTimeout(() => {
        setIsEditMode(false);
        formik.resetForm();
      }, 3000);
      return () => {
        clearTimeout(timeoutRoute);
      };
    }
  }, [isSuccess, status]);

  const formik: any = useFormik({
    initialValues: {
      firstname: formData?.firstname,
      lastname: formData?.lastname,
      mobile: formData?.mobile,
      email: formData?.email,
      gender: formData?.gender,
      schoolname: formData?.school_info?.school_name,
      schoolcode: formData?.school_info?.school_u_dise,
      teachercode: formData?.teachercode,
      classgroup: formData?.classgroup,
      subjectname: formData?.subjectname,
      state: formData?.work_location?.state,
      district: formData?.work_location?.district,
      block: formData?.work_location?.block,
      village: formData?.work_location?.village,
      t_state: formData?.desired_transfer_location?.state,
      t_district: formData?.desired_transfer_location?.district,
      t_block: formData?.desired_transfer_location?.block,
      t_village: formData?.desired_transfer_location?.village,
    },
    validationSchema: profileValidationSchema,
    validateOnBlur: true,
    validateOnChange: true,

    onSubmit: async (values) => {
      const errors = await formik.validateForm();
      try {
        await profileEdit({
          firstname: values.firstname,
          lastname: values.lastname,
          mobile: values.mobile,
          email: values.email,
          gender: values.gender,
          schoolname: values.schoolname,
          schoolcode: values.schoolcode,
          teachercode: values.teachercode,
          classgroup: values.classgroup,
          subjectname: values.subjectname,
          state: values.state,
          district: values.district,
          block: values.block,
          village: values.village,
          t_state: values.t_state,
          t_district: values.t_district,
          t_block: values.t_block,
          t_village: values.t_village,
        }).unwrap();
      } catch (error: any) {
        // showToast("something went wrong!");
      }
    },
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = await formik.validateForm();
    if (Object.keys(errors).length > 0) {
      formik.setTouched(
        Object.keys(errors).reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, {} as any)
      );
      return;
    }
    formik.handleSubmit(); // now fires if form is valid
  };
  const handleChange = async (e: any) => {
    e.preventDefault();
    formik.handleChange(e);
    formik.setFieldValue(e.target.name, e.target.value);
    formik.setTouched(e.target.name, false);
  };
  const selectedStateObj: any = statesWithDistricts.find(
    (s) => s.state === formik.values.state
  );
  const selectedDistrictObj: any = selectedStateObj?.districts?.find(
    (d: any) => (typeof d === "object" ? d.name : d) === formik.values.district
  );
  const selectedBlockObj: any = selectedDistrictObj?.blocks?.find(
    (d: any) => (typeof d === "object" ? d.name : d) === formik.values.block
  );

  // 🎯 For target location
  const selectedTargetStateObj: any = statesWithDistricts?.find(
    (s) => s.state === formik.values.t_state
  );

  const selectedTargetDistrictObj = selectedTargetStateObj?.districts.find(
    (d: any) => d.name === formik.values.t_district
  );

  const selectedTargetBlockObj = selectedTargetDistrictObj?.blocks.find(
    (b: any) => b.name === formik.values.t_block
  );
  const selectedClassGroup: any = classGroup.find(
    (s: any) => s.name === formik.values.classgroup
  );

  return (
    <Container className="md:w-[90%] bg-primary flex justify-center items-center">
      {isLoading && <FullScreenLoader />}
      <div className="h-fit xl:w-full lg:w-full md:w-[100%] sm:w-full xs:w-full  rounded-xl p-8 bg-gray-100">
        <form>
          <div className="pt-4 pb-2">
            <p className="text-xl">General information</p>
          </div>
          <div className="grid grid-cols-4 gap-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1">
            {profileEditField?.map(({ label, name, type, isDisable }, obj) => (
              <Input
                isDisable={isDisable}
                key={name}
                label={label}
                name={name}
                type={type}
                value={formik.values[name]}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched[name] && formik.errors[name]}
                className="w-full"
              />
            ))}

            <SelectInput
              name="teachercode"
              label="Teacher Code"
              value={formik.values.teachercode}
              onChange={(e) => {
                handleChange(e);
              }}
              onBlur={formik.handleBlur}
              options={teacherCode.map((s) => ({
                label: s,
                value: s,
              }))}
              error={formik.touched.teachercode && formik.errors.teachercode}
            />
            <SelectInput
              name="classgroup"
              label="Class Group"
              value={formik.values.classgroup}
              onChange={(e) => {
                handleChange(e);
                formik.setFieldValue("subjectname", "");
              }}
              onBlur={formik.handleBlur}
              options={classGroup?.map((s: any) => ({
                label: s.name,
                value: s.name,
              }))}
              error={formik.touched.classgroup && formik.errors.classgroup}
            />
            {selectedClassGroup && (
              <SelectInput
                name="subjectname"
                label="subject Name"
                value={formik.values.subjectname}
                onChange={(e) => {
                  handleChange(e);
                }}
                onBlur={formik.handleBlur}
                options={(selectedClassGroup?.subjects || []).map(
                  (subject: any) => ({
                    label: typeof subject === "string" ? subject : subject.name,
                    value: typeof subject === "string" ? subject : subject.name,
                  })
                )}
                error={formik.touched.subjectname && formik.errors.subjectname}
              />
            )}
            <div className="flex gap-4 justify-center items-center pt-[25px]">
              <div>Gender</div>
              <div className="flex items-center space-x-6">
                <label className="inline-flex items-center text-white">
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleChange}
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
                    onChange={handleChange}
                    checked={formik.values.gender === "Female"}
                    className="form-radio text-pink-500"
                  />
                  <span className="ml-2">Female</span>
                </label>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <p className="text-xl">Current job location</p>
          </div>
          <div className="grid pt-2 grid-cols-4 gap-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1">
            <SelectInput
              name="state"
              label="State"
              value={formik.values.state}
              onChange={(e) => {
                handleChange(e);
                formik.setFieldValue("district", "");
                formik.setFieldValue("block", "");
                formik.setFieldValue("village", "");
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
                label="District"
                value={formik.values.district}
                onChange={(e) => {
                  handleChange(e);
                  formik.setFieldValue("block", "");
                  formik.setFieldValue("village", "");
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
                label="Block"
                value={formik.values.block}
                onChange={(e) => {
                  handleChange(e);
                  formik.setFieldValue("village", "");
                }}
                onBlur={formik.handleBlur}
                options={(selectedDistrictObj?.blocks || []).map(
                  (block: any) => ({
                    label: typeof block === "string" ? block : block.name,
                    value: typeof block === "string" ? block : block.name,
                  })
                )}
                error={formik.touched.block && formik.errors.block}
              />
            )}
            {selectedBlockObj && selectedBlockObj.villages?.length > 0 && (
              <SelectInput
                name="village"
                label="Village"
                value={formik.values.village}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                options={(selectedBlockObj?.villages || []).map(
                  (village: any) => ({
                    label: typeof village === "string" ? village : village.name,
                    value: typeof village === "string" ? village : village.name,
                  })
                )}
                error={formik.touched.village && formik.errors.village}
              />
            )}
          </div>
          <div className="pt-4">
            <p className="text-xl">Desired job location</p>
          </div>
          <div className="grid pt-2 grid-cols-4 gap-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1">
            <SelectInput
              name="t_state"
              label="State"
              value={formik.values.t_state}
              onChange={(e) => {
                handleChange(e);
                formik.setFieldValue("t_district", "");
                formik.setFieldValue("t_block", "");
                formik.setFieldValue("t_village", "");
              }}
              onBlur={formik.handleBlur}
              options={statesWithDistricts.map((s) => ({
                label: s.state,
                value: s.state,
              }))}
              error={formik.touched.t_state && formik.errors.t_state}
            />

            {selectedTargetStateObj && (
              <SelectInput
                name="t_district"
                label="District"
                value={formik.values.t_district}
                onChange={(e) => {
                  handleChange(e);
                  formik.setFieldValue("t_block", "");
                  formik.setFieldValue("t_village", "");
                }}
                onBlur={formik.handleBlur}
                options={selectedTargetStateObj.districts.map((d: any) => ({
                  label: d.name,
                  value: d.name,
                }))}
                error={formik.touched.t_district && formik.errors.t_district}
              />
            )}

            {selectedTargetDistrictObj && (
              <SelectInput
                name="t_block"
                label="Block"
                value={formik.values.t_block}
                onChange={(e) => {
                  handleChange(e);
                  formik.setFieldValue("t_village", "");
                }}
                onBlur={formik.handleBlur}
                options={selectedTargetDistrictObj.blocks.map((b: any) => ({
                  label: b.name,
                  value: b.name,
                }))}
                error={formik.touched.t_block && formik.errors.t_block}
              />
            )}

            {selectedTargetBlockObj && (
              <SelectInput
                name="t_village"
                label="Village"
                value={formik.values.t_village}
                onChange={handleChange}
                onBlur={formik.handleBlur}
                options={selectedTargetBlockObj.villages.map((v: any) => ({
                  label: v,
                  value: v,
                }))}
                error={formik.touched.t_village && formik.errors.t_village}
              />
            )}
          </div>
          <div>
            <div className="w-full flex justify-evenly items-center gap-10">
              <div className="mt-3  w-[30%]">
                <Button
                  variant="success"
                  type="submit"
                  className="w-[100%] h-10 text-primary text-bold mt-5"
                  onClick={handleSubmit}
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
