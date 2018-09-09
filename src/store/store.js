import { init } from '@rematch/core'
import App from '@src/models/App'
import Product from '@src/models/Product'

const store = init({
    models: {
        App,
        Product,
    },
})

export default store
