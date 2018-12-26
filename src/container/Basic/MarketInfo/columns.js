import React from 'react'
import { Row, Col, Button, notification, Modal } from 'antd'

export default instance => [
    {
        title: '证券名称',
        dataIndex: 'exchangeName',
        key: 'exchangeName',
    },
    {
        title: '证券号码',
        dataIndex: 'exchangeNo',
        key: 'exchangeNo',
    },
    {
        title: '证券',
        dataIndex: 'exchangeStatusEnum.text',
        key: 'exchangeStatusEnum.text',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        // render: data => {
        //     return data.text
        // },
    },
    {
        title: '操作',
        dataIndex: 'id',
        key: 'action',
        render: id => {
            return (
                <Row>
                    <Col span={12}>
                        <Button
                            onClick={() => {
                                instance.props.dispatch({
                                    type: 'MarketInfo/fetchVarietyAsync',
                                    payload: {
                                        id,
                                        callback: data => {
                                            instance.setState({
                                                // variety: { ...data, commodityStatus: data.status },
                                                // visible: true,
                                                // action: 'edit',
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
                                            type: 'MarketInfo/deleteVarietyAsync',
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
