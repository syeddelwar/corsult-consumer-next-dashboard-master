import multiparty from "multiparty";

export default async function (req) {
  return new Promise((resolve, reject) => {
    const form = new multiparty.Form();

    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
}
