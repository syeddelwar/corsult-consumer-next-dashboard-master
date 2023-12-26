// Function to format phone number
export default function (input) {
  const formattedPhoneNumber = input.replace(
    /(\d{3})(\d{3})(\d{4})/,
    "($1) $2-$3"
  ); // (012)345-6789;

  return formattedPhoneNumber;
}
