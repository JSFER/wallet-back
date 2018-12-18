import React from 'react'
import { Row, Col, Form, Input, Checkbox } from 'antd'

const FormItem = Form.Item

@Form.create()
class Edit extends React.Component {
    render() {
        const { currencyNo, currencyName, exchangeRate, isBase } = this.props
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
                        <FormItem {...formItemLayout} label="币种编号">
                            {getFieldDecorator('currencyNo', {
                                rules: [{ required: true, message: '币种编号不能为空' }],
                                initialValue: currencyNo,
                            })(<Input placeholder="请输入币种编号" />)}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="名称">
                            {getFieldDecorator('currencyName', {
                                rules: [{ required: true, message: '名称不能为空' }],
                                initialValue: currencyName,
                            })(<Input placeholder="请输入名称" />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="汇率">
                            {getFieldDecorator('exchangeRate', {
                                rules: [{ required: true, message: '汇率不能为空' }],
                                initialValue: exchangeRate,
                            })(<Input type="number" placeholder="请输入汇率" />)}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem {...formItemLayout} label="是否为基币">
                            {getFieldDecorator('isBase', {
                                initialValue: isBase,
                            })(<Checkbox />)}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default Edit