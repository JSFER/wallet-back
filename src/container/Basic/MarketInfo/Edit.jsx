import React from 'react'
import { Row, Col, Form, Input, Checkbox } from 'antd'

const FormItem = Form.Item

@Form.create()
class Edit extends React.Component {
    render() {
        const { exchangeName, exchangeNo, status } = this.props
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
                        <FormItem {...formItemLayout} label="证券名称">
                            {getFieldDecorator('exchangeName', {
                                rules: [{ required: true, message: '证券名称不能为空' }],
                                initialValue: exchangeName,
                            })(<Input placeholder="请输入证券名称" />)}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="证券号码">
                            {getFieldDecorator('exchangeNo', {
                                rules: [{ required: true, message: '证券号码不能为空' }],
                                initialValue: exchangeNo,
                            })(<Input placeholder="请输入证券号码" />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="状态">
                            {getFieldDecorator('status', {
                                rules: [{ required: true, message: '状态不能为空' }],
                                initialValue: status,
                            })(<Input placeholder="请输入状态" />)}
                        </FormItem>
                    </Col>
                    {/* <Col span={12}>
                        <FormItem {...formItemLayout} label="是否为基币">
                            {getFieldDecorator('isBase', {
                                initialValue: isBase,
                            })(<Checkbox />)}
                        </FormItem>
                    </Col> */}
                </Row>
            </Form>
        )
    }
}

export default Edit