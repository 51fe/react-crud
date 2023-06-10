
import { fireEvent, screen, render, within } from './test-util'
import userEvent from '@testing-library/user-event'
import { Receipt } from './type/receipt'
import receiptApi from './api/receipt'
import App from './App'

jest.mock('./api/receipt')
const { getReceiptList, editReceipt, delReceipt } = receiptApi as jest.Mocked<typeof receiptApi>

const receipts: Receipt[] = [{
  date: '2021-08-02 00:00:00',
  userName: '孙六',
  address: '金沙江路1518弄',
  id: 1,
  area: 310107,
  areaName: '上海市黄浦区',
  mobile: '15888888888'
}, {
  date: '2022-08-03 00:00:00',
  userName: '张三',
  address: '王府井大街56号',
  id: 2,
  area: 110105,
  areaName: '北京市朝阳区',
  mobile: '15188888888'
}, {
  date: '2022-08-03 00:00:00',
  userName: '李四',
  address: '望海路33号',
  id: 3,
  area: 440305,
  areaName: '广东省深圳市南山区',
  mobile: '15866666666Once'
}]

const defaultValue = {
  list: receipts,
  total: 3
}

async function filterData(value: PageTable<Receipt>) {
  getReceiptList.mockResolvedValue(value)
  const { getByTitle } = render(<App />)
  // search call
  fireEvent.click(getByTitle(/搜索/))
  expect(getReceiptList).toHaveBeenCalledTimes(1)
}

beforeEach(() => {
  jest.resetModules()
  jest.clearAllMocks()
})

test('returns all rows by default', async () => {
  filterData(defaultValue)
  const rows = await screen.findAllByRole('button', { name: /删除/ })
  expect(rows).toHaveLength(receipts.length)
})

test('returns 1 row when set mobile to 151', async () => {
  const keyword = '151'
  const filtered: Receipt[] = receipts.filter(item => new RegExp(keyword, 'i').test(item.mobile as string))
  filterData({
    list: filtered,
    total: filtered.length
  })
  expect(await screen.findByText(/15188888888/)).toBeInTheDocument()
})

test('returns No data if name does not match', async () => {
  filterData({ list: [], total: 0 })
  // sure loaded
  await screen.findByText('', {selector: '.ant-spin-dot'})
  expect(await screen.findByRole('cell', { name: /暂无数据/ })).toBeVisible()
})

test('calls delReceipt to delete', async () => {
  // define mocks
  getReceiptList.mockResolvedValue(defaultValue)
  delReceipt.mockResolvedValue({})
  const { findByRole } = render(<App />)
  // init call
  expect(getReceiptList).toHaveBeenCalledTimes(1)
  const row = await findByRole('row', { name: /李四/ })
  const btn = within(row).getByRole('button', { name: /删除/ })
  await userEvent.click(btn)
  const submitBtn = await screen.findByRole('button', { name: /确 定/ })
  await userEvent.click(submitBtn)
  // delete call
  expect(delReceipt).toHaveBeenCalledTimes(1)
})

test('calls editReceipt to edit', async () => {
  getReceiptList.mockResolvedValue(defaultValue)
  editReceipt.mockResolvedValue({})
  const { getByRole, getByDisplayValue, findByRole } = render(<App />)
  expect(getReceiptList).toHaveBeenCalledTimes(1)
  // only test the row with user name of 李四
  const name = RegExp(/孙六/)
  const row = await findByRole('row', { name })
  const btn = within(row).getByText(/编辑/)
  await userEvent.click(btn)
  // only simply test for user name
  const newName = '王五'
  fireEvent.change(getByDisplayValue(name), { target: { value: newName } } )
  const submitBtn = getByRole('button', { name: '确 定' })
  await userEvent.click(submitBtn)
  // edit call
  expect(editReceipt).toHaveBeenCalledTimes(1)
})