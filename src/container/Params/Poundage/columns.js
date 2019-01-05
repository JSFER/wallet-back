import React from 'react'
import { Row, Col, Button, Modal, notification } from 'antd'

export const templateColumns = instance => [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '保证金模板名称',
        dataIndex: 'feeTemplateName',
        key: 'feeTemplateName',
    },
    {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
    },
    {
        title: '操作',
        dataIndex: 'id',
        key: 'action',
        width: 300,
        render: id => {
            return (
                <Row gutter={2}>
                    <Col span={8}>
                        <Button
                            type="primary"
                            onClick={() => {
                                instance.props.dispatch({
                                    type: 'Template/fetchDetailsAsync',
                                    payload: {
                                        id,
                                        pageNo: 0,
                                        callback: () => {
                                            instance.onUpdate(id)
                                        }
                                    },
                                })
                            }}
                        >
                            编辑
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Button
                            onClick={() => {
                                instance.props.dispatch({
                                    type: 'Template/fetchDetailsAsync',
                                    payload: {
                                        id,
                                        pageNo: 0,
                                    },
                                })
                                instance.setState({
                                    detailVisible: true,
                                })
                            }}
                            type="primary"
                        >
                            查看
                        </Button>
                    </Col>
                    <Col span={8}>
                        <Button
                            type="danger"
                            onClick={() => {
                                Modal.confirm({
                                    title: '确定要删除吗？',
                                    onOk: () => {
                                        instance.props.dispatch({
                                            type: 'Template/deleteTemplateAsync',
                                            payload: {
                                                id,
                                                callback: () => {
                                                    notification.info({
                                                        message: '提示',
                                                        description: '删除成功',
                                                    })
                                                    instance.fetch({
                                                        pageNo: 0,
                                                        type: instance.type,
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

export const detailColumns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: '保证金模板ID',
        dataIndex: 'feeTemplateId',
    },
    {
        title: '品种编号',
        dataIndex: 'commodityNo',
    },
    {
        title: '品种名称',
        dataIndex: 'commodityName',
    },
    {
        title: '手续费',
        dataIndex: 'fee',
    },
    {
        title: '修改时间',
        dataIndex: 'modifyDateTime',
    },
]
