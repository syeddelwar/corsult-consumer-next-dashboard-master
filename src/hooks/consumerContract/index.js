import { endpoints, request } from "../../config";

export const useConsumerContract = () => {
  // Add A consumer contract information document to database
  const create = async (data, token) => {
    // Add JWT token to json
    endpoints.consumerContract.create.token = token;
    // Add Data to json
    endpoints.consumerContract.create.data = data;
    const response = await request(endpoints.consumerContract.create);

    return response;
  };
  // List consumer contract applications from database
  const list = async (token, query) => {
    // Add JWT token to json
    endpoints.consumerContract.readApplications.token = token;
    endpoints.consumerContract.readApplications.params.query = query || "";
    const response = await request(endpoints.consumerContract.readApplications);

    return response;
  };
  // Delete A consumer contract information document from database
  const deleteApplication = async (token, id, delete_pdfs) => {
    endpoints.consumerContract.delete.id = id;
    // Add JWT token to json
    endpoints.consumerContract.delete.token = token;
    endpoints.consumerContract.delete.params.delete_pdfs = delete_pdfs;
    const response = await request(endpoints.consumerContract.delete);

    return response;
  };
  // Function to fetch consumer contract application on consumer login
  const readLoggedinApplication = async (token) => {
    // Add JWT token to json
    endpoints.consumerContract.readLoggedinApplication.token = token;
    const response = await request(
      endpoints.consumerContract.readLoggedinApplication
    );

    return response;
  };
  // Function to update consumer contract application on consumer login
  const updateLoggedinApplication = async (token, data) => {
    // Add JWT token to json
    endpoints.consumerContract.updateLoggedinApplication.token = token;
    endpoints.consumerContract.updateLoggedinApplication.data = data;
    const response = await request(
      endpoints.consumerContract.updateLoggedinApplication
    );

    return response;
  };

  // Function to fetch consumer contract application by application id
  const read = async (token, id) => {
    endpoints.consumerContract.read.id = id;
    // Add JWT token to json
    endpoints.consumerContract.read.token = token;
    const response = await request(endpoints.consumerContract.read);

    return response;
  };
  // Function to fetch consumer contract application by application id
  const update = async (data, token, id) => {
    endpoints.consumerContract.update.id = id;
    endpoints.consumerContract.update.data = data;
    // Add JWT token to json
    endpoints.consumerContract.update.token = token;
    const response = await request(endpoints.consumerContract.update);

    return response;
  };
  // Function to update consumer app password by application id
  const changePassword = async (data, token) => {
    endpoints.consumerContract.changePassword.data = data;
    // Add JWT token to json
    endpoints.consumerContract.changePassword.token = token;
    const response = await request(endpoints.consumerContract.changePassword);

    return response;
  };

  return {
    create,
    list,
    read,
    update,
    deleteApplication,
    readLoggedinApplication,
    updateLoggedinApplication,
    changePassword,
  };
};
