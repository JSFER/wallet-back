import React from 'react'
import { Row, Col, Button, notification, Modal } from 'antd'

export default instance => [
    {
        title: '市场名称',
        dataIndex: 'exchangeName',
        key: 'exchangeName',
    },
    {
        title: '市场编号',
        dataIndex: 'exchangeNo',
        key: 'exchangeNo',
    },
    {
        title: '市场状态',
        dataIndex: 'exchangeStatusEnum',
        key: 'exchangeStatusEnum',
        render: data => {
            return data.text
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
                                    type: 'MarketInfo/fetchMarketInfoAsync',
                                    payload: {
                                        id,
                                        callback: data => {
                                            instance.setState({
                                                marketinfo: { ...data, commodityStatus: data.exchangeStatusEnum.code},
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
                                            type: 'MarketInfo/deleteMarketInfoAsync',
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
