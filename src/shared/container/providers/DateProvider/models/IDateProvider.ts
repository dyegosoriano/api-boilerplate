export interface IDateProvider {
  compareIfBefore(start_date: Date, end_date: Date): boolean
  compareIfAfter(start_date: Date, end_date: Date): boolean
  compareInHours(start_date: Date, end_date: Date): number
  compareInDays(start_date: Date, end_date: Date): number
  convertToUTC(date: Date): string
  addHours(hours: number): Date
  addDays(days: number): Date
  dateNow(): Date
}
