import { Select } from 'antd'

interface IBaseSelectProps {
  options: IOption[]
  value?: SelectValue
  onChange?: (value: SelectValue) => void
  mode?: 'multiple' | 'tags'
  placeholder?: string
}
const { Option } = Select
const BaseSelect = ({
  options,
  value,
  onChange,
  mode,
  placeholder = '请选择'
}: IBaseSelectProps) => {
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
      mode={mode}
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
