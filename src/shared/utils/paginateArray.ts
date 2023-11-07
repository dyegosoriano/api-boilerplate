interface IParams {
  array: any[]

  page_size: number
  page: number
}

export const paginateArray = ({ array, page, page_size }: IParams) => {
  // page_size = parseInt(page_size)
  // page = Math.abs(parseInt(page))

  page_size = page_size < 1 ? 1 : page_size
  page = page > 0 ? page - 1 : page

  return array.filter((value, index) => index >= page * page_size && index < (page + 1) * page_size)
}
