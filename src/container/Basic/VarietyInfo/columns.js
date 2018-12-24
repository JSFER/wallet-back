import React from 'react'
import { Row, Col, Button, notification, Modal } from 'antd'

export default instance => [
    {
        title: '市场编号',
        dataIndex: 'exchangeNo',
        key: 'exchangeNo',
    },
    {
        title: '品种编号',
        dataIndex: 'commodityNo',
        key: 'commodityNo',
    },
    {
        title: '品种名称',
        dataIndex: 'commodityName',
        key: 'commodityName',
    },
    {
        title: '品种状态',
        dataIndex: 'commodityStatusEnum',
        key: 'commodityStatusEnum',
        render: data => {
            return data.text
        },
    },
    {
        title: '最小变动单位',
        dataIndex: 'minTick',
        key: 'minTick',
    },
    {
        title: '最小单位价值',
        dataIndex: 'minTickPrice',
        key: 'minTickPrice',
    },
    {
        title: '币种编号',
        dataIndex: 'currencyNo',
        key: 'currencyNo',
    },
    {
        title: '单笔最大下单量',
        dataIndex: 'maxSingleOrderVol',
        key: 'maxSingleOrderVol',
    },
    {
        title: '最大持仓量',
        dataIndex: 'maxHolVol',
        key: 'maxHolVol',
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
                                    type: 'Variety/fetchVarietyAsync',
                                    payload: {
                                        id,
                                        callback: data => {
                                            instance.setState({
                                                variety: { ...data, commodityStatus: data.status },
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
                                            type: 'Variety/deleteVarietyAsync',
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
