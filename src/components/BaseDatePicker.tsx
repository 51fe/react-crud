import moment from 'moment'
import { DatePicker } from 'antd'

interface BaseDatePickerProps {
  id?: string
  value?: string
  onChange?: (dataString: string) => void
  placeholder?: string
}

const BaseDatePicker = ({
  id,
  value,
  onChange,
  placeholder = '请选择'
}: BaseDatePickerProps) => {
  const handleChange = (value: Moment) => {
    onChange?.(value?.format('YYYY-MM-DD 00:00:00') as string)
  }
  return (
    <DatePicker
      id={id}
      value={value ? moment(value) : undefined}
      placeholder={placeholder}
      allowClear
      className="base-date-picker"
      onChange={handleChange}
    />
  )
}

export default BaseDatePicker
