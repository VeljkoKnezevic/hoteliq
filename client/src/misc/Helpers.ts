import { CalendarSelected } from "@demark-pro/react-booking-calendar";

export function parseToken(token: string) {
  if (!token) return;

  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace("-", "+").replace("_", "/");
  return JSON.parse(window.atob(base64));
}

export const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  updateFunction: any
): void => {
  const { name, value } = e.target;

  updateFunction((prev: any) => ({ ...prev, [name]: value }));
};

export const translateRoomType = (id: number) => {
  if (id === 1) {
    return "Single";
  } else if (id === 2) {
    return "Double";
  } else {
    return "Triple";
  }
};

export const dateConverter = (
  startDate: CalendarSelected,
  endDate: CalendarSelected
) => {
  return {
    convertedStartDate: Number(startDate?.valueOf()) + 1,
    convertedEndDate: Number(endDate?.valueOf()) - 1,
  };
};
