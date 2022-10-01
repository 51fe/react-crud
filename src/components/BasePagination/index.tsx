import './index.scss'
import { Pagination } from 'antd'
import { scrollTo } from '../../utils/scroll-to'

interface IBasePaginationProps {
  total?: number
  page?: number
  limit?: number
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  background?: boolean
  autoScroll?: boolean
  hidden?: boolean
  pagination?: (page: number, limit: number) => void
}

const BasePagination = ({
  total,
  page = 1,
  limit = 15,
  showSizeChanger,
  showQuickJumper,
  autoScroll = true,
  hidden,
  pagination
}: IBasePaginationProps) => {
  const onChange = (current: number, pageSize: number) => {
    pagination?.(current, pageSize)
    if (autoScroll) {
      scrollTo(0, 800)
    }
  }
  return (
    <div className={hidden ? 'pagination-container hidden' : 'pagination-container '}>
      <Pagination
        current={page}
        pageSize={limit}
        pageSizeOptions={[15, 30, 50, 100]}
        total={total}
        showSizeChanger={showSizeChanger}
        showQuickJumper={showQuickJumper}
        onChange={onChange}
      />
    </div>
  )
}

export default BasePagination
