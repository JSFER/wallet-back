import React from 'react'
import { Menu, Icon } from 'antd'
import { withRouter } from 'react-router-dom'

// style
import './MenuBar.css'

const SubMenu = Menu.SubMenu

@withRouter
export default class MenuBar extends React.Component {
    handleMenuClick = value => {
        const path = value.key === 'home' ? '/' : `/${value.key}`

        this.props.history.push(path)
    }
    render() {
        const { width } = this.props

        return (
            <div className="m-menu-bar">
                <Menu
                    onClick={this.handleMenuClick}
                    style={{ width, height: '100%' }}
                    defaultOpenKeys={['basic']}
                    mode="inline"
                >
                    <Menu.Item key="home">
                        <Icon type="home" />
                        <span>首页</span>
                    </Menu.Item>
                    <SubMenu
                        key="basic"
                        title={
                            <span>
                                <Icon type="profile" />
                                <span>基础设置</span>
                            </span>
                        }
                    >
                        <Menu.Item key="basic/exchangeRate">币种汇率信息</Menu.Item>
                        <Menu.Item key="basic/marketInfo">市场信息</Menu.Item>
                        <Menu.Item key="basic/varietyInfo">品种信息</Menu.Item>
                        <Menu.Item key="basic/contractInfo">合约信息</Menu.Item>
                        <Menu.Item key="basic/masterContract">主力合约</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="people"
                        title={
                            <span>
                                <Icon type="profile" />
                                <span>人员管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="people/user">用户管理</Menu.Item>
                        <Menu.Item key="people/client">客户管理</Menu.Item>
                        <Menu.Item key="people/agent">代理人管理</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="params"
                        title={
                            <span>
                                <Icon type="setting" />
                                <span>参数设置</span>
                            </span>
                        }
                    >
                        <Menu.Item key="params/insureMoney">保证金模板信息</Menu.Item>
                        <Menu.Item key="params/poundage">手续费模板信息</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="transaction"
                        title={
                            <span>
                                <Icon type="red-envelope" />
                                <span>交易查询</span>
                            </span>
                        }
                    >
                        <Menu.Item key="transaction/query">成交信息</Menu.Item>
                        <Menu.Item key="transaction/entrust">委托信息</Menu.Item>
                        {/* <Menu.Item key="transaction/deal">成交信息</Menu.Item> */}
                        <Menu.Item key="transaction/hold">持仓信息</Menu.Item>
                        <Menu.Item key="transaction/history-entrust">历史委托</Menu.Item>
                        <Menu.Item key="transaction/history-deal">历史成交</Menu.Item>
                        <Menu.Item key="transaction/history-hold">历史持仓</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="Funding"
                        title={
                            <span>
                                <Icon type="pay-circle" />
                                <span>资金管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="funding/inAndOut">出入金列表</Menu.Item>
                        <Menu.Item key="funding/history">历史资金记录</Menu.Item>
                        <Menu.Item key="funding/nAndOutHistory">历史出入金记录</Menu.Item>
                        <Menu.Item key="funding/creditList">授信资金列表</Menu.Item>
                        <Menu.Item key="funding/historyCreditList">历史授信资金列表</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
