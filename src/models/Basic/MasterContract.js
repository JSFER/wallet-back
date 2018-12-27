import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'

export default {
    state: {
        mastercontracts: [],
        pageNo: 0,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updateMasterContracts: (state, { mastercontracts, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.mastercontracts = mastercontracts.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchMasterContractsAsync({ pageNo }, rootState) {
            const {
                MasterContract: { pageSize },
            } = rootState
            const res = await ApiService.get(`/api/contract/query/page?pageIndex=${pageNo}&pageSize=${pageSize}&type=1`)

            if (res.code === 200) {
                dispatch({
                    type: 'MasterContract/updateMasterContracts',
                    payload: {
                        mastercontracts: res.data.data,
                        total: res.data.total,
                        pageNo,
                    },
                })
            }
        },
        // 添加
        async addMasterContractAsync({ params, callback }, rootState) {
            const {
                App: { userId },
            } = rootState
            const res = await ApiService.post('/api/contract/add', Object.assign(params, {mainContract: 1}))
            
            if (res.code === 200) {
                callback && callback()
            }
        },
        // 修改
        async updateMasterContractAsync({ id, params, callback }) {
            const res = await ApiService.put(`/api/contract/update/${id}`, params)

            if (res.code === 200) {
                callback && callback()
            }
        },
        // 获取详情
        async fetchMasterContractAsync({ id, callback }) {
            const res = await ApiService.get(`/api/contract/update/query/${id}`)

            if (res.code === 200) {
                callback && callback(res.data)
            }
        },
        // 删除
        async deleteMasterContractAsync({ id, callback }) {
            const res = await ApiService.delete(`/api/contract/main/delete/${id}`)

            if (res.code === 200) {
                callback && callback()
            }
        },
    }),
}