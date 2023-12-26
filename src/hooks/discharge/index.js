import { endpoints, request } from "../../config";

export const useDischarge = () => {
  // Add A consumer contract information document to database
  const create = async (data, token) => {
    // Add JWT token to json
    endpoints.discharge.create.token = token;
    // Add Data to json
    endpoints.discharge.create.data = data;
    const response = await request(endpoints.discharge.create);

    return response;
  };

  return {
    create,
  };
};
