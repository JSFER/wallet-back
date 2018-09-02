import React from 'react'
import { Divider } from 'antd'

export default [
    {
        title: '产品名称',
        dataIndex: 'name',
    },
    {
        title: '产品类型',
        dataIndex: 'type',
    },
    {
        title: '状态',
        dataIndex: 'status',
        render: data => {
            return data === 0 ? '下架' : '上架'
        },
    },
    {
        title: '额度',
        dataIndex: 'limit',
    },
    {
        title: '申请人数',
        dataIndex: 'applyForCount',
    },
    {
        title: '链接',
        dataIndex: 'url',
    },
    {
        title: '操作',
        render: () => (
            <span>
                <span>编辑</span>
                <Divider type="vertical" />
                <span>删除</span>
            </span>
        ),
    },
]
