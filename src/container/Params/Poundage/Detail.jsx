import React from 'react'
import { Table } from 'antd'
import { detailColumns } from './columns'

class Detail extends React.Component {
    onPagination = () => {}
    render() {
        const { details, pageNo, pageSize, total } = this.props
        return (
            <div>
                <Table
                    columns={detailColumns}
                    dataSource={details}
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

export default Detail
