import { getVerifyID } from "@/middlewares";
import { sendEmail } from "@/service";
import { isValidObjectId } from "mongoose";

export default async function handler(req, res) {
  const { method, body, headers } = req;

  switch (method) {
    case "POST":
      try {
        const token = headers["authorization"];
        const appId = getVerifyID(token, res);
        if (!isValidObjectId(appId)) {
          throw new HttpError("Unauthorized", 401);
        }
        const { query, application_phone_no } = req.query;
        const html = `
        <span>Phone No: ${application_phone_no}</span> <br>
        <span>Comment: ${query}</span>
        `;
        await sendEmail(
          process.env.ADMIN_EMAIL,
          `Comment On Application ${application_phone_no}`,
          html
        );
        return res.json("Email Sent!");
      } catch ({ message, statusCode }) {
        return res
          .status(statusCode || 500)
          .json("Something Went Wrong. Try Again Later");
      }
  }
}
