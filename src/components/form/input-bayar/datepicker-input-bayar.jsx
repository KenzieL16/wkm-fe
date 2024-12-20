import React, { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { addDays, min } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { minInputBayar } from "@/server/tanggal-merah/min-input-bayar";

export function DatepickerInputBayar({ valueTglLhr, setValueTglLhr, disabled = false }) {
  const today = new Date();
  const minDate = addDays(today, -2);

  const { data, isLoading } = useQuery({
    queryFn: async () => await minInputBayar("mapping_status"),
  });

  if (isLoading) {
    return "Loading....";
  }

  return (
    <>
      <label
        htmlFor={"date-picker"}
        className="uppercase tracking-wide cursor-pointer text-gray-700 text-xs font-bold mb-2 mr-4 flex items-center col-span-3"
      >
        Tanggal Bayar
      </label>
      <Datepicker
        disabled={disabled}
        id={"date-picker"}
        popoverDirection="down"
        primaryColor={"emerald"}
        displayFormat="DD/MM/YYYY"
        minDate={data.min}
        maxDate={today}
        placeholder="_ _ /_ _ /_ _ _ _"
        inputClassName="pl-12 appearance-none block w-full  text-gray-700 border  col-span-8 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        toggleClassName="absolute rounded-r-lg -top-0  left-0 h-full px-3 text-black focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed text-black"
        dayClassName={(date) => (true ? "bg-red-200 text-red-600 cursor-not-allowed" : "")}
        useRange={false}
        asSingle={true}
        value={valueTglLhr}
        onChange={(newValue) => setValueTglLhr(newValue)}
        singleDatePicker={true}
      />
    </>
  );
}
