import React from 'react'
import { connect } from 'react-redux'

// modules
import { Table, Input, Row, Col, Button, Form } from 'antd'
import columns from './clientColumns'
 
const FormItem = Form.Item

@Form.create()
@connect(state => ({
    Client: state.Client,
}))
class Client extends React.Component {
    state = {
        clientId: '',
        agentId: '',
        groupId: '',
    }
    componentDidMount() {
        this.fetch({
            pageNo: 0,
        })
    }
    fetch = payload => {
        this.props.dispatch({
            type: 'Client/fetchClientsAsync',
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
        const { Client } = this.props
        const { getFieldDecorator } = this.props.form
        const { clients, pageNo, pageSize, total } = Client
        const { clientId, agentId, groupId } = this.state
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
                        <FormItem {...formItemLayout} label="客户ID">
                            {getFieldDecorator('clientId', {
                                initialValue: clientId,
                            })(<Input placeholder="请输入客户ID" />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="代理人ID">
                            {getFieldDecorator('agentId', {
                                initialValue: agentId,
                            })(<Input placeholder="请输入代理人ID" />)}
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem {...formItemLayout} label="分组ID">
                            {getFieldDecorator('groupId', {
                                initialValue: groupId,
                            })(<Input placeholder="请输入分组ID" />)}
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
                    rowSelection={{
                        onChange: (selectedRowKeys, selectedRows) => {
                            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
                        },
                    }}
                    columns={columns}
                    dataSource={clients}
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

export default Client
