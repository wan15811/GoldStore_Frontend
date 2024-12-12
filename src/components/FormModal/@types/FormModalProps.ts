import { SnackbarMessageType } from "@/enums/snackbarMessages";
import { Dispatch, SetStateAction } from "react";

export type FormModalProps = {
  table:
    | "vendor"
    | "goldPrice"
    | "product"
    | "order"
    | "staff"
    | "user"
    | "contact"
  // | "relative"
  // | "cashFlow"
    | "cashDrawer"
    | "assets";
  // | "admin";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
  setIsRefresh: Dispatch<SetStateAction<boolean>>;
  setShowMessage: Dispatch<SetStateAction<boolean>>;
  setMessageType: Dispatch<SetStateAction<SnackbarMessageType>>;
  setMessage: Dispatch<SetStateAction<string>>;
  relatedData?: any;
};
