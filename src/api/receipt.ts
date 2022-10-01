import { AxiosResponse } from 'axios'
import { IForm, IQuery } from '../type/receipt'
import request from '../utils/request'

export async function getReceiptList (
  params: IParams & IQuery
): Promise<AxiosResponse<ITable<IForm>>> {
  return await request({
    url: '/receipts',
    method: 'get',
    params
  })
}

// 新增
export async function addReceipt (data: IForm) {
  return await request({
    url: '/receipts',
    method: 'POST',
    data
  })
}

// 修改
export async function editReceipt (data: IForm) {
  const { id } = data
  return await request({
    url: `/receipts/${id}`,
    method: 'PUT',
    data
  })
}

// 删除
export async function delReceipt (id: number) {
  return await request({
    url: `/receipts/${id}`,
    method: 'DELETE'
  })
}
