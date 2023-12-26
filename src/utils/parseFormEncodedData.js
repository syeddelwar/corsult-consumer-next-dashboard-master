import querystring from "querystring";

export default function (req) {
  return new Promise((resolve, reject) => {
    let body = "";

    // Collect the incoming data chunks
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // Parse the collected data as form-encoded
    req.on("end", () => {
      try {
        const formData = querystring.parse(body);
        resolve(formData);
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", (error) => {
      reject(error);
    });
  });
}
