"use client";

import { SnackbarMessageType } from "@/enums/snackbarMessages";
import { cashDrawerSchema, CashDrawerSchema } from "@/lib/formValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "../InputField";
import { FormProps } from "./@types/FormProps";
import { createCashDrawer } from "@/services/cashDrawers";

const CashDrawerForm: React.FC<FormProps> = ({
  type,
  data,
  setOpen,
  setIsRefresh,
  setShowMessage,
  setMessageType,
  setMessage,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CashDrawerSchema>({
    resolver: zodResolver(cashDrawerSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<CashDrawerSchema> = async (data) => {
    try {
      setLoading(true);
      await createCashDrawer(data);
      setMessage(
        type === "create"
          ? "Thêm thành công"
          : "Chỉnh sữa thông tin thành công",
      );
      setShowMessage(true);
      setMessageType(SnackbarMessageType.Success);
      setIsRefresh(true);
      setOpen(false);
    } catch (error) {
      setMessageType(SnackbarMessageType.Error);
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("An unknown error occurred while registering the user.");
      }
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Thêm ngăn đựng tiền" : "Chỉnh ngăn đựng tiền"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Thông Tin Tủ Thu Ngân
      </span>
      <div className="flex gap-4 flex-col">
        <InputField
          label="Tên tủ"
          name="drawerName"
          register={register}
          error={errors?.drawerName}
          classStyles='md:w-full'
        />
        <InputField
          label="Loại tủ"
          name="drawerType"
          register={register}
          error={errors?.drawerName}
          classStyles='md:w-full'
        />
      </div>
      <button
        className="bg-blue-400 text-white p-2 rounded-md"
        disabled={loading}
      >
        {type === "create" ? "Thêm" : "Xong"}
      </button>
    </form>
  );
};

export default CashDrawerForm;
