import React from 'react'
import { Table } from 'antd'
import { detailColumns } from './columns'

class Money extends React.Component {
    onPagination = () => {}
    render() {
        const { moneys, pageNo, pageSize, total } = this.props
        return (
            <div>
                <Table
                    columns={detailColumns}
                    dataSource={moneys}
                    pagination={{
                        current: pageNo + 1,
                        pageSize,
                        total,
                        onChange: this.onPagination,
                    }}
                />
            </div>
        )
    }
}

export default Money
