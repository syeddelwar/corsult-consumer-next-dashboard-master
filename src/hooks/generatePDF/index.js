import { endpoints, request } from "../../config";

export const useGeneratePDF = () => {
  // Function to fetch consumer info by application id
  const read = async (token, id) => {
    endpoints.generatePDF.id = id;
    // Add JWT token to json
    endpoints.generatePDF.token = token;
    const response = await request(endpoints.generatePDF);

    return response;
  };
  const savePDF = async (data, token, cell) => {
    // Add JWT token to json
    endpoints.savePDF.token = token;
    endpoints.savePDF.params.cell = cell || "";
    endpoints.savePDF.data = data;
    endpoints.savePDF.headers = { "Content-Type": "application/json" };

    const response = await request(endpoints.savePDF);

    return response;
  };
  const list = async (token, cell) => {
    // Add JWT token to json
    endpoints.listPDFs.token = token;
    endpoints.listPDFs.params.cell = cell || "";

    const response = await request(endpoints.listPDFs);

    return response;
  };

  return {
    read,
    savePDF,
    list,
  };
};
