"use client";

import { SnackbarMessageType } from "@/enums/snackbarMessages";
import { assetSchema, AssetSchema } from "@/lib/formValidationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "../InputField";
import { FormProps } from "./@types/FormProps";
import { createAsset } from "@/services/assets";

const AssetForm: React.FC<FormProps & { relatedData?: any }> = ({
  type,
  data,
  setOpen,
  setIsRefresh,
  setShowMessage,
  setMessageType,
  setMessage,
  relatedData,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AssetSchema>({
    resolver: zodResolver(assetSchema),
  });

  const [loading, setLoading] = useState(false);
  const { drawerId } = relatedData;

  const onSubmit: SubmitHandler<AssetSchema> = async (data) => {
    try {
      setLoading(true);
      const newData = {
        cashDrawer: {
          id: drawerId ?? '',
        },
        amount: data.amount,
        assetType: data.assetType,
      }
      await createAsset(newData);
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
        {type === "create" ? "Thêm tài sản" : "Chỉnh tài sản"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Thông Tin Tài sản
      </span>
      <div className="flex gap-4 flex-col">
        <InputField
          label="Loại tài sản"
          name="assetType"
          register={register}
          error={errors?.assetType}
          classStyles='md:w-full'
        />
        <InputField
          label="Số tiền"
          name="amount"
          register={register}
          error={errors?.amount}
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

export default AssetForm;
