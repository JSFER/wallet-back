import React from 'react'
import { connect } from 'react-redux'
import pick from 'lodash/pick'

// modules
import { Table, Modal, Row, Col, Button, notification } from 'antd'
import Edit from './Edit'

import columns from './columns'

@connect(state => ({
    ...state.Currency,
}))
class Currency extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            currency: {},
            action: 'add',
            visible: false,
        }
    }
    componentDidMount() {
        const { dispatch } = this.props

        dispatch({
            type: 'Currency/fetchCurrenciesAsync',
            payload: {
                pageNo: 0,
            },
        })
    }
    handleSubmit = values => {
        const params = pick(values, ['currencyNo', 'currencyName', 'exchangeRate'])

        params.status = values.isBase ? 'Y' : 'N'

        this.props.dispatch({
            type: 'Currency/addCurrencyAsync',
            payload: {
                params,
                callback: () => {
                    notification.info({
                        message: '提示',
                        description: '添加成功',
                    })
                },
            },
        })
    }
    handleAdd = () => {
        this.setState({
            visible: true,
            currency: {},
        })
    }
    onPagination = next => {
        this.props.dispatch({
            type: 'Currency/fetchCurrenciesAsync',
            payload: {
                pageNo: next,
            },
        })
    }
    render() {
        const { currencies, pageNo, pageSize, total } = this.props
        const { action, currency, visible } = this.state
        const title = action === 'add' ? '添加货币' : '编辑货币'

        return (
            <div className="page-currency">
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={this.handleAdd}>
                            添加货币
                        </Button>
                    </Col>
                </Row>
                <Table
                    style={{ marginTop: 20 }}
                    rowSelection={{
                        onChange: (selectedRowKeys, selectedRows) => {
                            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
                        },
                    }}
                    columns={columns}
                    dataSource={currencies}
                    pagination={{
                        current: pageNo,
                        pageSize,
                        total,
                        onChange: this.onPagination,
                    }}
                />
                <Modal
                    width={innerWidth / 2}
                    visible={visible}
                    title={title}
                    onOk={() => {
                        const form = this.modalRef.getForm()

                        form.validateFields((err, values) => {
                            if (!err) {
                                this.handleSubmit(values)
                                form.resetFields()
                                this.setState({
                                    visible: false,
                                })
                            }
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                        })
                    }}
                >
                    <Edit
                        ref={ref => {
                            this.modalRef = ref
                        }}
                        {...currency}
                    />
                </Modal>
            </div>
        )
    }
}

export default Currency
