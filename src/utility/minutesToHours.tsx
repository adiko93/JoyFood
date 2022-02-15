export default function minutesToHours(minutes: number) {
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  const days = Math.floor(hours / 24);

  if (days > 0)
    return `${days} ${days === 1 ? "day" : "days"} ${
      hours % 24 > 0
        ? `${hours % 24} ${hours % 24 === 1 ? "hour" : "hours"}`
        : ""
    }${
      minutes > 0 ? ` ${minutes} ${minutes === 1 ? "minute" : "minutes"}` : ""
    }`;
  if (hours > 0)
    return `${hours} ${hours % 24 === 1 ? "hour" : "hours"}${
      minutes > 0 ? ` ${minutes} ${minutes === 1 ? "minute" : "minutes"}` : ""
    }`;
  return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
}
