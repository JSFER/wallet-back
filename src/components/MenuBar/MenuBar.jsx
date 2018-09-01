import React from 'react'
import { Menu, Icon } from 'antd'
import { withRouter } from 'react-router-dom'

// style
import './MenuBar.css'

const SubMenu = Menu.SubMenu

@withRouter
export default class MenuBar extends React.Component {
    handleMenuClick = value => {
        this.props.history.push(`/${value.key}`)
    }
    render() {
        const { width } = this.props

        return (
            <div className="m-menu-bar">
                <Menu
                    onClick={this.handleMenuClick}
                    style={{ width, height: '100%' }}
                    defaultOpenKeys={['productManage', 'pageManage']}
                    mode="inline"
                >
                    <SubMenu
                        key="productManage"
                        title={
                            <span>
                                <Icon type="profile" />
                                <span>产品管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="product">总览</Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="pageManage"
                        title={
                            <span>
                                <Icon type="setting" />
                                <span>页面管理</span>
                            </span>
                        }
                    >
                        <Menu.Item key="page">总览</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }
}
