import dayjs from "dayjs";

export const differenceInDays = (date1: string, date2: string) => {
  return dayjs(date1).diff(dayjs(date2), "day");
};
