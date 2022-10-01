import { RuleObject } from 'antd/lib/form'

/**
 * phone niumber validator
 * @param rule
 * @param value
 */
export function mobileValidator(rule: RuleObject, value: string) {
  const reg = /^[1][345789][0-9]{9}$/
  if (value) {
    if (!reg.test(value.toString())) {
      return Promise.reject('请输入正确的手机号')
    } else {
      return Promise.resolve()
    }
  } else {
    return Promise.resolve()
  }
}

export default {
  mobileValidator
}
