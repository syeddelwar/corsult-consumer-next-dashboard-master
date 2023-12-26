const mongoose = require("mongoose");
const FaxModel = new mongoose.Schema(
  {
    consumer_contract_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "consumer_contracts",
    },
    surgical_procedure: {
      type: String,
    },
    surgical_procedure_date: {
      type: String,
    },
    dme_and_supplies: {
      type: String,
    },
    consumerPDF: {
      type: String,
    },
    barcode: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.faxs || mongoose.model("faxs", FaxModel);
