export interface PregnancyForm {
  dateOfBirth: string
  pregnancyStatus: PregnancyStatus
  lastDateOfMenstruation?: string
  gravida?: number
  term?: number
  preterm?: number
  abortion?: number
  living?: number
}

export type PregnancyStatus =
  | "Pregnant"
  | "Delivered"
  | "Aborted"
  | "Stillbirth"
  | "Infertile"
  | "Preconception"
  | "Menopausal"
  | "Nulligravid"

export interface PregnancyData {
  id: number
  dateOfBirth: string
  pregnancyStatus: PregnancyStatus
  lastDateOfMenstruation?: string
  gravida?: number
  term?: number
  preterm?: number
  abortion?: number
  living?: number
  expectedDeliveryDate?: string
  currentTrimester?: number
  gestationalWeeks?: number
  gestationalDays?: number
  createdAt: string
  updatedAt: string
  aiInsight?: string
}
