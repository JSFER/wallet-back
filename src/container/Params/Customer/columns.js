import moment from "moment";
import React from 'react'
import { Row, Col, Button, Modal, notification } from 'antd'

export default [
    {
        title: '客户组名称',
        dataIndex: 'clientGroupName',
        key: 'clientGroupName',
    },
    {
        title: '客户组编号',
        dataIndex: 'clientGroupNo',
        key: 'clientGroupNo',
    },
    {
        title: '手续费模板名称',
        dataIndex: 'feeTemplateName',
        key: 'feeTemplateName',
    },
    {
        title: '保证金模板名称',
        dataIndex: 'depositTemplateName',
        key: 'depositTemplateName',
    },
    // {
    //     title: '风控模板名称',
    //     dataIndex: 'directEnum.text',
    //     key: 'directEnum.text',
    // },
    // {
    //     title: '操作',
    //     dataIndex: 'id',
    //     key: 'action',
    //     width: 300,
    //     render: id => {
    //         return (
    //             <Row gutter={2}>
    //                 <Col span={8}>
    //                     <Button
    //                         type="primary"
    //                         onClick={() => {
    //                             instance.props.dispatch({
    //                                 type: 'Customer/fetchDetailsAsync',
    //                                 payload: {
    //                                     id,
    //                                     pageNo: 0,
    //                                     callback: () => {
    //                                         instance.onUpdate(id)
    //                                     }
    //                                 },
    //                             })
    //                         }}
    //                     >
    //                         编辑
    //                     </Button>
    //                 </Col>
    //                 <Col span={8}>
    //                     <Button
    //                         type="danger"
    //                         onClick={() => {
    //                             Modal.confirm({
    //                                 title: '确定要删除吗？',
    //                                 onOk: () => {
    //                                     instance.props.dispatch({
    //                                         type: 'Customer/deleteCustomereAsync',
    //                                         payload: {
    //                                             id,
    //                                             callback: () => {
    //                                                 notification.info({
    //                                                     message: '提示',
    //                                                     description: '删除成功',
    //                                                 })
    //                                                 instance.fetch({
    //                                                     pageNo: 0,
    //                                                     type: instance.type,
    //                                                 })
    //                                             },
    //                                         },
    //                                     })
    //                                 },
    //                             })
    //                         }}
    //                     >
    //                         删除
    //                     </Button>
    //                 </Col>
    //             </Row>
    //         )
    //     },
    // },
]
