import React from 'react'
import { connect } from 'react-redux'

// modules
import { Table, Input, DatePicker, Row, Col, Button, Form } from 'antd'
import columns from './nAndOutHistoryColumns'

const FormItem = Form.Item

@Form.create()
@connect(state => ({
    NAndOutHistory: state.NAndOutHistory,
}))
export default class NAndOutHistory extends React.Component {
    state = {
        pageNo: '',
        startDate: undefined,
        endDate: undefined
    }
    componentDidMount() {
        this.fetch({
            pageNo: 0,
        })
    }
    fetch = payload => {
        this.props.dispatch({
            type: 'NAndOutHistory/fetchnAndOutHistorysAsync',
            payload,
        })
    }
    onPagination = next => {
        this.fetch({
            pageNo: next - 1,
        })
    }
    onQuery = () => {
        const { pageNo } = this.props
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (!err) {
                this.fetch({
                    pageNo,
                    params: values,
                })
            }
        })
    }
    render() {
        const { NAndOutHistory } = this.props
        const { getFieldDecorator } = this.props.form
        const { nAndOutHistorys, pageNo, pageSize, total } = NAndOutHistory
        const { clientNo, startDate, endDate } = this.state
        const formItemLayout = {
            labelCol: {
                span: 6,
            },
            wrapperCol: {
                span: 16,
            },
        }
        return (
            <div style={{paddingTop: 20}}>
                <Row>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="客户编号">
                            {getFieldDecorator('clientNo', {
                                initialValue: clientNo,
                            })(<Input placeholder="请输入客户编号" />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                                label="起始日期"
                            >
                            {getFieldDecorator('startDate',  {
                                initialValue: startDate,
                            })(
                                <DatePicker placeholder="请选择开始时间" showTime format="YYYY-MM-DD HH:mm:ss" />
                            )}
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout}
                                label="结束日期"
                            >
                            {getFieldDecorator('endDate', {
                                initialValue: endDate,
                            })(
                                <DatePicker placeholder="请选择结束时间" showTime format="YYYY-MM-DD HH:mm:ss" />
                            )}
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={this.onQuery}>
                            查询
                        </Button>
                    </Col>
                </Row>
                <Table
                    style={{ marginTop: 20 }}
                    columns={columns}
                    dataSource={nAndOutHistorys}
                    pagination={{
                        current: pageNo + 1,
                        pageSize,
                        total,
                        onChange: this.onPagination,
                    }}
                />
            </div>
        )
    }
}
