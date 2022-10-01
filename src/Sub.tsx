import { Button, Form } from 'antd'

const Sub = () => {
  const form = Form.useFormInstance()
  return (
    <Button
      onClick={() =>
        form.setFieldsValue({
          userName: '325235'
        })
      }
    >
      Add
    </Button>
  )
}

export default Sub
