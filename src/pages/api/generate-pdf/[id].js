import ConsumerContractModel from "../../../models/ConsumerContractModel";
import dbConnect from "../../../lib/dbConnect";
import { isValidObjectId } from "mongoose";
import { isAdmin, verifyToken } from "@/middlewares";
import DischargeModel from "@/models/DischargeModel";
import NursingAssessmentModel from "@/models/NursingAssessmentModel";
import PatientEmergencyModel from "@/models/PatientEmergencyModel";
import PlanOfCareModel from "@/models/PlanOfCareModel";
import FaxModel from "@/models/FaxModel";

export default async function handler(req, res) {
  const { method, headers, body } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const { id } = req.query;
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
        if (isValidObjectId(id)) {
          const consumerContract = await ConsumerContractModel.findById(id)
            .select("-app_password")
            .select("-createdAt")
            .select("-updatedAt");
          const discharge = await DischargeModel.findOne({
            consumer_contract_id: id,
          });
          const nursingAssessment = await NursingAssessmentModel.findOne({
            consumer_contract_id: id,
          });
          const emergency = await PatientEmergencyModel.findOne({
            consumer_contract_id: id,
          });
          const planOfCare = await PlanOfCareModel.findOne({
            consumer_contract_id: id,
          });
          const fax = await FaxModel.findOne({
            consumer_contract_id: id,
          });

          return res.json({
            consumerContract,
            discharge,
            nursingAssessment,
            emergency,
            planOfCare,
            fax,
          });
        } else {
          return res.status(400).json("Invalid Application ID");
        }
      } catch ({ message, statusCode }) {
        return res.status(statusCode || 500).json(message);
      }
  }
}
