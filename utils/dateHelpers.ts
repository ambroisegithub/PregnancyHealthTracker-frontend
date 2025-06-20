export const dateHelpers = {
  formatDate: (date: Date | string): string => {
    const d = new Date(date)
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  },

  formatDateShort: (date: Date | string): string => {
    const d = new Date(date)
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  },

  formatDateInput: (date: Date): string => {
    return date.toISOString().split("T")[0]
  },

  parseDate: (dateString: string): Date => {
    return new Date(dateString)
  },

  isValidDate: (date: Date): boolean => {
    return !isNaN(date.getTime())
  },

  daysBetween: (date1: Date, date2: Date): number => {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    return Math.ceil(timeDiff / (1000 * 3600 * 24))
  },

  addDays: (date: Date, days: number): Date => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  },

  getWeeksAndDays: (totalDays: number): { weeks: number; days: number } => {
    const weeks = Math.floor(totalDays / 7)
    const days = totalDays % 7
    return { weeks, days }
  },
}
