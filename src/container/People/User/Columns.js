import React from 'react'
import { Row, Col, Button, notification, Modal } from 'antd'

export default instance => [
    {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName'
    },
    {
        title: '真实姓名',
        dataIndex: 'realName',
        key: 'realName'  
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: '角色',
        dataIndex: 'sysRoleCustomList',
        key: 'sysRoleCustomList',
        render: data => {
            return data.map(i => {
                return i.roleName
            }).join('，')
        },
    },
    {
        title: '状态',
        dataIndex: 'userStatusEnum',
        key: 'userStatusEnum',
        render: data => {
            return data.text
        },
    },
    {
        title: '操作',
        dataIndex: 'id',
        width: '200px',
        render: (id) => {
            return (
                <Row>
                    <Col span={12}>
                        <Button
                            onClick={() => {
                                instance.props.dispatch({
                                    type: 'User/fetchUserDetailAsync',
                                    payload: {
                                        id,
                                        callback: data => {
                                            const nData = {
                                                email: data.email, 
                                                realName: data.realName, 
                                                userName: data.userName, 
                                                sysRoleCustomList: data.sysRoleCustomList.map(j => {
                                                    return {key: j.id}
                                                })
                                            }
                                            instance.setState({
                                                userId: id,
                                                userInfo: { ...nData},
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
                                            type: 'User/deleteUserAsync',
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
