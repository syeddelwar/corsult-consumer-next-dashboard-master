export default function (ssn) {
  // Regular expression for SSN format XXX-XX-XXXX
  const ssnRegex = /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/;

  // Test the input SSN against the regular expression
  return ssnRegex.test(ssn);
}
