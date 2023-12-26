import ConsumerContractModel from "../../../models/ConsumerContractModel";
import dbConnect from "../../../lib/dbConnect";
import { isAdmin, verifyToken } from "@/middlewares";

export default async function handler(req, res) {
  const { method, headers } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        /**
         * Validate Whether Token Is Passed In Request Or Not
         *
         * ?True: Check if it is valid or not
         * */
        const token = headers["authorization"];
        const { query } = req.query;
        if (!token) {
          return res.status(401).json("Unauthorized!");
        } else {
          await verifyToken(token, res);
          await isAdmin(token, res);
        }
        // Get All The Applications from DB
        let applications = await ConsumerContractModel.find()
          .select("-app_password")
          .sort({ createdAt: -1 });

        if (query) {
          applications = await ConsumerContractModel.find({
            "consumerInfo.consumer_cell": query,
          })
            .select("-app_password")
            .sort({ createdAt: -1 });
        }

        return res.json(applications);
      } catch ({ message, statusCode }) {
        return res.status(statusCode || 500).json(message);
      }
  }
}
