import './App.scss'
import { ExclamationCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Modal, Table } from 'antd'
import { FC, useEffect, useState } from 'react'
import {
  addReceipt,
  delReceipt,
  editReceipt,
  getReceiptList
} from './api/receipt'
import SaveForm from './components/SaveForm'
import SearchForm from './components/SearchForm'
import { IForm, IQuery } from './type/receipt'
import { parseDateTime } from './utils'
const { Column } = Table
const { confirm } = Modal
const App: FC = () => {
  type FormKey = keyof IForm
  type SearchParams = IParams & IQuery
  const PAGE_SIZE = 15
  const [dialogVisible, setDialogVisible] = useState(false)
  const [adding, setAdding] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cudLoading, setCudLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [form, setForm] = useState({} as IForm)
  const [tableData, setTableData] = useState<IForm[]>([])
  const [params, setParams] = useState<IParams>({
    _page: 1,
    _limit: PAGE_SIZE,
    _sort: 'id',
    _order: 'desc'
  })

  const handleSearch = (keyword: IQuery) => {
    // merge params
    const value: SearchParams = {
      ...params,
      _page: 1,
      ...keyword
    }
    setParams(value)
  }
  // search
  useEffect(() => {
    fetchData(params)
  }, [params])

  const fetchData = (params: SearchParams) => {
    setLoading(true)
    getReceiptList(params)
      .then(({ data }) => {
        setLoading(false)
        setTableData(data.list)
        setTotal(data.total)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  // fetch first page data
  const refesh = () => {
    setParams({
      ...params,
      _page: 1
    })
  }

  useEffect(() => {
    if (!cudLoading) {
      setDialogVisible(false)
    }
  }, [cudLoading])

  const toAdd = () => {
    setAdding(true)
    setDialogVisible(true)
    // reset form
    const value = { ...form }
    Object.keys(value).forEach((item) => {
      const key = item as FormKey
      value[key] = undefined
    })
    setForm(value)
  }

  const toEdit = (row: IForm) => {
    setAdding(false)
    setDialogVisible(true)
    setForm(row)
  }

  const toDelete = (id: number) => {
    confirm({
      title: '确定删除?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        doDelete(id)
      },
      onCancel() {
        console.log('canceled')
      }
    })
  }

  const doAdd = (data: IForm) => {
    setCudLoading(true)
    addReceipt(data)
      .then(() => {
        setCudLoading(false)
        refesh()
      })
      .catch(() => {
        setCudLoading(false)
      })
  }

  const doEdit = (data: IForm) => {
    setCudLoading(true)
    editReceipt(data)
      .then(() => {
        setCudLoading(false)
        // not call fetchData
        setTableData(
          tableData.map((item) =>
            item.id === data.id ? { ...item, ...data } : item
          )
        )
      })
      .catch(() => {
        setCudLoading(false)
      })
  }

  const doDelete = (id: number) => {
    setCudLoading(true)
    delReceipt(id)
      .then(() => {
        setCudLoading(false)
        refesh()
      })
      .catch(() => {
        setCudLoading(false)
      })
  }

  const handleCancel = () => {
    setDialogVisible(false)
  }

  const handleSubmit = (form: IForm) => {
    if (adding) {
      doAdd(form)
    } else {
      doEdit(form)
    }
  }
  return (
    <div id="app">
      <SearchForm onSearch={handleSearch} />
      <div className="box">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={toAdd}
        >
          新增
        </Button>
      </div>
      <Table
        dataSource={tableData}
        loading={loading}
        rowKey="id"
        bordered
        scroll={{ x: '720px' }}
        sticky
        pagination={{
          total: total,
          current: params._page,
          pageSize: params._limit,
          pageSizeOptions: [PAGE_SIZE, PAGE_SIZE * 2, 50, 100],
          showTotal: (t) => (window.screen.width < 767 ? null : `共 ${t} 条`),
          showSizeChanger: true,
          showQuickJumper: true,
          position: ['bottomCenter'],
          size: 'default',
          onChange(page, pageSize) {
            setParams({
              ...params,
              _page: page,
              _limit: pageSize
            })
          }
        }}
      >
        <Column
          title="日期"
          dataIndex="date"
          key="date"
          render={(value) => parseDateTime(value, '{y}-{m}-{d}')}
        />
        <Column
          title="姓名"
          dataIndex="userName"
          key="userName"
        />
        <Column
          title="省市区"
          dataIndex="areaName"
          key="areaName"
          ellipsis
        />
        <Column
          title="地址"
          dataIndex="address"
          key="address"
          ellipsis
          responsive={['lg']}
        />
        <Column
          title="手机号码"
          dataIndex="mobile"
          key="mobile"
        />
        <Column
          title="操作"
          dataIndex="action"
          key="action"
          fixed="right"
          width={100}
          align="center"
          render={(_, row: IForm) => (
            <div className="action-column">
              <Button
                danger
                type="link"
                size="small"
                onClick={() => toDelete(row.id as number)}
              >
                删除
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => toEdit(row)}
              >
                编辑
              </Button>
            </div>
          )}
        />
      </Table>
      <Modal
        title={adding ? '新增收货' : '编辑收货'}
        open={dialogVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <SaveForm
          initialValues={{ ...form }}
          opened={dialogVisible}
          loading={cudLoading}
          onSubmit={handleSubmit}
          onCancle={handleCancel}
        />
      </Modal>
    </div>
  )
}

export default App
