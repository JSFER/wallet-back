import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Table, Modal } from 'antd'
import { templateColumns } from './columns'
import Detail from './Detail'
import Edit from './Edit'

@connect(state => ({
    insure: state.Template.insure,
    money: state.Template.money,
}))
class InsureMoney extends React.Component {
    state = {
        detailVisible: false,
        editVisible: false,
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
    onAdd = () => {
        this.setState({
            editVisible: true,
        })
    }
    handleSubmit = () => {}
    render() {
        const { templates, pageNo, pageSize, total } = this.props.insure

        return (
            <div className="page-insure-money">
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Button type="primary" onClick={this.onAdd}>
                            添加模板
                        </Button>
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
                    visible={this.state.detailVisible}
                    width={innerWidth * 0.8}
                    onCancel={() => {
                        this.setState({
                            detailVisible: false,
                        })
                    }}
                    onOk={() => {
                        this.setState({
                            detailVisible: false,
                        })
                    }}
                    okText="确定"
                    cancelText="取消"
                >
                    <Detail {...this.props.money} />
                </Modal>
                <Modal
                    visible={this.state.editVisible}
                    width={innerWidth * 0.6}
                    onCancel={() => {
                        this.setState({
                            editVisible: false,
                        })
                    }}
                    onOk={() => {
                        const form = this.editRef.getForm()

                        form.validateFields((err, values) => {
                            if (!err) {
                                this.handleSubmit(values)
                                form.resetFields()
                                this.setState({
                                    visible: false,
                                })
                            }
                        })
                    }}
                >
                    <Edit
                        ref={ref => {
                            this.editRef = ref
                        }}
                    />
                </Modal>
            </div>
        )
    }
}

export default InsureMoney
