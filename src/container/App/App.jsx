import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// components
import Header from '@src/components/Header/Header'
import MenuBar from '@src/components/MenuBar/MenuBar'
import BreadcrumbCustom from '@src/components/Breadcrumb/Breadcrumb'

// pages
import Currency from '@src/container/Basic/Currency/Currency'
import Client from '@src/container/People/Client/Client'
import Agent from '@src/container/People/Agent/Agent'
import InsureMoney from '@src/container/Params/InsureMoney'
import VarietyInfo from '@src/container/Basic/VarietyInfo/VarietyInfo'
import Poundage from '@src/container/Params/Poundage'
// pages -- 交易查询
import Query from '@src/container/Transaction/Query/Query'
import Deal from '@src/container/Transaction/Deal/Deal'
import Entrust from '@src/container/Transaction/Entrust/Entrust'
import Hold from '@src/container/Transaction/Hold/Hold'
import Historydeal from '@src/container/Transaction/history-deal/history-deal'
import Historyentrust from '@src/container/Transaction/history-entrust/history-entrust'
import HistoryHold from '@src/container/Transaction/history-hold/history-hold'

// 资金
import History from '@src/container/Funding/history/history'
import InAndout from '@src/container/Funding/inAndout/inAndout'
import NAndOutHistory from '@src/container/Funding/nAndOutHistory/nAndOutHistory'

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
                    <Route exact path="/basic/varietyInfo" component={VarietyInfo} />
                    <Route exact path="/people/client" component={Client} />
                    <Route exact path="/people/agent" component={Agent} />
                    <Route exact path="/params/insureMoney" component={InsureMoney} />
                    <Route exact path="/params/poundage" component={Poundage} />

                    {/* 交易查询 */}
                    <Route exact path="/transaction/query" component={Query} />
                    {/* <Route exact path="/transaction/deal" component={Deal} /> */}
                    <Route exact path="/transaction/entrust" component={Entrust} />
                    <Route exact path="/transaction/hold" component={Hold} />
                    <Route exact path="/transaction/history-deal" component={Historydeal} />
                    <Route exact path="/transaction/history-entrust" component={Historyentrust} />
                    <Route exact path="/transaction/history-hold" component={HistoryHold} />

                    {/* 资金 */}
                    <Route exact path="/funding/inAndOut" component={InAndout} />
                    <Route exact path="/funding/nAndOutHistory" component={NAndOutHistory} />
                    <Route exact path="/funding/history" component={History} />
                </div>
            </div>
        )
    }
}

export default App
