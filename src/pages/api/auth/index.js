// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import bcrypt from "bcryptjs";
import UsersModel from "../../../models/UsersModel";
import dbConnect from "../../../lib/dbConnect";
import jwt from "jsonwebtoken";
import { HttpError, env } from "@/utils";

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  const { method, body } = req;

  await dbConnect();
  switch (method) {
    case "GET":
      try {
        // Hash
        const saltAdmin = await bcrypt.genSalt(10);
        const hashAdmin = await bcrypt.hash("Cdpap@@2024!#%", saltAdmin);

        await UsersModel.create({
          email: "admin@corsult.com",
          password: hashAdmin,
          login_role: "admin",
        });
        // Hash
        const saltNurseOne = await bcrypt.genSalt(10);
        const hashNurseOne = await bcrypt.hash("nurseone123", saltNurseOne);

        await UsersModel.create({
          email: "nurseone@corsult.com",
          password: hashNurseOne,
          login_role: "nurse",
        });
        // Hash
        const saltNurseTwo = await bcrypt.genSalt(10);
        const hashNurseTwo = await bcrypt.hash("nursetwo123", saltNurseTwo);

        await UsersModel.create({
          email: "nursetwo@corsult.com",
          password: hashNurseTwo,
          login_role: "nurse",
        });
        return res.status(201).json("Admin Created");
      } catch (error) {
        console.log(error);
        // return res.status(500).json("Admin Already Exists");
        return res.status(500).json(error);
      }
    case "POST":
      try {
        const { email, password, login_role } = body;
        let user = await UsersModel.findOne({ email, login_role });
        // Check Whether the email exists or not
        if (!user) {
          throw new HttpError("Invalid Credentials", 401);
        }
        const passwordCompare = await bcrypt.compare(password, user.password);

        // Check whether the password is correct or not
        if (!passwordCompare) {
          throw new HttpError("Invalid Credentials", 401);
        }

        // Add payload to request
        const data = {
          user: {
            id: user._id,
          },
        };
        const authToken = jwt.sign(data, JWT_SECRET);

        return res.json(authToken);
      } catch ({ message, statusCode }) {
        return res.status(statusCode || 500).json(message);
      }
  }
}
