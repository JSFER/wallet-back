import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// components
import Header from '@src/components/Header/Header'
import MenuBar from '@src/components/MenuBar/MenuBar'

// pages
import ProductManage from '@src/container/ProductManage/ProductManage'
import PageManage from '@src/container/PageManage/PageManage'

// style
import './App.css'

class App extends Component {
    renderHome = () => <div className="welcome">欢迎使用xxxx</div>
    render() {
        return (
            <div className="page-app">
                <Header />
                <div className="aside-area">
                    <MenuBar width={240} />
                </div>
                <div className="main">
                    <Route exact path="/" render={this.renderHome} />
                    <Route exact path="/product" component={ProductManage} />
                    <Route exact path="/page" component={PageManage} />
                </div>
            </div>
        )
    }
}

export default App
