import React from 'react'
import { connect } from 'react-redux'

// modules
import { Table, Input, DatePicker, Row, Col, Button, Form } from 'antd'
import columns from './columns'

const FormItem = Form.Item

@Form.create()
@connect(state => ({
    CreditList: state.CreditList,
}))
export default class CreditList extends React.Component {
    state = {
        pageNo: ''
    }
    componentDidMount() {
        this.fetch({
            pageNo: 0,
        })
    }
    fetch = payload => {
        this.props.dispatch({
            type: 'CreditList/fetchCreditListAsync',
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
            // console.log(values)
            if (!err) {
                this.fetch({
                    pageNo,
                    params: values,
                })
            }
        })
    }
    render() {
        const { CreditList } = this.props
        const { getFieldDecorator } = this.props.form
        const { CreditLists, pageNo, pageSize, total } = CreditList
        const { clientNo } = this.state
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
                    <Col span={16} style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={this.onQuery}>
                            查询
                        </Button>
                    </Col>
                </Row>
                <Table
                    style={{ marginTop: 20 }}
                    columns={columns}
                    dataSource={CreditLists}
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
