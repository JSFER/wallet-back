import React from 'react'
import { Row, Col, Form, Input, Select, Button } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

@Form.create()
export default class ProductAdd extends React.Component {
    handleSubmit = e => {
        e.preventDefault()

        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values)
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
                                {getFieldDecorator('url')(<Input placeholder="请输入产品链接" />)}
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
