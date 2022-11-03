import { fireEvent, screen, render } from '../test-util'
import BaseInput from './BaseInput'

test('renders correctly by default', () => {
  const { container } = render(<BaseInput />)
  screen.getByPlaceholderText('请输入')
  expect(container.innerHTML).toMatchSnapshot()
})

test('changes props correctly', () => {
  const value = 'hello'
  const placeholder = '请输入姓名'
  render(<BaseInput value={value} placeholder={placeholder} />)
  screen.getByPlaceholderText(placeholder)
  screen.getByDisplayValue(value)
})

test('calls "onChange"', () => {
  const handleChange = jest.fn()
  render(<BaseInput onChange={handleChange}/>)
  const value = 'world'
  const input: HTMLInputElement = screen.getByRole('textbox')
  fireEvent.change(input,  { target: { value } })
  expect(handleChange).toHaveBeenCalledWith(value)
})