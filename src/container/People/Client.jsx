import React from 'react'
import { connect } from 'react-redux'

// modules
import { Table, Modal, Row, Col, Button, notification } from 'antd'
import columns from './clientColumns'

@connect(state => ({
    Client: state.Client,
}))
class Client extends React.Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'Client/fetchClientsAsync',
            payload: {
                pageNo: 0,
            },
        })
    }
    onPagination = () => {
        this.props.dispatch({
            type: 'Client/fetchClientsAsync',
            payload: {
                pageNo: next - 1,
            },
        })
    }
    render() {
        const { Client } = this.props
        const { clients, pageNo, pageSize, total } = Client
        return (
            <div className="page-client">
                <Table
                    style={{ marginTop: 20 }}
                    rowSelection={{
                        onChange: (selectedRowKeys, selectedRows) => {
                            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
                        },
                    }}
                    columns={columns}
                    dataSource={clients}
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

export default Client
