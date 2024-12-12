"use client";

import { SnackbarMessageType } from "@/enums/snackbarMessages";
import { deleteSchema, DeleteSchema } from "@/lib/formValidationSchemas";
import { vietnameseTrans } from "@/lib/vietnameseTrans";
import { deleteProduct } from "@/services/products";
import { deleteStaff } from "@/services/staffs";
import { deleteUser } from "@/services/users";
import { deleteVendor } from "@/services/vendors";
import { deleteCashDrawer } from "@/services/cashDrawers";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormProps } from "./@types/FormProps";
import { deleteAsset } from "@/services/assets";
import { deleteOrder } from "@/services/orderDetails";

const deleteActionMap = {
  vendor: deleteVendor,
  user: deleteUser,
  staff: deleteStaff,
  product: deleteProduct,
  cashDrawer: deleteCashDrawer,
  assets: deleteAsset,
  order: deleteOrder,
};

const DeleteForm: React.FC<FormProps> = ({
  data,
  setOpen,
  setIsRefresh,
  setShowMessage,
  setMessageType,
  setMessage,
}) => {
  const { register, handleSubmit } = useForm<DeleteSchema>({
    resolver: zodResolver(deleteSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<DeleteSchema> = async (data) => {
    try {
      setLoading(true);
      await deleteActionMap[data.table](data.id ?? "");
      setMessage("Delete success");
      setShowMessage(true);
      setMessageType(SnackbarMessageType.Success);
      setIsRefresh(true);
    } catch (error) {
      setMessageType(SnackbarMessageType.Error);
      if (error instanceof Error) {
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage("An unknown error.");
      }
      setShowMessage(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="p-4 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text | number"
        {...register("id")}
        defaultValue={data.id}
        hidden
      />
      <input
        type="text"
        {...register("table")}
        defaultValue={data.table}
        hidden
      />
      <span className="text-center font-medium">
        Tất cả dữ liệu sẽ bị mất, bạn có chắc muốn xóa&nbsp;
        {vietnameseTrans[data.table]}?
      </span>
      <button className="bg-red-700 text-white py-2 px-4 rounded-md border-none w-max self-center">
        Xóa
      </button>
    </form>
  );
};

export default DeleteForm;
