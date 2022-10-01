import moment from 'moment'
import { DatePicker } from 'antd'

interface IBaseDatePickerProps {
  value?: string
  onChange?: (dataString: string) => void
  placeholder?: string
}

const BaseDatePicker = ({
  value,
  onChange,
  placeholder = '请输入'
}: IBaseDatePickerProps) => {
  const handleChange = (value: Moment) => {
    onChange?.(value?.format('YYYY-MM-DD HH:mm:ss') as string)
  }
  return (
    <DatePicker
      value={value ? moment(value) : undefined}
      placeholder={placeholder}
      allowClear
      className="base-date-picker"
      onChange={handleChange}
    />
  )
}

export default BaseDatePicker
