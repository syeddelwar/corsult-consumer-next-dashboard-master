import { endpoints, request } from "../../config";

export const useFax = () => {
  // Add A consumer contract information document to database
  const create = async (data, token) => {
    // Add JWT token to json
    endpoints.fax.create.token = token;
    // Add Data to json
    endpoints.fax.create.data = data;
    const response = await request(endpoints.fax.create);

    return response;
  };

  return {
    create,
  };
};
