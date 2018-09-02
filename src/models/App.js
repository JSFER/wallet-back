import ApiService from '@src/utils/ApiService'
import noop from 'lodash/noop'

const App = {
    state: {
        hasLogin: true,
        username: undefined,
    },
    reducers: {
        updateLoginStatus: (state, { hasLogin, username }) => ({
            ...state,
            hasLogin,
            username,
        }),
    },
    effects: dispatch => ({
        async userLoginAction({ username, password, cb = noop }) {
            const res = await ApiService.post('/api/login', { username, password })

            if (res.code === 0) {
                dispatch({
                    type: 'App/updateLoginStatus',
                    payload: {
                        hasLogin: true,
                        username,
                    },
                })

                cb()
            }
        },
    }),
}

export default App
