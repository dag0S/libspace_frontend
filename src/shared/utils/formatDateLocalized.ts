import dayjs from "dayjs";

export const formatDateLocalized = (date: string) => {
  return dayjs(date).format("DD.MM.YYYY HH:mm");
};
