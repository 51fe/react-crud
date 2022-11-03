export interface Receipt {
  id?: number
  date?: string
  userName?: string
  area?: number
  areaName?: string
  address?: string
  mobile?: string
}

export type FieldName = Omit<Receipt, 'id' | 'areaName'>

export interface ReceiptQuery {
  userName_like?: BaseValue
  mobile_like?: BaseValue
  date_gte?: BaseValue
  date_lte?: BaseValue
  areaName_like?: BaseValue
  area_like?: BaseValue
  area?: BaseValue
}
