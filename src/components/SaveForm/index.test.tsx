import { fireEvent, screen, render, waitFor } from '../../test-util'
import userEvent from '@testing-library/user-event'
import SaveForm from './index'
import formRule from './form-rule'
import { FieldName } from 'type/receipt'

const initForm = {
  date: '2022-08-15 00:00:00',
  userName: '李四',
  area: 440305,
  areaName: '广东省深圳市南山区',
  address: '望海路33号',
  mobile: '15866666666'
}

const newForm = {
  date: '2022-08-16 00:00:00',
  userName: '王五',
  area: 440111,
  areaName: '广东省广州市白云区',
  address: '白云路100号',
  mobile: '15166666666'
}

test('fills and changes form fields correctly',  async () => {
  const handleSubmit = jest.fn()
  const {
    getByRole,
    getByTitle,
    getByText,
    getByDisplayValue,
  } = render(<SaveForm initialValues={ initForm } onSubmit={handleSubmit} />)
  const userNameInput = getByDisplayValue(initForm.userName)
  fireEvent.change(userNameInput, { target: { value: newForm.userName } })

  const addressInput = getByDisplayValue(initForm.address)
  fireEvent.change(addressInput, { target: { value: newForm.address } })

  const mobileInput = getByDisplayValue(initForm.mobile)
  fireEvent.change(mobileInput, { target: { value: newForm.mobile } } )

  const date = initForm.date.substring(0, 10)
  await userEvent.click(getByDisplayValue(date))
  const newDate = newForm.date.substring(0, 10)
  const cell = screen.getByTitle(newDate)
  fireEvent.click(cell)

  const areaCascader = getByTitle('广东省 / 深圳市 / 南山区')
  // actives the dropdown menu by clicking the input
  await userEvent.click(areaCascader)
  // emits the event by clicking the area
  fireEvent.click(getByText(/广州市/))
  fireEvent.click(getByText(/白云区/))
  // Assert the right event has been emitted.
  fireEvent.click(getByRole('button', { name: /确 定/}))
  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledWith(newForm)
  })
})

test('clear form fields before add',  async () => {
  const { getByRole, getAllByRole, queryByText } = 
    render(<SaveForm initialValues={{}} opened={true} />)
  const inputs = getAllByRole('textbox')
  inputs?.forEach?.(input => {
    expect(input).toHaveValue('')
  })

  const areaCascader = getByRole('combobox')
  expect(areaCascader).toHaveValue('')

  for (const key in formRule) {
    const rules = formRule[key as keyof FieldName]
    rules?.forEach?.(item => {
      const errorMeg = queryByText(item.message as string)
      expect(errorMeg).toBeNull()
    })
  }
})

describe('validation', ()=> {
  const toSubmit = async(errMsg: string) =>  {
    // invalid
    fireEvent.click(screen.getByRole('button', { name: '确 定'}))
    expect(await screen.findByText(errMsg)).toBeVisible()
  }

  const checkInputValidation = async (name: string, value: string, errMsg: string) => {
    // invalid
    await toSubmit(errMsg)
    // valid
    const input = screen.getByLabelText(name)
    fireEvent.change(input, { target: { value } })
    await waitFor(() => {
      expect(screen.queryByText(errMsg)).toBeNull()
    })
  }
  test('validates inputs', async () => {
    render(<SaveForm initialValues={{}} />)
    await checkInputValidation('姓名',  newForm.userName, 
      formRule?.userName?.[0].message)
    await checkInputValidation('地址', newForm.address, 
      formRule?.address?.[0].message)
    await checkInputValidation('手机号', newForm.mobile, 
      formRule?.mobile?.[0].message)
  })

  test('validates phone format', async () => {
    const { queryByText, findByText, getByLabelText } = render(<SaveForm initialValues={ {} } />)
    // invalid
    const input = getByLabelText('手机号')
    const errMsg = formRule?.mobile?.[1].message
    fireEvent.change(input, { target: { value: 'abc' } })
    expect(await findByText(errMsg)).toBeVisible()
    // valid
    fireEvent.change(input, { target: { value: newForm.mobile } })
    await waitFor(() => {
      expect(queryByText(errMsg)).toBeNull()
    })
  })

  test('validates date', async () => {
    const { getByLabelText, queryByText } = render(<SaveForm initialValues={{}} />)
    const errMsg = formRule?.date?.[0].message
    // invalid
    await toSubmit(errMsg)
    // valid
    const input = getByLabelText('日期')
    await userEvent.click(input)
    fireEvent.click(screen.getByTitle(/15/))
    await waitFor(() => {
      expect(queryByText(errMsg)).toBeNull()
    })
  })

  test('validates area', async () => {
    const { getByLabelText, getByText, queryByText } = 
    render(<SaveForm initialValues={{}} />)
    const errMsg = formRule?.area?.[0].message
    // invalid
    await toSubmit(errMsg)
    // valid
    const input = getByLabelText('市区')
    await userEvent.click(input)
    fireEvent.click(getByText('广东省'))
    fireEvent.click(getByText( '深圳市'))
    fireEvent.click(getByText('南山区'))
    await waitFor(() => {
      expect(queryByText(errMsg)).toBeNull()
    })
  })
})
