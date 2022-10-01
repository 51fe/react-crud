import { DatePickerProps } from 'antd'

declare global {
  export type Moment = DatePickerProps['value']

  export type BaseValue = string | number

  export type SelectValue = BaseValue | BaseValue[]

  export interface IOption {
    label: string
    value: BaseValue
    children?: Array<{
      label: string
      value: BaseValue
    }>
  }

  export interface ITable<T> {
    list: T[]
    total: number
  }

  export interface IParams {
    _page: number
    _limit: number
    _sort: string
    _order: string
  }
}
