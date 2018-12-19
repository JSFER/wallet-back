import { init } from '@rematch/core'
import App from '@src/models/App'
import Currency from '@src/models/Currency'
import Client from '@src/models/Client'
import Agent from '@src/models/Agent'
import Variety from '@src/models/Variety'

import Query from '@src/models/Transacation/Query'

const store = init({
    models: {
        App,
        Currency,
        Client,
        Agent,
        Variety,
        Query
    },
})

export default store