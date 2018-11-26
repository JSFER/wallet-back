import { init } from '@rematch/core'
import App from '@src/models/App'

export const store = init({
    models: {
        App,
    },
})


export type Store = typeof store
export type Dispatch = typeof store.dispatch