import { Input } from 'antd'
interface IBaseInputProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

const BaseInput = ({
  value,
  onChange,
  placeholder = '请输入'
}: IBaseInputProps) => {
  return (
    <Input
      value={value}
      placeholder={placeholder}
      maxLength={200}
      allowClear
      className="base-input"
      onChange={(e) => onChange?.(e.target.value)}
    />
  )
}

export default BaseInput
