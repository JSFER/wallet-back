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
        Entrust
    },
})

export default store