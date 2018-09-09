import React from 'react'
import { Row, Col, Form, Input } from 'antd'

const FormItem = Form.Item

@Form.create()
export default class Edit extends React.Component {
    render() {
        const { name, applyForCount, logoUrl, limit, profile, url } = this.props
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16,
            },
        }

        return (
            <Form>
                <Row gutter={16}>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="产品名称">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: '产品名称不能为空' }],
                                initialValue: name,
                            })(<Input placeholder="请输入产品名称" />)}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="申请人数">
                            {getFieldDecorator('applyForCount', {
                                initialValue: applyForCount,
                            })(<Input placeholder="请输入申请人数" />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="产品logo">
                            {getFieldDecorator('logoUrl', {
                                initialValue: logoUrl,
                            })(<Input placeholder="请输入产品logo的链接，不填将使用默认logo" />)}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="额度">
                            {getFieldDecorator('limit', {
                                initialValue: limit,
                            })(<Input placeholder="请输入额度" />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="简介">
                            {getFieldDecorator('profile', {
                                initialValue: profile,
                            })(<Input placeholder="请输入简介" />)}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="url">
                            {getFieldDecorator('url', {
                                rules: [{ required: true, message: '产品链接不能为空' }],
                                initialValue: url,
                            })(<Input placeholder="请输入产品链接" />)}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        )
    }
}
