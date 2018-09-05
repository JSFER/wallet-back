import ApiService from '@src/utils/ApiService'
import noop from 'lodash/noop'

const App = {
    state: {
        hasLogin: false,
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
        async userLoginAction({ username, password, cb = noop, errorCb = noop }) {
            const res = await ApiService.post('/api/user/login', { username, password })

            if (res.code === 0) {
                dispatch({
                    type: 'App/updateLoginStatus',
                    payload: {
                        hasLogin: true,
                        username,
                    },
                })

                cb()
            } else {
                errorCb()
            }
        },
    }),
}

export default App
