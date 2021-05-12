interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  tomorrow(): Date;
  compareInDays(start_date: Date, end_date: Date): number;
}

export { IDateProvider };
