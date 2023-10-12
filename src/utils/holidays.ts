import Holidays from "date-holidays";
import { CURRENT_COUNTRY } from "../constants";

interface Holiday {
  date: string;
  name: string;
}

interface HolidaysData {
  holidays: string[];
  holidayNames: string;
}

function getHolidays(): HolidaysData {
  const holidaysList: Holiday[] = new Holidays(CURRENT_COUNTRY)
    .getHolidays()
    .map((obj: any) => {
      const formattedDate: string = obj.date.split(" ")[0];
      return {
        date: formattedDate,
        name: obj.name,
      };
    });

  const holidays: string[] = holidaysList.map((obj: Holiday) => obj.date);
  const holidayNames: string = holidaysList
    .map((obj: Holiday) => `${obj.date}-${obj.name}`)
    .join(",");

  return {
    holidays,
    holidayNames,
  };
}

export default getHolidays;
