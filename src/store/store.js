import { init } from '@rematch/core'
import App from '@src/models/App'
import Currency from '@src/models/Currency'
import Client from '@src/models/Client'
import Agent from '@src/models/Agent'

const store = init({
    models: {
        App,
        Currency,
        Client,
        Agent
    },
})

export default store