import { env } from "@/utils";
import jwt from "jsonwebtoken";
// eslint-disable-next-line import/no-anonymous-default-export
export default async function (token, res) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded?.user?.id || decoded.app_id;
  } catch (err) {
    return res.status(401).json("Unauthorized!");
  }
}
