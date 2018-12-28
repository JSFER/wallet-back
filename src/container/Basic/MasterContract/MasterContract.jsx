import React from 'react'
import { connect } from 'react-redux'
import pick from 'lodash/pick'

// modules
import { Table, Modal, Row, Col, Button, notification } from 'antd'
import Edit from '../ContractInfo/Edit'
import MasterEdit from './Edit'

import columns from './columns'

@connect(state => ({
    ...state.MasterContract,
    ...state.ContractInfo
}))
export default class MasterContract extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            mastercontract: {},
            action: 'add',
            visible: false,

            visible2: false,
        }
    }
    componentDidMount() {
        this.fetch({
            pageNo: 0
        })
        this.props.dispatch({
            type: 'ContractInfo/fetchContractInfosAsync',
            payload: {
                pageNo: 0,
            },
        })
    }
    fetch = (payload) => {
        const { dispatch } = this.props
        dispatch({
            type: 'MasterContract/fetchMasterContractsAsync',
            payload
        })
    }
    handleSubmit = (values, action) => {
        const actionName = action === 'add' ? 'addMasterContractAsync' : 'updateMasterContractAsync'

        const params = pick(values, ['commodityNo', 'contractName', 'contractNo', 'exchangeNo', 'lastTradeDate', 'mainContract', 'status'])

        this.props.dispatch({
            type: `MasterContract/${actionName}`,
            payload: {
                id: this.state.mastercontract.id,
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
    handleSubmit2 = values => {
        const params = pick(values, ['idList'])

        this.props.dispatch({
            type: `MasterContract/addMasterContractAsync`,
            payload: {
                id: this.state.mastercontract.id,
                params,
                callback: () => {
                    notification.info({
                        message: '提示',
                        description: '添加成功',
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
            // visible: true,
            // action: 'add',
            // mastercontract: {},
            visible2: true,
        })
    }
    onPagination = next => {
        this.props.dispatch({
            type: 'MasterContract/fetchMasterContractsAsync',
            payload: {
                pageNo: next - 1,
            },
        })
    }
    render() {
        const { mastercontracts, pageNo, pageSize, total, contractinfos } = this.props
        const { action, mastercontract, visible, visible2 } = this.state
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
                    dataSource={mastercontracts}
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
                        {...mastercontract}
                    />
                </Modal>

                <Modal
                    width={innerWidth * 0.5}
                    visible={visible2}
                    title='添加主力合约'
                    okText='确认'
                    cancelText='取消'
                    onOk={() => {
                        const form = this.modalRef2.getForm()
                        form.validateFields((err, values) => {
                            if (!err) {
                                // console.log(values)
                                this.handleSubmit2(values)
                                form.resetFields()
                                this.setState({
                                    visible2: false,
                                })
                            }
                        })
                    }}
                    onCancel={() => {
                        this.setState({
                            visible2: false,
                        })
                    }}
                >
                    <MasterEdit
                        ref={ref => {
                            this.modalRef2 = ref
                        }}
                        contractinfos = {contractinfos}
                    />
                </Modal>
            </div>
        )
    }
}
