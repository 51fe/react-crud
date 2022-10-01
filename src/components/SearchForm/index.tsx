import './index.scss'
import { SearchOutlined } from '@ant-design/icons'
import { Button, Form } from 'antd'
import options from '../AreaCascader/area'
import BaseDatePicker from '../BaseDatePicker'
import BaseInput from '../BaseInput'
import BaseSelect from '../BaseSelect'
import { IQuery } from '../../type/receipt'
import { useState } from 'react'

interface ISearchProps {
  onSearch: (value: IQuery) => void
}

const SearchForm = ({ onSearch }: ISearchProps) => {
  const [form] = Form.useForm()
  const provinces = options.map((item) => {
    return {
      label: item.label,
      value: item.label
    }
  })

  const [cities, setCities] = useState<IOption[]>([])
  const changeProvice = (value: SelectValue) => {
    // reset
    form.setFieldValue('area_like', undefined)
    form.setFieldValue('area', undefined)
    setCities([])
    if (areas) {
      setAreas([])
    }
    if (value) {
      const children = options.find((item) => item.label === value)?.children
      if (children != null) {
        const value: IOption[] = children?.map((item) => {
          return {
            label: item.label,
            // 1...4 for city area code
            value: Math.floor(item.value / 100),
            children: item.children
          }
        })
        setCities(value)
      }
    }
  }

  const [areas, setAreas] = useState<IOption[]>([])
  const changeCity = (value: SelectValue) => {
    // reset
    form.setFieldValue('area', undefined)
    if (areas) {
      setAreas([])
    }
    if (value) {
      const city = cities.find((item) => item.value === value)
      const areas = city?.children ?? []
      setAreas(areas)
    }
  }

  const onFinish = (values: IQuery) => {
    onSearch(values)
  }

  return (
    <Form
      form={form}
      layout="inline"
      colon={false}
      onFinish={onFinish}
      autoComplete="off"
      className="search-form"
    >
      <Form.Item name="userName_like">
        <BaseInput placeholder="请输入姓名" />
      </Form.Item>

      <Form.Item name="mobile_like">
        <BaseInput placeholder="请输入手机号" />
      </Form.Item>

      <Form.Item name="date_gte">
        <BaseDatePicker placeholder="开始日期" />
      </Form.Item>

      <Form.Item name="date_lte">
        <BaseDatePicker placeholder="结束日期" />
      </Form.Item>

      <Form.Item name="areaName_like">
        <BaseSelect
          options={provinces}
          placeholder="请选择省"
          onChange={changeProvice}
        />
      </Form.Item>

      <Form.Item name="area_like">
        <BaseSelect
          options={cities}
          placeholder="请选择市"
          onChange={changeCity}
        />
      </Form.Item>

      <Form.Item name="area">
        <BaseSelect
          options={areas}
          placeholder="请选择区"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          icon={<SearchOutlined />}
        />
      </Form.Item>
    </Form>
  )
}

export default SearchForm
