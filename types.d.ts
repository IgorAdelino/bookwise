export interface Book {
  id: number,
  title: string,
  author: string,
  genre: string, 
  rating: number,
  totalCopies: number,
  availableCopies: number,
  description: string,
  color: string,
  coverImage: string
  video?: string
  summary: string
  isLoanedBook?: boolean
}
