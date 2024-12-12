import React from "react";
import { InputFieldProps } from "./@types/InputFieldProps";

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
  classStyles,
}) => {
  return (
    <div className={`flex flex-col gap-2 w-full md:w-1/4 ${classStyles}`}>
      <label className="text-xs text-gray-500">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        {...inputProps}
        defaultValue={defaultValue}
      />
      {error?.message && (
        <p className="text-xs text-red-400">{error.message.toString()}</p>
      )}
    </div>
  );
};

export default InputField;
