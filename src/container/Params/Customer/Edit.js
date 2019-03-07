import React from 'react'
import { Row, Col, Form, Input, Select, DatePicker } from 'antd'

const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item
const Option = Select.Option
import moment from 'moment';

@Form.create()
class Edit extends React.Component {
    render() {
        const { clientGroupNo, contractName, contractStatus, contractNo, exchangeNo, lastTradeDate } = this.props
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
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="客户组编号">
                            {getFieldDecorator('clientGroupNo', {
                                rules: [{ required: true, message: '客户组编号不能为空' }],
                                initialValue: clientGroupNo,
                            })(<Input placeholder="请输入客户组编号" />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="客户组名称">
                            {getFieldDecorator('contractName', {
                                rules: [{ required: true, message: '客户组名称不能为空' }],
                                initialValue: contractName,
                            })(<Input placeholder="请输入客户组名称" />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="手续费">
                            {getFieldDecorator('feeTemplateId', {
                                rules: [{ required: true, message: '手续费不能为空' }],
                                initialValue: contractStatus,
                            })(
                                <Select>
                                    <Option value="Y">允许交易</Option>
                                    <Option value="N">禁止交易</Option>
                                    <Option value="C">只可平仓</Option>
                                </Select>,
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="保证金">
                            {getFieldDecorator('depositTemplateId', {
                                rules: [{ required: true, message: '保证金不能为空' }],
                                initialValue: contractStatus,
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
                        <FormItem {...formItemLayout} label="风控">
                            {getFieldDecorator('riskTemplateId', {
                                rules: [{ required: true, message: '请选择风控状态' }],
                                initialValue: contractStatus,
                            })(
                                <Select>
                                    <Option value="Y">允许交易</Option>
                                    <Option value="N">禁止交易</Option>
                                    <Option value="C">只可平仓</Option>
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