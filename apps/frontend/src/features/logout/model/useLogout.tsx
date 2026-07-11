import {
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  REFRESH_TOKEN_LOCAL_STORAGE_KEY,
} from "@/shared/consts";
import { useInvalidateAuth } from "@/entities/auth/queries";

export function useLogout() {
  const invalidateAuth = useInvalidateAuth();

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_LOCAL_STORAGE_KEY);
    invalidateAuth();
  };

  return { logout };
}
