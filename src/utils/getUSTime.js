export default function () {
  const currentDate = new Date();

  const options = {
    timeZone: "America/New_York", // US Eastern Time (ET)
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);

  const [month, day, year, hour, minute, second, ampm] = formatter
    .formatToParts(currentDate)
    .filter((part) => part.type !== "literal")
    .map((part) => part.value);

  const formattedDate = `${year}-${month}-${day}_${hour}-${minute}-${second} ${ampm}`;

  return formattedDate;
}
