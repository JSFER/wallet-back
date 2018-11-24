import { init } from '@rematch/core'
import App from '@src/models/App'

const store = init({
    models: {
        App,
    },
})

export default store
