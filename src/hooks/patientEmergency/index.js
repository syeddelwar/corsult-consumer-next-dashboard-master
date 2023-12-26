import { endpoints, request } from "../../config";

export const usePatientEmergency = () => {
  // Add A Patient Emergency information document to database
  const create = async (data, token) => {
    // Add JWT token to json
    endpoints.patientEmergency.create.token = token;
    // Add Data to json
    endpoints.patientEmergency.create.data = data;
    const response = await request(endpoints.patientEmergency.create);

    return response;
  };

  // Read patient emergency information from database
  const readLoggedInPatientEmergency = async (token) => {
    // Add JWT token to json
    endpoints.patientEmergency.readLoggedIn.token = token;
    const response = await request(endpoints.patientEmergency.readLoggedIn);

    return response;
  };

  // List emergencies from database
  const list = async (token, query) => {
    // Add JWT token to json
    endpoints.patientEmergency.list.token = token;
    endpoints.patientEmergency.list.params.query = query || "";
    const response = await request(endpoints.patientEmergency.list);

    return response;
  };

  // read emergency information document from database
  const read = async (consumerContractId, token) => {
    // Add JWT token to json
    endpoints.patientEmergency.read.token = token;
    // Add ID to url
    endpoints.patientEmergency.read.id = consumerContractId;
    const response = await request(endpoints.patientEmergency.read);

    return response;
  };

  // update patient emergency document from database
  const update = async (emergencyId, token, data) => {
    // Add JWT token to json
    endpoints.patientEmergency.update.token = token;
    // Add ID to url
    endpoints.patientEmergency.update.id = emergencyId;
    // Add JSON Data
    endpoints.patientEmergency.update.data = data;
    const response = await request(endpoints.patientEmergency.update);

    return response;
  };

  return {
    create,
    readLoggedInPatientEmergency,
    list,
    read,
    update,
  };
};
