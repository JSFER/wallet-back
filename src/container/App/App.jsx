import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// components
import Header from '@src/components/Header/Header'
import MenuBar from '@src/components/MenuBar/MenuBar'
import BreadcrumbCustom from '@src/components/Breadcrumb/Breadcrumb'

// pages
import PageManage from '@src/container/PageManage/PageManage'
import ProductManage from '@src/container/ProductManage/ProductManage'
import ProductAdd from '@src/container/ProductAdd/ProductAdd'
import ProductGroup from '@src/container/ProductGroup/ProductGroup'

// style
import './App.css'

class App extends Component {
    renderHome = () => <div className="welcome">欢迎使用群楚后台管理系统</div>
    render() {
        return (
            <div className="page-app">
                <Header />
                <div className="aside-area">
                    <MenuBar width={240} />
                </div>
                <div className="main">
                    <BreadcrumbCustom />
                    <Route exact path="/" render={this.renderHome} />
                    <Route exact path="/product" component={ProductManage} />
                    <Route exact path="/product/add" component={ProductAdd} />
                    <Route exact path="/product/group" component={ProductGroup} />
                    <Route exact path="/page" component={PageManage} />
                </div>
            </div>
        )
    }
}

export default App
