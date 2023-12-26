export default function () {
  const characters = "0123456789";
  const length = 8;
  let barcode = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    barcode += characters[randomIndex];
  }

  return barcode;
}
