import React from 'react'
import { connect } from 'react-redux'

// modules
import { Select, Table, Input, Modal, Row, Col, Button, Form } from 'antd'
import columns from './inAndoutColumns'

const FormItem = Form.Item

@Form.create()
@connect(state => ({
    InAndout: state.InAndout,
    clients: state.Client.clients,
    currencies: state.Currency.currencies
}))
export default class InAndout extends React.Component {
    state = {
        pageNo: '',
        visible: false,
    }
    componentDidMount() {
        this.fetch({
            pageNo: 0,
        })
        this.props.dispatch({
            type: 'Client/fetchClientsAsync',
            payload: {
                pageNo: 0,
                pageSize: 100
            }
        })
        this.props.dispatch({
            type: 'Currency/fetchCurrenciesAsync',
            payload: {
                pageNo: 0
            }
        })
    }
    fetch = payload => {
        this.props.dispatch({
            type: 'InAndout/fetchInAndoutAsync',
            payload,
        })
    }
    onPagination = next => {
        this.fetch({
            pageNo: next - 1,
        })
    }
    onAdd = () => {
        this.setState({
            visible: true,
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
        const { InAndout, clients } = this.props
        const { getFieldDecorator } = this.props.form
        const { InAndouts, pageNo, pageSize, total } = InAndout
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
            <div style={{ paddingTop: 20 }}>
                <Row>
                    <Col span={16}>
                        <FormItem {...formItemLayout} label="客户编号">
                            {getFieldDecorator('clientNo', {
                                initialValue: clientNo,
                            })(<Input placeholder="请输入客户编号" />)}
                        </FormItem>
                    </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={this.onAdd}>
                            增加
                        </Button>
                    </Col>
                    <Col span={4} style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={this.onQuery}>
                            查询
                        </Button>
                    </Col>
                </Row>
                <Table
                    style={{ marginTop: 20 }}
                    columns={columns}
                    dataSource={InAndouts}
                    pagination={{
                        current: pageNo + 1,
                        pageSize,
                        total,
                        onChange: this.onPagination,
                    }}
                />
                <Modal
                    visible={this.state.visible}
                    onOk={() => {}}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                        })
                    }}
                >
                    <div>
                        <FormItem {...formItemLayout} label={'客户账户'}>
                            <Select style={{ width: '100%' }}>
                                {
                                    clients.map((client, idx) => {
                                        return <Select.Option key={idx} value={client.clientNo}>{client.clientName}</Select.Option>
                                    })
                                }
                            </Select>
                        </FormItem>
                        <FormItem {...formItemLayout} label={'出入金方式'}>
                            <Select style={{ width: '100%' }}>
                                <Select.Option value={0}>出金</Select.Option>
                                <Select.Option value={1}>入金</Select.Option>
                            </Select>
                        </FormItem>
                        <FormItem {...formItemLayout} label={'币种'}>
                            <Select style={{ width: '100%' }}>
                                {
                                    this.props.currencies.map((cur) => {
                                        return <Select.Option value={cur.currencyNo}>{cur.currencyName}</Select.Option>
                                    })
                                }
                            </Select>
                        </FormItem>
                        <FormItem {...formItemLayout} label={'金额'}>
                            <Input />
                        </FormItem>
                    </div>
                </Modal>
            </div>
        )
    }
}
