export interface Article {
  id: number
  week?: number
  target?: string
  title: string
  content: string
  articleImage?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface ArticlesResponse {
  articles: Article[]
  pregnancyInfo: {
    status: string
    trimester?: number
    gestationalWeeks?: number
    gestationalDays?: number
    expectedDeliveryDate?: string
  }
}
