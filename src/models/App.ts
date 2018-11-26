import ApiService from '@src/utils/ApiService'
import noop from 'lodash/noop'
import { Dispatch } from '@src/store/store'

interface IAppState {
    hasLogin: boolean
    username: string
}

const App = {
    state: {
        hasLogin: false,
        username: undefined,
    },
    reducers: {
        updateLoginStatus: (state: IAppState, { hasLogin, username }: IAppState) => ({
            ...state,
            hasLogin,
            username,
        }),
    },
    effects: ( dispatch: Dispatch) => ({
        async userLoginAction({ username, password, cb = noop }) {
            const res = await ApiService.post('/backend/login', { userName: username, password })

            if (res.code === 200) {
                dispatch({
                    type: 'App/updateLoginStatus',
                    payload: {
                        hasLogin: true,
                    },
                })

                cb()
            }
        },
    }),
}

export default App
