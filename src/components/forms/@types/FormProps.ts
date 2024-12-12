import { SnackbarMessageType } from "@/enums/snackbarMessages";
import { Dispatch, SetStateAction } from "react";

export type FormProps = {
  type: "create" | "update" | "delete";
  data?: any;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIsRefresh: Dispatch<SetStateAction<boolean>>;
  setShowMessage: Dispatch<SetStateAction<boolean>>;
  setMessageType: Dispatch<SetStateAction<SnackbarMessageType>>;
  setMessage: Dispatch<SetStateAction<string>>;
};
