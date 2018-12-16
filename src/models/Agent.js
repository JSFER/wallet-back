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
        async fetchAgentAsync({ callback }){
            const res = await ApiService.get(`/api/base/clientAgent/all`)

            if( res.code === 200){
                dispatch({
                    type: 'Agent/updateAgent',
                    payload: {
                        agents: res.data,
                    }
                })
                callback && callback(res.data)
            }
        }
    })
}

export default Agent