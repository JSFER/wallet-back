import { init } from '@rematch/core'
import App from '@src/models/App'

export const store = init({
    models: {
        App,
    },
})