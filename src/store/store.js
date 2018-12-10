import { init } from '@rematch/core'
import App from '@src/models/App'
import Currency from '@src/models/Currency'
import Client from '@src/models/Client'

const store = init({
    models: {
        App,
        Currency,
        Client
    },
})

export default store