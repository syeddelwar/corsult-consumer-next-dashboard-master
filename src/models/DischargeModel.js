const mongoose = require("mongoose");
const DischargeModel = new mongoose.Schema(
  {
    consumer_contract_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "consumer_contracts",
      unique: true,
    },
    discharge_reason: {
      type: String,
    },
    summary_of_care: {
      type: String,
    },
    summary_of_patient_progress: {
      type: String,
    },
    patient_remaining_needs: {
      type: String,
    },
    patient_remaining_problems: {
      type: String,
    },
    other_discharge_reason: {
      type: String,
    },
    transferred_to: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.discharge ||
  mongoose.model("discharge", DischargeModel);
