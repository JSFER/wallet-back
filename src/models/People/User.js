import ApiService from '@src/utils/ApiService'
import _ from 'lodash'

const User = {
    state: {
        users: [],
        pageNo: 0,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updateUsers: (state, { users, total, pageNo }) => {
            const nState = _.cloneDeep(state)

            nState.users = users.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchUsersAsync({ pageNo = 0, params = {} }, rootState) {
            const {
                Client: { pageSize },
            } = rootState
            const res = await ApiService.get(`/api/user/query/page?pageIndex=${pageNo}&pageSize=${pageSize}`)
            if (res.code === 200) {
                dispatch({
                    type: 'User/updateUsers',
                    payload: {
                        users: res.data.data,
                        total: res.data.total,
                        pageNo,
                    },
                })
            }

        },
        async addUserAsync({ params, callback }, rootState) {
            const {
                App: { userId },
            } = rootState
            const res = await ApiService.post('/api/client/add', Object.assign(params, { userId }))

            if (res.code === 200) {
                callback && callback()
            }
        },
        async updateUserAsync({ id, params, callback }) {
            const res = await ApiService.put(`/api/client/update/${id}`, params)

            if (res.code === 200) {
                callback && callback()
            }
        },
    }),
}

export default User
