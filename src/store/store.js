import { init } from '@rematch/core'
import App from '@src/models/App'
import Currency from '@src/models/Currency'

export const store = init({
    models: {
        App,
        Currency,
    },
})