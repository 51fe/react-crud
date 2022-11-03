import './index.scss'
import { useEffect } from 'react'
import { Button, Form, Space } from 'antd'
import AreaCascader from '../AreaCascader'
import BaseInput from '../BaseInput'
import BaseDatePicker from '../BaseDatePicker'
import { Receipt } from '../../type/receipt'
import { formRule } from './form-rule'

interface SaveFormProps {
  initialValues: Receipt
  loading?: boolean
  opened?: boolean
  onSubmit?: (values: Receipt) => void
  onCancle?: () => void
}
const SaveForm = ({
  initialValues,
  opened,
  loading,
  onSubmit,
  onCancle
}: SaveFormProps) => {
  const [form] = Form.useForm()
  let areaName = initialValues.areaName
  const onFinish = (values: Receipt) => {
    values.id = initialValues.id
    values.areaName = areaName
    onSubmit?.(values)
  }

  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [initialValues.id])

  useEffect(() => {
    if (opened) {
      // clear validation
      form.resetFields()
    }
  }, [form, opened])

  const handleAreaChange = (value?: number, paths?: string[]) => {
    form.setFieldValue('area', value)
    areaName = paths?.join('')
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
        rules={ formRule.date }
      >
        <BaseDatePicker id="date" />
      </Form.Item>

      <Form.Item
        label="姓名"
        name="userName"
        rules={ formRule.userName }
      >
        <BaseInput id="userName" />
      </Form.Item>
      <Form.Item
        label="市区"
        name="area"
        rules={ formRule.area }
      >
        <AreaCascader id="area" onChange={handleAreaChange} />
      </Form.Item>
      <Form.Item
        label="地址"
        name="address"
        rules={ formRule.address }
      >
        <BaseInput id="address" />
      </Form.Item>
      <Form.Item
        label="手机号"
        name="mobile"
        rules={ formRule.mobile }
      >
        <BaseInput id="mobile"/>
      </Form.Item>
      <Form.Item className="footer-item">
        <Space>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            确 定
          </Button>
          <Button
            htmlType="button"
            onClick={onCancle}
          >
            取 消
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default SaveForm
