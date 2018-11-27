import { init } from '@rematch/core'
import App from '@src/models/App'
import Currency from '@src/models/Currency'

const store = init({
    models: {
        App,
        Currency,
    },
})

export default store