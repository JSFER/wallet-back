import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// components
import Header from '@src/components/Header/Header'
import MenuBar from '@src/components/MenuBar/MenuBar'
import BreadcrumbCustom from '@src/components/Breadcrumb/Breadcrumb'

// pages
import Currency from '@src/container/Currency/Currency'
import Client from '@src/container/People/Client'
import Agent from '@src/container/People/Agent'

// style
import './App.css'

class App extends Component {
    renderHome = () => <div className="welcome">欢迎使用面包后台管理系统</div>
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
                    <Route exact path="/basic/exchangeRate" component={Currency} />
                    <Route exact path="/people/client" component={Client} />
                    <Route exact path="/people/agent" component={Agent} />
                </div>
            </div>
        )
    }
}

export default App
