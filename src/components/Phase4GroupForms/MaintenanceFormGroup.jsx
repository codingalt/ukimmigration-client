import React, { useEffect, useMemo, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  useGetCountriesQuery,
  usePostMaintenanceMutation,
  usePostPhase4Mutation,
} from "../../services/api/applicationApi";
import { maintenanceSchema } from "../../utils/ValidationSchema";
import { toastError } from "../Toast";
import Loader from "../Loader";
import SelectCountry from "../SelectCountry";
import { usePostGroupMaintenanceMutation } from "../../services/api/companyClient";

const MaintenanceFormGroup = ({ data, setActiveTab, initialValues, refetch }) => {
  const application = data?.application;
  console.log("Maintenance Phase 4", initialValues);

  // const [postPhase4, res] = usePostPhase4Mutation();
  const [postGroupMaintenance, res] =
    usePostGroupMaintenanceMutation();
  const { isLoading, isSuccess, error } = res;

  useMemo(() => {
    if (isSuccess) {
      refetch();
      setActiveTab("/travel");
    }
  }, [isSuccess]);

  useMemo(() => {
    if (error) {
      toastError("Something went wrong");
    }
  }, [error]);

  const handleSubmitData = async (values) => {
    await postGroupMaintenance({
      data: values.phase4.maintenance,
      applicationId: application?._id,
    });
    console.log("submitted", values.phase4?.maintenance);
  };

  const handleBackClick = () => {
    setActiveTab("/employement");
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitData}
        validationSchema={maintenanceSchema}
      >
        {({ setFieldValue, errors, touched, values }) => (
          <Form
            style={{
              display: "flex",
              width: "100%",
              columnGap: "10rem",
            }}
          >
            <div className="left-side-phase">
              <p className="genral-text-left-side">1.Name of Bank*</p>
              <Field
                type="text"
                className="genral-input-left-side"
                placeholder="Bank Name"
                name="phase4.maintenance.bankName"
                id="phase4.maintenance.bankName"
                style={
                  errors?.phase4?.maintenance?.bankName &&
                  touched?.phase4?.maintenance?.bankName && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">
                2.Is it a registered recognized financial institute ?*
              </p>
              <Field
                type="text"
                className="genral-input-left-side"
                placeholder="Type Answer"
                name="phase4.maintenance.isRegisteredFinancialInstitute"
                id="phase4.maintenance.isRegisteredFinancialInstitute"
                style={
                  errors?.phase4?.maintenance?.isRegisteredFinancialInstitute &&
                  touched?.phase4?.maintenance
                    ?.isRegisteredFinancialInstitute && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">3.Country funds held in*</p>
              <SelectCountry
                className="form-select genral-input-left-side-selector"
                name="phase4.maintenance.countryFundsHeldIn"
                id="phase4.maintenance.countryFundsHeldIn"
              ></SelectCountry>

              <p className="genral-text-left-side">
                4.Currency funds held in?*
              </p>
              <SelectCountry
                className="form-select genral-input-left-side-selector"
                name="phase4.maintenance.currencyFundsHeldIn"
                id="phase4.maintenance.currencyFundsHeldIn"
              ></SelectCountry>

              <p className="genral-text-left-side">5.Amount held?*</p>
              <Field
                type="text"
                className="genral-input-left-side"
                placeholder="Amount held"
                name="phase4.maintenance.amountHeld"
                id="phase4.maintenance.amountHeld"
                style={
                  errors?.phase4?.maintenance?.amountHeld &&
                  touched?.phase4?.maintenance?.amountHeld && {
                    border: "1px solid red",
                  }
                }
              />

              <p className="genral-text-left-side">
                6.Date the funds have been held from?*
              </p>
              <Field
                type="date"
                className="genral-input-left-side"
                name="phase4.maintenance.fundsDateHeldFrom"
                id="phase4.maintenance.fundsDateHeldFrom"
                style={
                  errors?.phase4?.maintenance?.fundsDateHeldFrom &&
                  touched?.phase4?.maintenance?.fundsDateHeldFrom && {
                    border: "1px solid red",
                  }
                }
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginTop: "1.5rem",
                }}
              >
                <button
                  disabled={isLoading}
                  type="button"
                  className="back-button-new"
                  onClick={handleBackClick}
                >
                  Back
                </button>
                <button
                  disabled={isLoading}
                  type="submit"
                  className="Next-button"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "0",
                  }}
                >
                  {isLoading ? <Loader /> : "Next"}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default MaintenanceFormGroup