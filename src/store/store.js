import { init } from '@rematch/core'
import App from '@src/models/App'
import Currency from '@src/models/Currency'
import Client from '@src/models/Client'
import Agent from '@src/models/Agent'
import Variety from '@src/models/Variety'
import Template from '@src/models/Template'

import Query from '@src/models/Transaction/Query'
import Hold from '@src/models/Transaction/Hold'
import Entrust from '@src/models/Transaction/Entrust'
import Historyentrust from '@src/models/Transaction/Historyentrust'
import Historyhold from '@src/models/Transaction/Historyhold'
import Historydeal from '@src/models/Transaction/Historydeal'

import History from '@src/models/Funding/history'
import InAndout from '@src/models/Funding/inAndout'
import NAndOutHistory from '@src/models/Funding/nAndOutHistory'

const store = init({
    models: {
        App,
        Currency,
        Client,
        Agent,
        Variety,
        Template,
        
        Query,
        Hold,
        Entrust,
        Historyentrust,
        Historyhold,
        Historydeal,

        History,
        InAndout,
        NAndOutHistory
    },
})

export default store