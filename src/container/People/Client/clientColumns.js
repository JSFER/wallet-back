import React from 'react'
import { Row, Col, Button, notification, Modal } from 'antd'

const statusMap = {
    Y: '允许交易',
    N: '禁止交易',
    C: '只可平仓',
    D: '禁止登录',
}

export default instance => [
    {
        title: '客户编号',
        dataIndex: 'clientNo',
        key: 'clientNo',
    },
    {
        title: '客户名称',
        dataIndex: 'clientName',
        key: 'clientName',
    },
    {
        title: '客户状态',
        dataIndex: 'clientStatusEnum',
        key: 'clientStatusEnum',
        render: data => {
            return statusMap[data.code]
        },
    },
    {
        title: '客户电话',
        dataIndex: 'clientPhone',
        key: 'clientPhone',
    },
    {
        title: '证件号码',
        dataIndex: 'clientIdNo',
        key: 'clientIdNo',
    },
    {
        title: '注册日期',
        dataIndex: 'clientRegistDate',
        key: 'clientRegistDate',
    },
    {
        title: '操作',
        dataIndex: 'id',
        render: (id) => {
            return (
                <Row>
                    <Col span={24}>
                        <Button
                            onClick={() => {
                                instance.setState({
                                    currentClientId: id,
                                    visible: true,
                                    action: 'edit',
                                })
                            }}
                            type="primary"
                        >
                            编辑
                        </Button>
                    </Col>
                </Row>
            )
        },
    },
]
