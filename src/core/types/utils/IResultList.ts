export interface IResultList<T> {
  page_size: number
  page: number
  total_pages: number
  total: number
  results: T[]
}
