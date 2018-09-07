import React from 'react'
import { Divider, Button, Popconfirm, message, Modal } from 'antd'

export default [
    {
        title: '产品名称',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '产品类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: data => {
            return data === 0 ? '下架' : '上架'
        },
    },
    {
        title: '额度',
        dataIndex: 'limit',
        key: 'limit',
    },
    {
        title: '申请人数',
        dataIndex: 'applyForCount',
        key: 'applyForCount',
    },
    {
        title: '链接',
        dataIndex: 'url',
        key: 'url',
        render: text => {
            return (
                <p
                    style={{
                        maxWidth: 200,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {text}
                </p>
            )
        },
    },
    {
        title: '操作',
        key: 'action',
        render: row => {
            console.log(row)
            const edit = () => {
                debugger
            }
            // const del = () => {
            //     debugger
            // }
            function confirm(e) {
                console.log(e);
                message.success('Click on Yes');
            }
            function cancel(e) {
                console.log(e);
                message.error('Click on No');
            }
            return (
                <span>
                    <Button type="primary" size="small" onClick={edit}>编辑</Button>
                    <Divider type="vertical" />
                    <Popconfirm title="Are you sure delete this task?" onConfirm={confirm} onCancel={cancel} okText="Yes" cancelText="No">
                        <Button type="danger" size="small">删除</Button>
                    </Popconfirm>
                </span>
            )
        },
    },
]