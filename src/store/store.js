import { init } from '@rematch/core'
import App from '@src/models/App'
import Currency from '@src/models/Currency'
import Client from '@src/models/Client'
import Agent from '@src/models/Agent'
import Variety from '@src/models/Variety'

import Query from '@src/models/Transacation/Query'
import Hold from '@src/models/Transacation/Hold'
import Entrust from '@src/models/Transacation/Entrust'

const store = init({
    models: {
        App,
        Currency,
        Client,
        Agent,
        Variety,
        
        Query,
        Hold,
        Entrust
    },
})

export default store