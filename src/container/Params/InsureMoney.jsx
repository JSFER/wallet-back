import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Table, Modal } from 'antd'

const templateColumns = instance => [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '保证金模板名称',
        dataIndex: 'feeTemplateName',
        key: 'feeTemplateName',
    },
    {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark',
    },
    {
        title: '操作',
        dataIndex: 'id',
        key: 'action',
        width: 200,
        render: id => {
            return (
                <Row>
                    <Col span={12}>
                        <Button
                            onClick={() => {
                                instance.props.dispatch({
                                    type: 'Template/fetchInsureMoneysAsync',
                                    payload: {
                                        id,
                                        pageNo: 0,
                                    },
                                })
                                instance.setState({
                                    visible: true,
                                })
                            }}
                            type="primary"
                        >
                            查看
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button type="danger">删除</Button>
                    </Col>
                </Row>
            )
        },
    },
]

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
    },
    {
        title: '保证金模板ID',
        dataIndex: 'feeTemplateId',
    },
    {
        title: '品种编号',
        dataIndex: 'commodityNo',
    },
    {
        title: '品种名称',
        dataIndex: 'commodityName',
    },
    {
        title: '手续费',
        dataIndex: 'fee',
    },
    {
        title: '修改时间',
        dataIndex: 'modifyDateTime',
    },
]

@connect(state => ({
    insure: state.Template.insure,
    money: state.Template.money,
}))
class InsureMoney extends React.Component {
    state = {
        visible: false,
    }
    componentDidMount() {
        this.fetch()
    }
    fetch = () => {
        this.props.dispatch({
            type: 'Template/fetchInsureTemplatesAsync',
            payload: {
                pageNo: 0,
            },
        })
    }
    onPagination = () => {}
    render() {
        const { templates, pageNo, pageSize, total } = this.props.insure

        return (
            <div className="page-insure-money">
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary">添加模板</Button>
                    </Col>
                </Row>
                <Table
                    style={{ marginTop: 20 }}
                    columns={templateColumns(this)}
                    dataSource={templates}
                    pagination={{
                        current: pageNo + 1,
                        pageSize,
                        total,
                        onChange: this.onPagination,
                    }}
                />
                <Modal
                    visible={this.state.visible}
                    width={innerWidth * 0.8}
                    onCancel={() => {
                        this.setState({
                            visible: false,
                        })
                    }}
                    onOk={() => {
                        this.setState({
                            visible: false,
                        })
                    }}
                >
                    <Money {...this.props.money} />
                </Modal>
            </div>
        )
    }
}

class Money extends React.Component {
    onPagination = () => {}
    render() {
        const { moneys, pageNo, pageSize, total } = this.props
        return (
            <div>
                <Table
                    columns={columns}
                    dataSource={moneys}
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

export default InsureMoney
