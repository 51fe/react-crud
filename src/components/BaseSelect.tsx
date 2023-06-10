import { Select } from 'antd'
import { DefaultOptionType, SelectValue } from 'antd/lib/select'

export interface BaseSelectProps {
  options: DefaultOptionType[]
  value?: SelectValue
  mode?: 'multiple' | 'tags'
  onChange?: (value: SelectValue) => void
  placeholder?: string
}

const { Option } = Select

const BaseSelect = ({
  options,
  value,
  mode,
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
      mode={mode}
      placeholder={placeholder}
      optionFilterProp="children"
      filterOption={(input, option) =>
        (String(option?.label))
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
