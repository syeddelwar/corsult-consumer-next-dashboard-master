import UsersModel from "@/models/UsersModel";
import jwt from "jsonwebtoken";
import { isValidObjectId } from "mongoose";
// eslint-disable-next-line import/no-anonymous-default-export
export default async function (token, res) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded?.user?.id) {
      if (isValidObjectId(decoded.user.id)) {
        const isAdmin = await UsersModel.findById(decoded.user.id);

        if (isAdmin) {
          return true;
        } else {
          return res.status(401).json("Unauthorized Admin!");
        }
      } else {
        return res.status(401).json("Unauthorized Admin!");
      }
    }
  } catch ({ message }) {
    return res.status(500).json(message);
  }
}
