import React from 'react'
import { Row, Col, Form, Input, Select } from 'antd'

const FormItem = Form.Item
const Option = Select.Option

@Form.create()
class Edit extends React.Component {
    render() {
        const {
            exchangeNo,
            commodityNo,
            commodityName,
            commodityStatus,
            minTick,
            minTickPrice,
            currencyNo,
            maxSingleOrderVol,
            maxHolVol,
        } = this.props
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                span: 10,
            },
            wrapperCol: {
                span: 14,
            },
        }

        return (
            <Form>
                <Row gutter={16}>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="市场编号">
                            {getFieldDecorator('exchangeNo', {
                                rules: [{ required: true, message: '市场编号不能为空' }],
                                initialValue: exchangeNo,
                            })(<Input placeholder="请输入市场编号" />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="品种编号">
                            {getFieldDecorator('commodityNo', {
                                rules: [{ required: true, message: '品种编号不能为空' }],
                                initialValue: commodityNo,
                            })(<Input placeholder="请输入品种编号" />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="品种名称">
                            {getFieldDecorator('commodityName', {
                                rules: [{ required: true, message: '品种名称不能为空' }],
                                initialValue: commodityName,
                            })(<Input placeholder="请输入品种名称" />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="品种状态">
                            {getFieldDecorator('status', {
                                rules: [{ required: true, message: '请选择品种状态' }],
                                initialValue: commodityStatus,
                            })(
                                <Select>
                                    <Option value="Y">允许交易</Option>
                                    <Option value="N">禁止交易</Option>
                                    <Option value="C">只可平仓</Option>
                                </Select>,
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="最小变动单位">
                            {getFieldDecorator('minTick', {
                                rules: [{ required: true, message: '最小变动单位不可为空' }],
                                initialValue: minTick,
                            })(<Input type="number" placeholder="请输入最小变动单位" />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="最小单位价值">
                            {getFieldDecorator('minTickPrice', {
                                rules: [{ required: true, message: '最小单位价值不可为空' }],
                                initialValue: minTickPrice,
                            })(<Input placeholder="请输入最小单位价值" />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="币种编号">
                            {getFieldDecorator('currencyNo', {
                                rules: [{ required: true, message: '币种编号不可为空' }],
                                initialValue: currencyNo,
                            })(<Input placeholder="请输入币种编号" />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="单笔最大下单量">
                            {getFieldDecorator('maxSingleOrderVol', {
                                rules: [{ required: true, message: '单笔最大下单量不可为空' }],
                                initialValue: maxSingleOrderVol,
                            })(<Input placeholder="请输入单笔最大下单量" />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="最大持仓量">
                            {getFieldDecorator('maxHolVol', {
                                rules: [{ required: true, message: '最大持仓量不可为空' }],
                                initialValue: maxHolVol,
                            })(<Input placeholder="请输入最大持仓量" />)}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default Edit
