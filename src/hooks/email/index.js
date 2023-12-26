import { endpoints, request } from "../../config";

export const useEmail = () => {
  // Function to fetch consumer info by application id
  const send = async (token, query, appPhoneNo) => {
    endpoints.sendEmail.params.query = query;
    endpoints.sendEmail.params.application_phone_no = appPhoneNo;
    // Add JWT token to json
    endpoints.sendEmail.token = token;
    const response = await request(endpoints.sendEmail);

    return response;
  };

  return {
    send,
  };
};
