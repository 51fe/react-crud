import { DatePickerProps } from 'antd'

export { }
declare global {
  type Moment = DatePickerProps['value']
  type RawValue =  string | number

  interface Option {
    label: string
    value: RawValue
    children?: Omit<Option, 'children'>[];
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

  interface FormItemRule  {
    required?: boolean;
    message: string;
    pattern?: RegExp;
    min?: number;
    max?: number;
    trigger?: string | string[];
  }
}
