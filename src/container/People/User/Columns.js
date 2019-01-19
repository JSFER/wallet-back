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
    // {
    //     title: '操作',
    //     dataIndex: 'id',
    //     render: (id) => {
    //         return (
    //             <Row>
    //                 <Col span={24}>
    //                     <Button
    //                         onClick={() => {
    //                             instance.setState({
    //                                 currentClientId: id,
    //                                 visible: true,
    //                                 action: 'edit',
    //                             })
    //                         }}
    //                         type="primary"
    //                     >
    //                         编辑
    //                     </Button>
    //                 </Col>
    //             </Row>
    //         )
    //     },
    // },
]
