"use client";

import { SnackbarMessageType } from "@/enums/snackbarMessages";
import { contactSchema, ContactSchema } from "@/lib/formValidationSchemas";
import { createContact, updateContact } from "@/services/contacts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import InputField from "../InputField";
import { FormProps } from "./@types/FormProps";

const ContactForm: React.FC<FormProps> = ({
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
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<ContactSchema> = async (data) => {
    try {
      setLoading(true);

      if (type === "create") {
        await createContact(data);
      } else {
        await updateContact(data.id!, data);
      }

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
        Thông Tin Danh Bạ
      </span>
      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label="Tên Người Gọi"
          name="name"
          defaultValue={data?.name}
          register={register}
          error={errors?.name}
        />
        <InputField
          label="Số Điện Thoài"
          name="phone"
          defaultValue={data?.phone}
          register={register}
          error={errors?.phone}
        />
        <div className="flex flex-col gap-2 w-full md:w-1/4">
          <label className="text-xs text-gray-500">Loại Điện Thoại</label>
          <select
            className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
            {...register("phoneType")}
          >
            <option value="mobile" key="mobile">
              Số di động
            </option>
            <option value="home" key="home">
              Số nhà
            </option>
          </select>
          {errors.phoneType?.message && (
            <p className="text-xs text-red-400">
              {errors.phoneType.message.toString()}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full md:w-full">
        <label className="text-xs text-gray-500">Ghi Chú</label>
        <input
          {...register("description")}
          className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
          defaultValue={data?.description}
        />
        {errors.description?.message && (
          <p className="text-xs text-red-400">
            {errors.description.message.toString()}
          </p>
        )}
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

export default ContactForm;
