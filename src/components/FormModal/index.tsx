"use client";

import Image from "next/image";
import { useState } from "react";
import { FormModalProps } from "./@types/FormModalProps";
import { forms } from "./forms";

const FormModal = (props: FormModalProps) => {
  const size = props.type === "create" ? "w-8 h-8" : "w-7 h-7";
  const bgColor =
    props.type === "create"
      ? "bg-gray-300"
      : props.type === "update"
        ? "bg-blue-400"
        : "bg-orange-300";

  const [open, setOpen] = useState(false);

  const Form = () => {
    return props.type === "delete" && props.id
      ? forms["delete"](setOpen, {
          ...props,
          data: {
            id: props.id,
            table: props.table,
          },
        })
      : props.type === "create" || props.type === "update"
        ? forms[props.table](setOpen, props)
        : "Form not found!";
  };

  return (
    <>
      <button
        className={`${size} flex items-center justify-center rounded-full ${bgColor}`}
        onClick={() => setOpen(true)}
      >
        <Image src={`/${props.type}.png`} alt="" width={14} height={14} />
      </button>
      {open && (
        <div className="w-screen h-screen absolute left-0 top-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md relative w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2xl:w-[40%]">
            <Form />
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <Image src="/close.png" alt="" width={20} height={20} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
