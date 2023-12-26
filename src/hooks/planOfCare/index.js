import { endpoints, request } from "../../config";

export const usePlanOfCare = () => {
  // Add A plan of care information to database
  const create = async (data, token) => {
    // Add JWT token to json
    endpoints.planOfCare.create.token = token;
    // Add Data to json
    endpoints.planOfCare.create.data = data;
    const response = await request(endpoints.planOfCare.create);

    return response;
  };
  // Read A plan of care information from database
  const readLoggedInPOC = async (token) => {
    // Add JWT token to json
    endpoints.planOfCare.readLoggedIn.token = token;
    const response = await request(endpoints.planOfCare.readLoggedIn);

    return response;
  };

  // List plan of cares from database
  const list = async (token, query) => {
    // Add JWT token to json
    endpoints.planOfCare.list.token = token;
    endpoints.planOfCare.list.params.query = query || "";
    const response = await request(endpoints.planOfCare.list);

    return response;
  };

  // read plan of care document from database
  const read = async (consumerContractId, token) => {
    // Add JWT token to json
    endpoints.planOfCare.read.token = token;
    // Add ID to url
    endpoints.planOfCare.read.id = consumerContractId;
    const response = await request(endpoints.planOfCare.read);

    return response;
  };

  // update plan of care document from database
  const update = async (pocId, token, data) => {
    // Add JWT token to json
    endpoints.planOfCare.update.token = token;
    // Add ID to url
    endpoints.planOfCare.update.id = pocId;
    // Add JSON Data
    endpoints.planOfCare.update.data = data;
    const response = await request(endpoints.planOfCare.update);

    return response;
  };

  return {
    create,
    readLoggedInPOC,
    list,
    read,
    update,
  };
};
