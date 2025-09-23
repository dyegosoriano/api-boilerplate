import type { IDateProvider } from '../models/IDateProvider'

export class NodeDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const start_time = start_date.getTime()
    const end_time = end_date.getTime()
    const diff_in_ms = end_time - start_time
    const diff_in_hours = diff_in_ms / (1000 * 60 * 60)

    return Math.floor(diff_in_hours)
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const start_time = start_date.getTime()
    const end_time = end_date.getTime()
    const diff_in_ms = end_time - start_time
    const diff_in_days = diff_in_ms / (1000 * 60 * 60 * 24)

    return Math.floor(diff_in_days)
  }

  convertToUTC(date: Date): string {
    return date.toISOString()
  }

  dateNow(): Date {
    return new Date()
  }

  addDays(days: number): Date {
    const result = new Date()
    result.setDate(result.getDate() + days)
    return result
  }

  addHours(hours: number): Date {
    const result = new Date()
    result.setHours(result.getHours() + hours)
    return result
  }

  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return start_date.getTime() < end_date.getTime()
  }

  compareIfAfter(start_date: Date, end_date: Date): boolean {
    return start_date.getTime() > end_date.getTime()
  }
}
