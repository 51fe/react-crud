import { fireEvent, screen, render, waitForElementToBeRemoved } from '../../test-util'
import userEvent from '@testing-library/user-event'
import rules from '../../utils/rules'
import SaveForm from './index'

const { date, userName, area, address, mobile } = rules

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

const setUp = () => {
  return {
    ...render(<SaveForm initialValues={ {} } />),
    confirmBtn: screen.getByRole('button', { name: '确 定'})
  }
}

test('fills and changes form fields correctly',  async () => {
  const handleSubmit = jest.fn()
  const {
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
  const cell = getByTitle(newDate)
  fireEvent.click(cell)
 
  const areaCascader = getByTitle('广东省 / 深圳市 / 南山区')
  // actives the dropdown menu by clicking the input
  await userEvent.click(areaCascader)
  // emits the event by clicking the area
  fireEvent.click(getByText(/广州市/))
  fireEvent.click(getByText(/白云区/))
  // Assert the right event has been emitted.
  await userEvent.click(screen.getByRole('button', { name: '确 定'}))
  expect(handleSubmit).toHaveBeenCalledWith(newForm)
})

test('clear form fields before add',  async () => {
  const { getByRole } = setUp()
  const inputs = screen.getAllByRole('textbox')
  inputs?.forEach?.(input => {
    expect(input).toHaveValue('')
  })

  const areaCascader = getByRole('combobox')
  expect(areaCascader).toHaveValue('')

  for (const key in rules) {
    rules[key].forEach(item => {
      const errorMeg = screen.queryByText(item.message as string)
      expect(errorMeg).not.toBeInTheDocument()
    })
  }
})

describe('validation', ()=> {
  test('validates useName', async () => {
    const { confirmBtn } = setUp()
    const input = screen.getByLabelText('姓名')
    const errMsg = userName[0].message
    // required
    fireEvent.click(confirmBtn)
    expect(await screen.findByText(errMsg)).toBeInTheDocument()
    // valid
    fireEvent.change(input, { target: { value: newForm.mobile } })
    waitForElementToBeRemoved(() => screen.queryByText(errMsg))
  })

  test('validates address', async () => {
    const { confirmBtn } = setUp()
    const input = screen.getByLabelText('地址')
    const errMsg = address[0].message
    // required
    fireEvent.click(confirmBtn)
    expect(await screen.findByText(errMsg)).toBeInTheDocument()
    // valid
    fireEvent.change(input, { target: { value: newForm.address } })
    waitForElementToBeRemoved(() => screen.queryByText(errMsg))
  })

  test('validates phone', async () => {
    const { confirmBtn, findByText } = setUp()
    const input = screen.getByLabelText('手机号')
    let errMsg = mobile[0].message
    // required
    fireEvent.click(confirmBtn)
    expect(await findByText(errMsg)).toBeInTheDocument()
    // format
    errMsg = mobile[1].message
    fireEvent.change(input, { target: { value: '12345678' } })
    expect(await screen.findByText(errMsg)).toBeInTheDocument()
    // valid
    fireEvent.change(input, { target: { value: newForm.mobile } })
    waitForElementToBeRemoved(() => screen.queryByText(errMsg))
  })

  test('validates date', async () => {
    const { confirmBtn } = setUp()
    const errMsg = date[0].message
    // required
    fireEvent.click(confirmBtn)
    expect(await screen.findByText(errMsg)).toBeInTheDocument()
    // valid
    const input = screen.getByLabelText('日期')
    await userEvent.click(input)
    fireEvent.click(screen.getByTitle(/15/))
    waitForElementToBeRemoved(() => screen.queryByText(errMsg))
  })

  test('validates area', async () => {
    const { confirmBtn, getByText } = setUp()
    const errMsg = area[0].message
    // required
    fireEvent.click(confirmBtn)
    expect(await screen.findByText(errMsg)).toBeInTheDocument()
    // valid
    const input = screen.getByLabelText('市区')
    await userEvent.click(input)
    fireEvent.click(getByText('广东省'))
    fireEvent.click(getByText( '深圳市'))
    fireEvent.click(getByText('南山区'))
    waitForElementToBeRemoved(() => screen.queryByText(errMsg))
  })
})
