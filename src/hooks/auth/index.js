import { useRouter } from "next/router";
import { endpoints, request, routes } from "../../config";
import { useContext } from "react";
import { AuthContext } from "@/context/auth/AuthState";

export const useSignIn = () => {
  const signInAdmin = async (email, password, login_role) => {
    endpoints.auth.login_admin.data = { email, password, login_role };
    const response = await request(endpoints.auth.login_admin);

    return response;
  };
  const signInConsumer = async (cell, password) => {
    endpoints.auth.login_consumer.data = { cell, password };
    const response = await request(endpoints.auth.login_consumer);

    return response;
  };

  return { signInAdmin, signInConsumer };
};
export const useSignOut = () => {
  /**
   * Helpers
   */
  const router = useRouter();
  const { setUser } = useContext(AuthContext);
  const signOut = () => {
    localStorage.removeItem("corsult-user");
    router.push(routes.signIn);
    setUser({
      type: null,
      token: "",
    });
  };
  return { signOut };
};
