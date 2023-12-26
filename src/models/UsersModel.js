const mongoose = require("mongoose");
const UsersModel = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  login_role: {
    type: String,
    required: true,
  },
});

export default mongoose.models.users || mongoose.model("users", UsersModel);
