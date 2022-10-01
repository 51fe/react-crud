import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import moment from 'moment'
import './styles/index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'

moment.locale('zh-cn')
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ConfigProvider
      locale={zhCN}
      componentSize="middle"
    >
      <App />
    </ConfigProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
