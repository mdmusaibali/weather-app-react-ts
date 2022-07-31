const unixToStandard = (unix: number) => {
  const milliseconds = unix * 1000; // 1575909015000

  const dateObject = new Date(milliseconds);

  const humanDateFormat = dateObject.toLocaleString(); //2019-12-9 10:30:15

  const dayLong = dateObject.toLocaleString("en-US", { weekday: "long" });
  const monthLong = dateObject.toLocaleString("en-US", { month: "short" });
  const dateShort = dateObject.toLocaleString("en-US", { day: "numeric" }); // 9
  const yearShort = dateObject.toLocaleString("en-US", { year: "numeric" }); // 2019
  dateObject.toLocaleString("en-US", { hour: "numeric" }); // 10 AM
  dateObject.toLocaleString("en-US", { minute: "numeric" }); // 30
  dateObject.toLocaleString("en-US", { second: "numeric" }); // 15
  dateObject.toLocaleString("en-US", { timeZoneName: "short" }); // 12/9/2019, 10:30:15 AM CST
  return { dateShort, dayLong, monthLong, yearShort };
};
export default unixToStandard;
