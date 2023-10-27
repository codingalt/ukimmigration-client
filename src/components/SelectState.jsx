import { Field } from "formik";
import React, { useEffect, useState } from "react";
import { useGetStatesByCountryQuery } from "../services/api/applicationApi"; // Import the appropriate query for getting states based on the selected country.

const SelectState = ({ name, className, notReq, selectedCountry }) => {
  const [states, setStates] = useState([]);
  const { data: statesData } = useGetStatesByCountryQuery(selectedCountry); // Fetch states based on the selected country.

  useEffect(() => {
    if (statesData) {
      const stateNames = statesData.map((state) => state.name);
      const sortedStates = stateNames.sort();
      setStates(sortedStates);
    }
  }, [statesData]);

  return (
    <Field
      required={notReq ? false : true}
      as="select"
      name={name}
      id={name}
      className={className}
    >
      <option value="">Select State</option>
      {states.map((state, index) => (
        <option key={index} value={state}>
          {state}
        </option>
      ))}
    </Field>
  );
};

export default SelectState;
