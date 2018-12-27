import React from 'react'
import { connect } from 'react-redux'
import pick from 'lodash/pick'

// modules
import { Table, Modal, Row, Col, Button, notification } from 'antd'
import Edit from './Edit'

import columns from './columns'

@connect(state => ({
    ...state.ContractInfo,
}))
export default class ContractInfo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            contractinfo: {},
            action: 'add',
            visible: false,
        }
    }
    componentDidMount() {
        this.fetch({
            pageNo: 0
        })
    }
    fetch = (payload) => {
        const { dispatch } = this.props
        dispatch({
            type: 'ContractInfo/fetchContractInfosAsync',
            payload
        })
    }
    handleSubmit = (values, action) => {
        const actionName = action === 'add' ? 'addContractInfoAsync' : 'updateContractInfoAsync'

        const params = pick(values, ['commodityNo', 'contractName', 'contractNo', 'exchangeNo', 'lastTradeDate', 'mainContract', 'status'])

        this.props.dispatch({
            type: `ContractInfo/${actionName}`,
            payload: {
                id: this.state.contractinfo.id,
                params,
                callback: () => {
                    notification.info({
                        message: '提示',
                        description: action === 'add' ? '添加' : '更新' + '成功',
                    })
                    this.fetch({
                        pageNo: 0
                    })
                },
            },
        })
    }
    handleAdd = () => {
        this.setState({
            visible: true,
            action: 'add',
            contractinfo: {},
        })
    }
    onPagination = next => {
        this.props.dispatch({
            type: 'ContractInfo/fetchContractInfosAsync',
            payload: {
                pageNo: next - 1,
            },
        })
    }
    render() {
        const { contractinfos, pageNo, pageSize, total } = this.props
        const { action, contractinfo, visible } = this.state
        const title = action === 'add' ? '添加合约信息' : '编辑合约信息'

        return (
            <div className="page-currency">
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={this.handleAdd}>
                            添加合约信息
                        </Button>
                    </Col>
                </Row>
                <Table
                    style={{ marginTop: 20 }}
                    columns={columns(this)}
                    dataSource={contractinfos}
                    pagination={{
                        current: pageNo + 1,
                        pageSize,
                        total,
                        onChange: this.onPagination,
                    }}
                />
                <Modal
                    width={innerWidth * 0.8}
                    visible={visible}
                    title={title}
                    okText='确认'
                    cancelText='取消'
                    onOk={() => {
                        const form = this.modalRef.getForm()

                        form.validateFields((err, values) => {
                            if (!err) {
                                this.handleSubmit(values, action)
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
                        {...contractinfo}
                    />
                </Modal>
            </div>
        )
    }
}
