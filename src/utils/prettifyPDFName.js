export default function (filename) {
  // Split the filename into date/time and extension parts
  const [dateTimePart, extension] = filename.split(".");

  // Extract the date and time parts
  const [datePart, timePart] = dateTimePart.split("_");

  // Extract year, month, day, hour, minute, second, and period (AM/PM)
  const [year, month, day] = datePart.split("-");
  const [time, period] = timePart.split(" ");
  const [hour, minute, second] = time.split("-");

  // Create an array of month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Convert month number to month name
  const monthName = monthNames[parseInt(month) - 1];

  // Convert hour to 12-hour format and handle AM/PM
  let convertedHour = parseInt(hour);
  const periodLabel = period.toUpperCase();

  if (convertedHour === 0) {
    convertedHour = 12;
  } else if (convertedHour > 12) {
    convertedHour -= 12;
  }

  // Format hours, minutes, and seconds
  const formattedTime = `${convertedHour
    .toString()
    .padStart(2, "0")}:${minute}:${second} ${periodLabel}`;

  // Create the final formatted string
  const result = `${monthName} ${day}, ${year} ${formattedTime}`;

  return result;
}
