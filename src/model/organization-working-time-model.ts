export interface OrganizationWorkingTimeResponse {
  organizationWorkingTimeStartISO?: string;
  organizationWorkingTimeNationalHolidays?: boolean;
  organizationWorkingTimeEndISO?: string;
  organizationWorkingTimeWeekdays: string[];
}
