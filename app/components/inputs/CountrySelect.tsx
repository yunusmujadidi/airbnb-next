"use client";
import useCountries from "@/app/hooks/useCountry";
import React from "react";
// using react-select
import Select from "react-select";

export type CountrySelectValue = {
  value: string;
  label: string;
  flag: string;
  latlng: number[];
  region: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}
const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const { getAll } = useCountries();
  return (
    <Select
      placeholder="Anywhere"
      isClearable
      value={value}
      options={getAll()}
      onChange={(value) => onChange(value as CountrySelectValue)}
      formatOptionLabel={(option) => (
        <div className="flex flex-row items-center gap-3">
          <div>{option.flag}</div>
          <div>
            {option.label}
            <span className="text-neutral-500 ml-1">{option.region}</span>
          </div>
        </div>
      )}
      classNames={{
        control: () => "p-3 border-2",
        input: () => "text-lg",
        option: () => "text-lg",
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: "black",
          primary25: "#ffe4e6",
        },
      })}
    />
  );
};

export default CountrySelect;
