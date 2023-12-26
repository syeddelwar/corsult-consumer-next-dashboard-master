import FaxModel from "../models/FaxModel";
// eslint-disable-next-line import/no-anonymous-default-export
export default async function (barcode, res) {
  try {
    const fax = await FaxModel.findOne({ barcode }).populate(
      "consumer_contract_id",
      "-app_password"
    );

    return fax;
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ err, barcode });
  }
}
