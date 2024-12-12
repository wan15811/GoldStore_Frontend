"use client";

import { SnackbarMessageType } from "@/enums/snackbarMessages";
import { goldPriceSchema, GoldPriceSchema } from "@/lib/formValidationSchemas";
import { vietnameseTrans } from "@/lib/vietnameseTrans";
import { updateGoldPrice } from "@/services/goldPrice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "../InputField";
import { FormProps } from "./@types/FormProps";

const GoldPriceForm: React.FC<FormProps> = ({
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
  } = useForm<GoldPriceSchema>({
    resolver: zodResolver(goldPriceSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<GoldPriceSchema> = async (data) => {
    try {
      setLoading(true);

      await updateGoldPrice(data.goldType!, data);

      setMessage(
        type === "create"
          ? "Thêm thành công"
          : "Chỉnh sữa thông tin thành công",
      );
      setShowMessage(true);
      setMessageType(SnackbarMessageType.Success);
      setIsRefresh(true);
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
        {type === "create" ? "Thêm giá vàng" : "Chỉnh sữa giá vàng"}
      </h1>
      <span className="text-xs text-gray-400 font-medium">
        Thông Tin Giá Vàng
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <div className="h-full content-center justify-center">
            {vietnameseTrans[data.goldType]}
          </div>
          <input
            {...register("goldType")}
            className="hidden"
            defaultValue={data?.goldType}
          />
        </div>
        <InputField
          label="Giá Mua"
          name="askPrice"
          defaultValue={data?.askPrice}
          register={register}
          error={errors?.askPrice}
        />
        <InputField
          label="Giá Bán"
          name="bidPrice"
          defaultValue={data?.bidPrice}
          register={register}
          error={errors?.bidPrice}
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

export default GoldPriceForm;
