import React, { useEffect, useState } from "react";
import axios from "axios";
import { Field } from "formik";

function LanguageList({ name, className, onChange, prevValue, setFieldValue }) {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        // Extract language data from the API response
        const languagesData = response?.data?.reduce((acc, country) => {
          return acc.concat(country.languages.map((lang) => lang.name));
        }, []);

        // Remove duplicates
        const uniqueLanguages = Array.from(new Set(languagesData));

        setLanguages(uniqueLanguages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(name);

  return (
    <select
      required
      as="select"
      name={name}
      id={name}
      className={className}
      onChange={(e) => {
        if (!prevValue.includes(e.target.value)) {
          onChange([...prevValue, e.target.value]);
          setFieldValue("phase1.otherLanguagesSpeak", [
            ...prevValue,
            e.target.value,
          ]);
        }
      }}
    >
      <option value="">Select Language</option>
      {languages?.map((language, index) => (
        <option key={index} value={language}>
          {language}
        </option>
      ))}
    </select>
  );
}

export default LanguageList;
