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
            const res = await ApiService.post('/backend/login', { userName: username, password })

            if (res.rtnCode === 200) {
                dispatch({
                    type: 'App/updateLoginStatus',
                    payload: {
                        hasLogin: true,
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
