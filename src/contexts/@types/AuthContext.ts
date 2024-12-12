import { UserType } from "./User";

export type AuthContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
};
