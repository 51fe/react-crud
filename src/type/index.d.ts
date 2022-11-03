import { DatePickerProps } from 'antd'

export { }
declare global {
  type Moment = DatePickerProps['value']

  type BaseValue = string | number

  type SelectValue = BaseValue | BaseValue[]

  interface Option {
    label: string
    value: BaseValue
    children?: Array<{
      label: string
      value: BaseValue
    }>
  }

  interface PageTable<T> {
    list: T[]
    total: number
  }

  interface Params {
    _page: number
    _limit: number
    _sort: string
    _order: string
  }

  type FormRule<T> = {
    [key in keyof T]: AggregationRule[]
  }
}
