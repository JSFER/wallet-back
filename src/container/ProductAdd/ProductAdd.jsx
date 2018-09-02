import React from 'react'
import { Row, Col, Form, Input, Select, Button, notification } from 'antd'
import { connect } from 'react-redux'

const FormItem = Form.Item
const Option = Select.Option

@connect()
@Form.create()
export default class ProductAdd extends React.Component {
    handleSubmit = e => {
        e.preventDefault()

        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.dispatch({
                    type: 'Product/addProductAction',
                    payload: {
                        params: {
                            ...values,
                            status: 0,
                        },
                        cb: () => {
                            this.props.form.resetFields()

                            notification.info({
                                message: '提示',
                                description: '添加成功!',
                            })
                        },
                    },
                })
            }
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form

        return (
            <div className="page-product-add">
                <Form onSubmit={this.handleSubmit}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem label="产品名称">
                                {getFieldDecorator('name', {
                                    rules: [{ required: true, message: '产品名称不能为空' }],
                                })(<Input placeholder="请输入产品名称" />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="产品类别">
                                {getFieldDecorator('type', {
                                    initialValue: 'all',
                                })(
                                    <Select placeholder="请选择一个产品类型">
                                        <Option value="all">全部</Option>
                                    </Select>,
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem label="申请人数">
                                {getFieldDecorator('applyForCount')(<Input placeholder="请输入申请人数" />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="额度">
                                {getFieldDecorator('limit')(<Input placeholder="请输入额度" />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <FormItem label="简介">
                                {getFieldDecorator('profile')(<Input placeholder="请输入简介" />)}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="url">
                                {getFieldDecorator('url', {
                                    rules: [{ required: true, message: '产品链接不能为空' }],
                                })(<Input placeholder="请输入产品链接" />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem label="产品logo">
                                {getFieldDecorator('logoUrl')(<Input placeholder="请输入产品logo的链接，不填将使用默认logo" />)}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">
                                添加
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
