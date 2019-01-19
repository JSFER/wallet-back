import { init } from '@rematch/core'
import App from '@src/models/App'
import Currency from '@src/models/Currency'
import Client from '@src/models/Client'
import User from '@src/models/People/User'

import Agent from '@src/models/Agent'
import Variety from '@src/models/Variety'
import Template from '@src/models/Template'
import MarketInfo from '@src/models/Basic/MarketInfo'
import ContractInfo from '@src/models/Basic/ContractInfo'
import MasterContract from '@src/models/Basic/MasterContract'

import Query from '@src/models/Transaction/Query'
import Hold from '@src/models/Transaction/Hold'
import Entrust from '@src/models/Transaction/Entrust'
import Historyentrust from '@src/models/Transaction/Historyentrust'
import Historyhold from '@src/models/Transaction/Historyhold'
import Historydeal from '@src/models/Transaction/Historydeal'

import History from '@src/models/Funding/history'
import InAndout from '@src/models/Funding/inAndout'
import NAndOutHistory from '@src/models/Funding/nAndOutHistory'
import CreditList from '@src/models/Funding/creditList'
import HistoryCreditList from '@src/models/Funding/historyCreditList'

const store = init({
    models: {
        App,
        Currency,
        Client,
        Agent,
        Variety,
        Template,
        MarketInfo,
        ContractInfo,
        MasterContract,
        
        User,
        Query,
        Hold,
        Entrust,
        Historyentrust,
        Historyhold,
        Historydeal,

        History,
        InAndout,
        NAndOutHistory,
        CreditList,
        HistoryCreditList
    },
})

export default store