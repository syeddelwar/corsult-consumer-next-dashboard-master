export default function (input) {
  // Remove all non-digit characters from the input
  const cleanedInput = input.replace(/\D/g, "");

  // Format SSN as XXX-XX-XXXX
  const formattedSSN = cleanedInput
    .slice(0, 9)
    .replace(/^(\d{3})(\d{2})?(\d{0,4})?$/, (_, p1, p2, p3) => {
      let result = p1;
      if (p2) {
        result += `-${p2}`;
      }
      if (p3) {
        result += `-${p3}`;
      }
      return result;
    });

  return formattedSSN;
}
