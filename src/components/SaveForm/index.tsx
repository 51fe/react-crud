import './index.scss'
import { Button, Form, Space } from 'antd'
import AreaCascader from '../AreaCascader'
import BaseInput from '../BaseInput'
import BaseDatePicker from '../BaseDatePicker'
import { IForm } from '../../type/receipt'
import { useEffect } from 'react'
import { mobileValidator } from '../../utils/validate'

interface ISaveFormProps {
  initialValues: IForm
  loading: boolean
  opened: boolean
  onSubmit: (values: IForm) => void
  onCancle?: () => void
}
const SaveForm = ({
  initialValues,
  opened,
  loading,
  onSubmit,
  onCancle
}: ISaveFormProps) => {
  const [form] = Form.useForm()
  let areaName = initialValues.areaName
  const onFinish = (values: IForm) => {
    values.id = initialValues.id
    values.areaName = areaName
    onSubmit(values)
  }

  useEffect(() => {
    form.setFieldsValue(initialValues)
  }, [form, initialValues.id])

  useEffect(() => {
    if (opened) {
      // clear validation
      form.resetFields()
    }
  }, [opened])

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
        rules={[{ required: true, message: '日期不能为空' }]}
      >
        <BaseDatePicker />
      </Form.Item>

      <Form.Item
        label="姓名"
        name="userName"
        rules={[{ required: true, message: '姓名不能为空' }]}
      >
        <BaseInput />
      </Form.Item>
      <Form.Item
        label="市区"
        name="area"
        rules={[{ required: true, message: '市区不能为空' }]}
      >
        <AreaCascader onChange={handleAreaChange} />
      </Form.Item>
      <Form.Item
        label="地址"
        name="address"
        rules={[{ required: true, message: '地址不能为空' }]}
      >
        <BaseInput />
      </Form.Item>
      <Form.Item
        label="手机号"
        name="mobile"
        rules={[
          {
            required: true,
            message: '手机号不能为空'
          },
          { validator: mobileValidator }
        ]}
      >
        <BaseInput />
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
