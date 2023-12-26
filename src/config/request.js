import axios from "axios";
import Router from "next/router";
import routes from "./routes";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000/api/";

const client = axios.create({ baseURL });

export const request = async ({ ...options }) => {
  if (options.isAuthenticated) {
    client.defaults.headers.common.Authorization = `${options.token}`;
  }
  if (options.id) {
    options.url = options.url + options.id;
  }
  const onSuccess = (response) => {
    return response;
  };
  const onError = (error) => {
    console.log(error);
    if (error.response.status === 401) {
      return Router.push(routes.signIn + "?action=remove_token");
    }
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
