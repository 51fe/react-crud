import { Cascader } from 'antd'
import { DefaultOptionType } from 'antd/lib/cascader'
import { SingleValueType } from 'rc-cascader/lib/Cascader'
import areas from './area'

interface IAreaCascaderProps {
  value?: number
  onChange?: (value?: number, paths?: string[]) => void
  placeholder?: string
}

const AreaCascader = ({
  value,
  onChange,
  placeholder = '请选择'
}: IAreaCascaderProps) => {
  let _value: number[] = []
  if (value) {
    _value = [
      Math.floor(value / 10000) * 10000,
      Math.floor(value / 100) * 100,
      value
    ]
  }
  const filter = (inputValue: string, path: DefaultOptionType[]) =>
    path.some((option) =>
      (option.label as string).toLowerCase().includes(inputValue.toLowerCase())
    )
  const handleChange = (
    val: SingleValueType = [],
    selectOptions: DefaultOptionType[]
  ) => {
    const len = val.length
    if (len) {
      const last = val.length - 1
      const labels = selectOptions.map((item) => item.label) as string[]
      onChange?.(val[last] as number, [...new Set(labels)])
    } else {
      onChange?.(undefined, [])
    }
  }
  return (
    <Cascader
      value={_value}
      options={areas}
      placeholder={placeholder}
      showSearch={{ filter }}
      allowClear
      className="area-cascader"
      onChange={handleChange}
    />
  )
}

export default AreaCascader
