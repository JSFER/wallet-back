import React from 'react'
import { Row, Col, Form, Input, Select, DatePicker } from 'antd'

const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item
const Option = Select.Option
import moment from 'moment';

@Form.create()
class Edit extends React.Component {
    render() {
        const { commodityNo, contractName, contractStatus, contractNo, exchangeNo, lastTradeDate } = this.props
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
                        <FormItem {...formItemLayout} label="品种编号">
                            {getFieldDecorator('commodityNo', {
                                rules: [{ required: true, message: '品种编号不能为空' }],
                                initialValue: commodityNo,
                            })(<Input placeholder="请输入品种编号" />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="合约名称">
                            {getFieldDecorator('contractName', {
                                rules: [{ required: true, message: '合约名称不能为空' }],
                                initialValue: contractName,
                            })(<Input placeholder="请输入合约名称" />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="合约编号">
                            {getFieldDecorator('contractNo', {
                                rules: [{ required: true, message: '合约编号不能为空' }],
                                initialValue: contractNo,
                            })(<Input placeholder="请输入合约编号" />)}
                        </FormItem>
                    </Col>
                </Row>
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
                        <FormItem {...formItemLayout} label="品种状态">
                            {getFieldDecorator('status', {
                                rules: [{ required: true, message: '请选择品种状态' }],
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
                        <FormItem {...formItemLayout} label="最后交易日">
                            {getFieldDecorator('lastTradeDate', {
                                rules: [{ required: true, message: '最后交易日不能为空' }],
                                initialValue: lastTradeDate?moment(lastTradeDate, 'YYYY-MM-DD HH:mm:ss'):undefined,
                            })(<DatePicker placeholder="请选择最后交易日" showTime format="YYYY-MM-DD HH:mm:ss" />)}
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default Edit