import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Table, Modal, notification } from 'antd'
import { templateColumns } from './columns'
import Detail from './Detail'
import Edit from './Edit'
import forIn from 'lodash/forIn'
import find from 'lodash/find'

@connect(state => ({
    poundage: state.Template.poundage,
    varieties: state.Variety.varieties,
    detail: state.Template.detail
}))
class Poundage extends React.Component {
    type = 1
    state = {
        detailVisible: false,
        editVisible: false,
        currentTemplateId: '',
        mode: 'add'
    }
    componentDidMount() {
        this.fetch()
    }
    fetch = () => {
        this.props.dispatch({
            type: 'Template/fetchTemplatesAsync',
            payload: {
                pageNo: 0,
                type: this.type
            },
        })
    }
    onPagination = (next) => {
        this.props.dispatch({
            type: 'Template/fetchTemplatesAsync',
            payload: {
                pageNo: next - 1,
                type: this.type
            },
        })
    }
    onUpdate = (id) => {
        this.setState({
            editVisible: true,
            currentTemplateId: id,
            mode: 'update'
        })
    }
    onAdd = () => {
        this.setState({
            editVisible: true,
            currentTemplateId: '',
            mode: 'add'
        })
    }
    handleSubmit = (values) => {
        const feeList = []

        forIn(values, (value, key) => {
            if (key.startsWith('fee_')) {
                const id = key.split('_')[1]
                const item = find(this.props.varieties, v => v.commodityNo == id)

                feeList.push({
                    commodityName: item.commodityName,
                    commodityNo: item.commodityNo,
                    fee: value,
                })
            }
        })

        const params = {
            feeTemplateName: values.feeTemplateName,
            remark: values.remark,
            type: this.type,
            feeTemplateCommodityList: feeList
        }

        const action = this.state.mode === 'add' ? 'addTemplateAsync' : 'updateTemplateAsync'

        this.props.dispatch({
            type: 'Template/' + action,
            payload: {
                id: this.state.currentTemplateId,
                params,
                callback: () => {
                    notification.info({
                        message: '提示',
                        description: this.state.mode === 'add' ? '添加成功' : '更新成功',
                    })
                    
                    this.fetch()
                }
            }
        })
    }
    render() {
        const { templates, pageNo, pageSize, total } = this.props.poundage
        const template = find(templates, t => t.id === this.state.currentTemplateId) || {}

        return (
            <div>
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
                    <Detail {...this.props.detail}/>
                </Modal>
                <Modal
                    visible={this.state.editVisible}
                    width={innerWidth * 0.8}
                    destroyOnClose
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
                                this.setState({
                                    editVisible: false,
                                })
                            }
                        })
                    }}
                >
                    <Edit
                        {...template}
                        {...this.props.detail}
                        mode={this.state.mode}
                        ref={ref => {
                            this.editRef = ref
                        }}
                    />
                </Modal>
            </div>
        )
    }
}

export default Poundage
