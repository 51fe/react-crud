export interface IForm {
  id?: number
  date?: string
  userName?: string
  area?: number
  areaName?: string
  address?: string
  mobile?: number
}

export interface IQuery {
  userName_like?: string
  mobile_like?: string
  date_gte?: string
  date_lte?: string
  areaName_like?: string
  area_like?: number
  area?: number
}
