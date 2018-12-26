import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'

const Agent = {
    state: {
        agents: [],
    },
    reducers: {
        updateAgent: (state, { agents }) => {
            const nState = cloneDeep(state)

            nState.agents = agents.map(c => ({ key: c.id, ...c }))

            return nState
        },
    },
    effects: dispatch => ({
        async fetchAgentAsync({ callback }) {
            const res = await ApiService.get(`/api/base/clientAgent/all`)

            if (res.code === 200) {
                dispatch({
                    type: 'Agent/updateAgent',
                    payload: {
                        agents: res.data,
                    },
                })
                callback && callback(res.data)
            }
        },
        async addGroupAsync({ params, callback }) {
            const res = await ApiService.post(`/api/clientGroup/add`, params)

            if (res.code === 200) {
                callback && callback()
            }
        },
        async deleteGroupAsync({ id, callback }) {
            const res = await ApiService.delete(`/api/clientGroup/delete/${id}`)

            if (res.code === 200) {
                callback && callback()
            }
        },
        async updateGroupAsync({ id, params, callback }) {
            const res = await ApiService.put(`/api/clientGroup/update/${id}`, params)

            if (res.code === 200) {
                callback && callback()
            }
        },
        async addAgentAsync({ params, callback }) {
            const res = await ApiService.post(`/api/clientAgent/add`, params)

            if (res.code === 200) {
                callback && callback()
            }
        },
        async deleteAgentAsync({ id, callback }) {
            const res = await ApiService.delete(`/api/clientAgent/delete/${id}`)

            if (res.code === 200) {
                callback && callback()
            }
        },
        async updateAgentAsync({ id, params, callback }) {
            const res = await ApiService.put(`/api/clientAgent/update/${id}`, params)

            if (res.code === 200) {
                callback && callback()
            }
        },
    }),
}

export default Agent
