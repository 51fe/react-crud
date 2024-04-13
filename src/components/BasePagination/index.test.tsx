import { fireEvent, screen, render } from '../../test-util'
import userEvent from '@testing-library/user-event'
import BasePagination from './index'

test('renders correctly by default', () => {
  const total = 32
  const { container } = render(<BasePagination total={total} />)
  screen.getByText(`共 ${total} 条`)
  expect(container.innerHTML).toMatchSnapshot()
})

test('calls pagination when click the pager number', () => {
  const onPagination = jest.fn()
  const page = 2
  render(<BasePagination total={32} pagination={onPagination} />)
  const numberBtn = screen.getByTitle(page)
  // click page 2 button
  fireEvent.click(numberBtn)
  expect(onPagination).toHaveBeenCalledWith(page, 15)
})

test('calls pagination when click the page size item', async() => {
  const user = userEvent.setup()
  const onPagination = jest.fn()
  const limit = 30
  render(<BasePagination total={32} showSizeChanger pagination={onPagination} />)
  const select = screen.getByRole('combobox', { name: /页码/})
  user.click(select)
  const item = await screen.findByTitle(`${limit} 条/页`)
  // click the second item
  fireEvent.click(item)
  expect(onPagination).toHaveBeenCalledWith(1, limit)
})