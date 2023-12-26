import { env } from "@/utils";
import jwt from "jsonwebtoken";
// eslint-disable-next-line import/no-anonymous-default-export
export default function (token, res) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.app_id;
  } catch (err) {
    return res.status(401).json("Unauthorized!");
  }
}
