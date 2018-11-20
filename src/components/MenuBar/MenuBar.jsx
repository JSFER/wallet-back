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
                        <Menu.Item key="basic/typeInfo">品种信息</Menu.Item>
                        <Menu.Item key="basic/contractInfo">合约信息</Menu.Item>
                        <Menu.Item key="basic/masterContract">主力合约</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="custom"
                        title={
                            <span>
                                <Icon type="profile" />
                                <span>客户管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="custom/profile">总览</Menu.Item>
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
                        <Menu.Item key="params/profile">总览</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
