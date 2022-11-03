import { Input } from 'antd'

interface BaseInputProps {
  id?: string
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
}

const BaseInput = ({
  id,
  value,
  onChange,
  placeholder = '请输入'
}: BaseInputProps) => {
  return (
    <Input
      id={id}
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
