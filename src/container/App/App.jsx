import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// components
import Header from '@src/components/Header/Header'
import MenuBar from '@src/components/MenuBar/MenuBar'
import BreadcrumbCustom from '@src/components/Breadcrumb/Breadcrumb'

// pages

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
                </div>
            </div>
        )
    }
}

export default App
