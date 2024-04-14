import './index.scss'
import { useEffect } from 'react'
import { Button, Form, Space } from 'antd'
import AreaCascader from '../AreaCascader'
import BaseInput from '../BaseInput'
import BaseDatePicker from '../BaseDatePicker'
import { type Receipt } from '../../type/receipt'
import { rules } from '../../utils/rules'

interface SaveFormProps {
  initialValues?: Receipt
  loading?: boolean
  onSubmit?: (values: Receipt) => void
  onCancle?: () => void
}
const SaveForm = ({
  initialValues,
  loading,
  onSubmit,
  onCancle
}: SaveFormProps) => {
  const [form] = Form.useForm()
  let areaName = initialValues?.areaName
  const onFinish = (values: Receipt) => {
    values.id = initialValues?.id
    values.areaName = areaName
    onSubmit?.(values)
  }

  useEffect(() => {
    if(initialValues?.id) { // edit
      form.setFieldsValue(initialValues)
    } else {
      form.resetFields()
    }
  }, [initialValues])

  const handleAreaChange = (value?: number, paths?: string[]) => {
    form.setFieldValue('area', value)
    areaName = paths?.join('')
  }

  const handleCancel = () => {
    form.resetFields()
    onCancle?.()
  }
  
  return (
    <Form
      form={form}
      colon={false}
      labelCol={{ span: 4 }}
      initialValues={initialValues}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="日期"
        name="date"
        rules={ rules.date }
      >
        <BaseDatePicker id="date" />
      </Form.Item>

      <Form.Item
        label="姓名"
        name="userName"
        rules={ rules.userName }
      >
        <BaseInput id="userName" />
      </Form.Item>
      <Form.Item
        label="市区"
        name="area"
        rules={ rules.area }
      >
        <AreaCascader id="area" onChange={handleAreaChange} />
      </Form.Item>
      <Form.Item
        label="地址"
        name="address"
        rules={ rules.address }
      >
        <BaseInput id="address" />
      </Form.Item>
      <Form.Item
        label="手机号"
        name="mobile"
        rules={ rules.mobile }
      >
        <BaseInput id="mobile"/>
      </Form.Item>
      <Form.Item className="footer-item">
        <Space>
          <Button
            htmlType="button"
            onClick={handleCancel}
          >
            取 消
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            确 定
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default SaveForm
