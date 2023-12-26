import { isAdmin, verifyToken } from "@/middlewares";
import ConsumerContractModel from "@/models/ConsumerContractModel";
import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const { method, headers } = req;

  switch (method) {
    case "GET":
      try {
        /**
         * Validate Whether Token Is Passed In Request Or Not
         *
         * ?True: Check if it is valid or not
         * */
        const token = headers["authorization"];
        if (!token) {
          return res.status(401).json("Unauthorized!");
        } else {
          await verifyToken(token, res);
          await isAdmin(token, res);
        }
        const { cell } = req.query;

        const doesConsumerFolderExists = path.join(
          process.cwd(),
          `${process.env.PDFS_BASE_URL}/${cell}`
        );

        if (!fs.existsSync(doesConsumerFolderExists)) {
          return res.status(404).json("No PDFs Exists For This Consumer!");
        } else {
          const app = await ConsumerContractModel.findOne({
            "consumerInfo.consumer_cell": cell,
          });

          const readFiles = new Promise((res, rej) => {
            let foundFiles = [];
            fs.readdir(doesConsumerFolderExists, (err, files) => {
              files.forEach(async (file) => {
                foundFiles.push({
                  file,
                  consumerName:
                    app?.consumerInfo?.consumer_first_name +
                    app?.consumerInfo?.consumer_last_name,
                });
              });
              // Check whether all the files have been pushed to foundFiles variable or not
              if (foundFiles.length === files.length) {
                res(foundFiles);
              }
            });
          });

          readFiles.then((foundFiles) => {
            return res.json(foundFiles);
          });
        }
      } catch ({ message, code, keyPattern, statusCode, errors }) {
        return res.status(statusCode || 500).json(message);
      }
  }
}
