export default function generateCurrentDate() {
  const date = new Date(); // Get the current date
  const year = date.getFullYear(); // Get the year
  let month: string = `${date.getMonth() + 1}`; // Get the month (Note: January is 0)
  let day: string = `${date.getDate()}`; // Get the day of the month

  // Add leading zeros if the month or day is less than 10
  month = +month < 10 ? `0${month}` : month;
  day = +day < 10 ? `0${day}` : day;

  // Create the formatted date string
  return `${year}${month}${day}`
}