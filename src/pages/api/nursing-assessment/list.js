import NursingAssessmentModel from "@/models/NursingAssessmentModel";
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
        let assessments = await NursingAssessmentModel.find()
          .sort({ createdAt: -1 })
          .limit(15)
          .populate("consumer_contract_id");

        if (query) {
          const assessmentsCursor = await NursingAssessmentModel.aggregate([
            {
              $lookup: {
                from: "consumer_contracts",
                localField: "consumer_contract_id",
                foreignField: "_id",
                as: "consumer_contract_id",
              },
            },
            {
              $match: {
                "consumer_contract_id.consumerInfo.consumer_cell": query,
              },
            },
            {
              $sort: { createdAt: -1 },
            },
            {
              $limit: 15, // Limit the number of results to 10
            },
            {
              $unwind: "$consumer_contract_id",
            },
          ]);
          assessments = assessmentsCursor;
        }
        return res.json(assessments);
      } catch ({ message, statusCode }) {
        return res.status(statusCode || 500).json(message);
      }
  }
}
