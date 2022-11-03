import { Select } from 'antd'

export interface BaseSelectProps {
  options: Option[]
  value?: SelectValue
  onChange?: (value: SelectValue) => void
  placeholder?: string
}
const { Option } = Select
const BaseSelect = ({
  options,
  value,
  onChange,
  placeholder = '请选择'
}: BaseSelectProps) => {
  const list = options.map((item) => (
    <Option
      value={item.value}
      key={item.value}
    >
      {item.label}
    </Option>
  ))
  return (
    <Select
      showSearch
      value={value}
      placeholder={placeholder}
      optionFilterProp="children"
      filterOption={(input, option) =>
        (option?.children as unknown as string)
          .toLowerCase()
          .includes(input.toLowerCase())
      }
      allowClear
      className="base-select"
      onChange={onChange}
    >
      {list}
    </Select>
  )
}

export default BaseSelect
