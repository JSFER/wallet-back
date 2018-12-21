import React from 'react'
import { connect } from 'react-redux'

// modules
import { Table, Input, Row, Col, Button, Form } from 'antd'
import columns from './entrustColumns'

const FormItem = Form.Item

@Form.create()
@connect(state => ({
    Entrust: state.Entrust,
}))
export default class Entrust extends React.Component {
    state = {
        clientNo: ''
    }
    componentDidMount() {
        this.fetch({
            pageNo: 0,
        })
    }
    fetch = payload => {
        this.props.dispatch({
            type: 'Entrust/fetchEntrustsAsync',
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
            if (!err) {
                this.fetch({
                    pageNo,
                    params: values,
                })
            }
        })
    }
    render() {
        const { Entrust } = this.props
        const { getFieldDecorator } = this.props.form
        const { entrusts, pageNo, pageSize, total } = Entrust
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
                    dataSource={entrusts}
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
