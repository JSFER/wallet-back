import ApiService from '@src/utils/ApiService'
import noop from 'lodash/noop'

const App = {
    state: {
        hasLogin: false,
        username: '',
        userId: 0
    },
    reducers: {
        updateLoginStatus: (state, { hasLogin, userId, username }) => ({
            ...state,
            hasLogin,
            userId,
            username
        }),
    },
    effects: dispatch => ({
        async userLoginAction({ username, password, cb = noop }) {
            const res = await ApiService.post('/backend/login', { userName: username, password })

            if (res.code === 200) {
                dispatch({
                    type: 'App/updateLoginStatus',
                    payload: {
                        hasLogin: true,
                        userId: res.data.userId,
                        username: res.data.userName
                    },
                })

                cb()
            }
        },
    }),
}

export default App
