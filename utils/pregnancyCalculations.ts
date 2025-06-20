export const pregnancyCalculations = {
  calculateEDD: (lmpDate: Date): Date => {
    const edd = new Date(lmpDate)
    edd.setDate(edd.getDate() + 7)
    edd.setMonth(edd.getMonth() + 9)

    if (edd.getMonth() > 11) {
      edd.setFullYear(edd.getFullYear() + 1)
      edd.setMonth(edd.getMonth() - 12)
    }

    return edd
  },

  calculateGestationalAge: (lmpDate: Date): { weeks: number; days: number; totalDays: number } => {
    const today = new Date()
    const timeDiff = today.getTime() - lmpDate.getTime()
    const totalDays = Math.floor(timeDiff / (1000 * 3600 * 24))

    const weeks = Math.floor(totalDays / 7)
    const days = totalDays % 7

    return { weeks, days, totalDays }
  },

  determineTrimester: (gestationalWeeks: number): number => {
    if (gestationalWeeks <= 12) return 1
    if (gestationalWeeks <= 28) return 2
    return 3
  },

  calculatePregnancyDetails: (lmpDate: Date) => {
    const expectedDeliveryDate = pregnancyCalculations.calculateEDD(lmpDate)
    const gestationalAge = pregnancyCalculations.calculateGestationalAge(lmpDate)
    const trimester = pregnancyCalculations.determineTrimester(gestationalAge.weeks)

    return {
      expectedDeliveryDate,
      gestationalAge,
      trimester,
    }
  },

  getPregnancyWeekInfo: (weeks: number) => {
    const weekInfo = {
      1: { size: "poppy seed", length: "0.1 inches" },
      4: { size: "poppy seed", length: "0.04 inches" },
      8: { size: "raspberry", length: "0.63 inches" },
      12: { size: "lime", length: "2.13 inches" },
      16: { size: "avocado", length: "4.57 inches" },
      20: { size: "banana", length: "6.46 inches" },
      24: { size: "ear of corn", length: "11.81 inches" },
      28: { size: "eggplant", length: "14.80 inches" },
      32: { size: "jicama", length: "16.69 inches" },
      36: { size: "romaine lettuce", length: "18.66 inches" },
      40: { size: "pumpkin", length: "20.16 inches" },
    }

    // Find the closest week
    const availableWeeks = Object.keys(weekInfo)
      .map(Number)
      .sort((a, b) => a - b)
    const closestWeek = availableWeeks.reduce((prev, curr) =>
      Math.abs(curr - weeks) < Math.abs(prev - weeks) ? curr : prev,
    )

    return weekInfo[closestWeek as keyof typeof weekInfo] || weekInfo[40]
  },
}
