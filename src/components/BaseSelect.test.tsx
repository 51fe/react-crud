import { fireEvent, screen, render } from '../test-util'
import userEvent from '@testing-library/user-event'
import BaseSelect, { BaseSelectProps } from './BaseSelect'

const options = [{
  value: 1,
  label: '移动'
}, {
  value: 2,
  label: '联通'
}, {
  value: 3,
  label: '电信'
}]

const setUp = (overrides?: Omit<BaseSelectProps, 'options'>) => {
  return render(<BaseSelect options={options} {...overrides} />)
}

test('renders correctly by default', async () => {
  const { container } = setUp()
  screen.getByText(/请选择/)
  const select = screen.getByRole('combobox')
  expect(select).toHaveValue('')
  expect(container.innerHTML).toMatchSnapshot()
})

test('changes props correctly', async () => {
  const placeholder = '请选择营运商'
  const { rerender } = setUp({ placeholder })
  // changes placeholder
  await screen.findByText(placeholder)
  // changes value
  const value = 3
  rerender(<BaseSelect options={options} value={value} />)
  const re = new RegExp(/电信/)
  expect(screen.getByTitle(re)).toHaveTextContent(re)
})

test('calls "onChange"', async () => {
  const handleChange = jest.fn()
  setUp({
    onChange: handleChange
  })
  const select = screen.getByRole('combobox')
  await userEvent.click(select)
  fireEvent.click(screen.getByTitle(/电信/))
  expect(handleChange).toHaveBeenCalledWith( 3, { children: '电信', key: '3', value: 3 })
})
