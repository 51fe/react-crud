import { fireEvent, screen, render } from '../../test-util'
import userEvent from '@testing-library/user-event'
import AreaCascader from './index'

test('renders correctly by default', () => {
  render(<AreaCascader />)
  screen.getByText('请选择')
})

test('changes props correctly', () => {
  const placeholder = '请选择区域'
  const { rerender } = render(<AreaCascader placeholder={placeholder} />)
  // changes placeholder
  screen.getByText(placeholder)
  // changes value
  const value = 110105
  rerender(<AreaCascader value={value} />)
  expect(screen.getByTitle(/北京市 \/ 北京市 \/ 朝阳区/))
})

test('calls "onChange"', async () => {
  const handleChange = jest.fn()
  render(<AreaCascader onChange={handleChange} />)
  const areas = ['广东省', '深圳市', '南山区']
  // actives the dropdown menu by clicking the input
  await userEvent.click(screen.getByRole('combobox'))
  // emits the event by clicking the area
  fireEvent.click(screen.getByText(areas[0]))
  fireEvent.click(screen.getByText(areas[1]))
  fireEvent.click(screen.getByText(areas[2]))
  expect(handleChange.mock.calls[0][0]).toBe(440305)
})
