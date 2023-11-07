export interface IResultList<T> {
  results: T[]
  total_pages: number
  total: number
  page_size: number
  page: number
}
