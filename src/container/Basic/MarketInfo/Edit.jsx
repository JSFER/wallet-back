import React from 'react'
import { Row, Col, Form, Input, Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

@Form.create()
class Edit extends React.Component {
    render() {
        const { exchangeName, exchangeNo, status, commodityStatus } = this.props
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
                                rules: [{ required: true, message: '请选择交易状态' }],
                                initialValue: commodityStatus,
                            })(
                                <Select>
                                    <Option value="Y">允许交易</Option>
                                    <Option value="N">禁止交易</Option>
                                </Select>,
                            )}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default Edit