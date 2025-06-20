export const validation = {
  email: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  password: (password: string): boolean => {
    return password.length >= 6
  },

  phoneNumber: (phone: string): boolean => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
  },

  required: (value: string): boolean => {
    return value.trim().length > 0
  },

  date: (dateString: string): boolean => {
    const date = new Date(dateString)
    return !isNaN(date.getTime()) && dateString.match(/^\d{4}-\d{2}-\d{2}$/) !== null
  },

  number: (value: string): boolean => {
    return !isNaN(Number(value)) && Number(value) >= 0
  },

  pregnancyStatus: (status: string): boolean => {
    const validStatuses = [
      "Pregnant",
      "Delivered",
      "Aborted",
      "Stillbirth",
      "Infertile",
      "Preconception",
      "Menopausal",
      "Nulligravid",
    ]
    return validStatuses.includes(status)
  },
}
