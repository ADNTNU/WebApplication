const getTimedeltaFromHoursMinutes = (hours: number, minutes: number) => {
  const parsedHours = Math.floor(hours);
  const parsedMinutes = Math.floor(minutes);
  return parsedHours * 60 + parsedMinutes;
};

export default getTimedeltaFromHoursMinutes;
