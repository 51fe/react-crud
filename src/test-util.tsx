import { ReactElement, ReactNode } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import moment from 'moment'

moment.locale('zh-cn')

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ConfigProvider locale={zhCN}>
      {children}
    </ConfigProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult => render(
  ui,
  { wrapper: AppProviders, ...options }
)

export * from '@testing-library/react'
export { customRender as render }
export const sleep = (time = 0) =>
  new Promise((resolve) =>
    setTimeout(resolve, time)
  )