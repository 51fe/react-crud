import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchForm from '../SearchForm'

// only changes the day
const today = new Date()
const y = today.getFullYear()
const m = (today.getMonth() + 1).toString().padStart(2, '0')
const fakeForm = {
  userName_like: '李',
  mobile_like: '134',
  date_gte: `${y}-${m}-11 00:00:00`,
  date_lte: `${y}-${m}-15 00:00:00`,
  areaName_like: '河北省',
  area_like: 1301,
  area: 130102
}

test('emits search event when click search button or press enter', async() => {
  const handleSearch = jest.fn()
  const {
    getByPlaceholderText,
    getByTitle,
  } = render(<SearchForm onSearch={handleSearch} />)
  const userNameInput =  getByPlaceholderText('请输入姓名')
  fireEvent.change(userNameInput, { target: { value: fakeForm.userName_like } })
  const mobileInput = getByPlaceholderText('请输入手机号')
  fireEvent.change(mobileInput, { target: { value: fakeForm.mobile_like } })
  
  const beginDay = getByPlaceholderText('开始日期')
  await userEvent.click(beginDay)
  fireEvent.click(screen.getByTitle(fakeForm.date_gte.substring(0, 10)))
  
  const endDay = getByPlaceholderText('结束日期')
  await userEvent.click(endDay)
  const item = screen.getAllByTitle(fakeForm.date_lte.substring(0, 10))[1]
  fireEvent.click(item)

  const provinceSelect = screen.getAllByRole('combobox')[0]
  await userEvent.click(provinceSelect)
  fireEvent.click(screen.getByTitle(fakeForm.areaName_like))

  const citySelect = screen.getAllByRole('combobox')[1]
  await userEvent.click(citySelect)
  fireEvent.click(screen.getByTitle(/石家庄市/))

  const areaSelect = screen.getAllByRole('combobox')[2]
  await userEvent.click(areaSelect)
  fireEvent.click(screen.getByTitle(/长安区/))

  const searchBtn = getByTitle(/搜索/)
  // Click search button
  fireEvent.click(searchBtn)
  await waitFor(() => {
    expect(handleSearch).toHaveBeenCalledWith(fakeForm)
  })

  // Press enter
  fireEvent.keyUp(screen.getByTestId('search-form'), { key: 'Enter' })
  await waitFor(() => {
    expect(handleSearch).toHaveBeenCalledWith(fakeForm)
  })
})
