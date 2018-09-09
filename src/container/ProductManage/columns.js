import React from 'react'
import { Divider, Button } from 'antd'

export default function columnsGenerator(handleDelete, handleEdit) {
    return [
        {
            title: '产品名称',
            dataIndex: 'name',
            key: 'name',
        },
        // {
        //     title: '产品类型',
        //     dataIndex: 'type',
        //     key: 'type',
        // },
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
            render: row => (
                <span>
                    <Button
                        type="primary"
                        onClick={() => {
                            handleEdit(row.id)
                        }}
                    >
                        编辑
                    </Button>
                    <Divider type="vertical" />
                    <Button
                        type="danger"
                        onClick={() => {
                            handleDelete(row.id)
                        }}
                    >
                        删除
                    </Button>
                </span>
            ),
        },
    ]
}
