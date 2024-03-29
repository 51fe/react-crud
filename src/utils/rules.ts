interface Rules {
  [key: string]: FormItemRule[];
}

export const rules: Rules = {
  date: [{ required: true, message: '日期不能为空' }],
  userName: [{ required: true, message: '姓名不能为空' }],
  area: [{ required: true, message: '市区不能为空' }],
  address: [{ required: true, message: '地址不能为空' }],
  mobile: [
    { required: true, message: '手机号不能为空' },
    { message: '请输入正确的手机号', pattern: /^[1][345789][0-9]{9}$/ }
  ]
}

export default rules