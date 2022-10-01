import { Form, Input } from 'antd'
import Sub from './Sub'

const Demo = () => {
  const [form] = Form.useForm()

  return (
    <Form form={form}>
      <Form.Item
        label="姓名"
        name="userName"
        rules={[{ required: true, message: '姓名不能为空' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Sub />
      </Form.Item>
    </Form>
  )
}

export default Demo
