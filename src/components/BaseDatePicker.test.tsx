import { screen, render, fireEvent } from '../test-util'
import userEvent from '@testing-library/user-event'
import BaseDatePicker from './BaseDatePicker'

test('renders correctly by default', () => {
  const { container } = render(<BaseDatePicker />)
  screen.getByPlaceholderText('请选择')
  expect(container.innerHTML).toMatchSnapshot()
})

test('changes props correctly', () => {
  const value = '2022-08-15'
  const placeholder = '开始日期'
  render(<BaseDatePicker value={value} placeholder={placeholder} />)
  screen.getByPlaceholderText(placeholder)
  screen.getByDisplayValue(value)
})

test('calls "onChange"', async () => {
  const handleChange = jest.fn()
  render(<BaseDatePicker value="2022-08-02" onChange={handleChange}/>)
  const value = '2022-08-15'
  const input = screen.getByRole('textbox')
  await userEvent.click(input)
  fireEvent.click(screen.getByTitle(value))
  expect(handleChange).toHaveBeenCalledWith(value + ' 00:00:00')
})

