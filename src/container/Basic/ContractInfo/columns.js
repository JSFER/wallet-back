import React from 'react'
import { Row, Col, Button, notification, Modal } from 'antd'
import moment from "moment";

export default instance => [
    {
        title: '品种编号',
        dataIndex: 'commodityNo',
        key: 'commodityNo',
    },
    {
        title: '合约名称',
        dataIndex: 'contractName',
        key: 'contractName',
    },
    {
        title: '合约编号',
        dataIndex: 'contractNo',
        key: 'contractNo',
    },
    {
        title: '合约状态',
        dataIndex: 'contractStatusEnum',
        key: 'contractStatusEnum',
        render: data => {
            return data.text
        },
    },
    {
        title: '最后交易日',
        dataIndex: 'lastTradeDate',
        key: 'lastTradeDate',
        render: data => {
            return moment(data).format('YYYY-MM-DD HH:mm:ss')
        },
    },

    
    {
        title: '操作',
        dataIndex: 'id',
        key: 'action',
        width: '200px',
        render: id => {
            return (
                <Row>
                    <Col span={12}>
                        <Button
                            onClick={() => {
                                instance.props.dispatch({
                                    type: 'ContractInfo/fetchContractInfoAsync',
                                    payload: {
                                        id,
                                        callback: data => {
                                            instance.setState({
                                                contractinfo: { ...data, contractStatus: data.contractStatusEnum.code, contractType: data.contractTypeEnum.code},
                                                visible: true,
                                                action: 'edit',
                                            })
                                        },
                                    },
                                })
                            }}
                            type="primary"
                        >
                            编辑
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            type="danger"
                            onClick={() => {
                                Modal.confirm({
                                    title: '确定要删除吗？',
                                    onOk: () => {
                                        instance.props.dispatch({
                                            type: 'ContractInfo/deleteContractInfoAsync',
                                            payload: {
                                                id,
                                                callback: () => {
                                                    notification.info({
                                                        message: '提示',
                                                        description: '删除成功',
                                                    })
                                                    instance.fetch({
                                                        pageNo: 0
                                                    })
                                                },
                                            },
                                        })
                                    },
                                })
                            }}
                        >
                            删除
                        </Button>
                    </Col>
                </Row>
            )
        },
    },
]
