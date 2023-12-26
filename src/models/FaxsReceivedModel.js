const mongoose = require("mongoose");
const FaxsReceived = new mongoose.Schema(
  {
    data: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  { timestamps: true }
);

export default mongoose.models.faxs_received ||
  mongoose.model("faxs_received", FaxsReceived);
