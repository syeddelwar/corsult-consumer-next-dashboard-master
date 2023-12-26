import { endpoints, request } from "../../config";

export const useNursingAssessment = () => {
  // Add A nursing assessment information document to database
  const create = async (data, token) => {
    // Add JWT token to json
    endpoints.nursingAssessment.create.token = token;
    // Add Data to json
    endpoints.nursingAssessment.create.data = data;
    const response = await request(endpoints.nursingAssessment.create);

    return response;
  };
  // read nursing assessment information document from database
  const read = async (consumerContractId, token) => {
    // Add JWT token to json
    endpoints.nursingAssessment.read.token = token;
    // Add ID to url
    endpoints.nursingAssessment.read.id = consumerContractId;
    const response = await request(endpoints.nursingAssessment.read);

    return response;
  };
  // update nursing assessment document from database
  const update = async (assessmentId, token, data) => {
    // Add JWT token to json
    endpoints.nursingAssessment.update.token = token;
    // Add ID to url
    endpoints.nursingAssessment.update.id = assessmentId;
    // Add JSON Data
    endpoints.nursingAssessment.update.data = data;
    const response = await request(endpoints.nursingAssessment.update);

    return response;
  };

  // List consumer contract applications from database
  const list = async (token, query) => {
    // Add JWT token to json
    endpoints.nursingAssessment.list.token = token;
    endpoints.nursingAssessment.list.params.query = query || "";
    const response = await request(endpoints.nursingAssessment.list);

    return response;
  };
  return {
    create,
    read,
    update,
    list,
  };
};
