import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'

export default {
    state: {
        Customers: [],
        pageNo: 0,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updateCustomers: (state, { Customers, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.Customers = Customers.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchCustomerAsync({ pageNo = 0, params = {} }, rootState) {
            const {
                Customer: { pageSize },
            } = rootState
            const { clientNo, startDate, endDate } = params
            const res = await ApiService.post(`/api/client/template/query?pageIndex=${pageNo}&pageSize=${pageSize}`, {
                clientNo,
                startDate,
                endDate
            })

            if (res.code === 200) {
                dispatch({
                    type: 'Customer/updateCustomers',
                    payload: {
                        Customers: res.data && res.data.data?res.data.data: res.data,
                        total: res.data.total,
                        pageNo,
                    },
                })
            }
        },
        // // 删除
        // async deleteCustomereAsync({ id, callback }) {
        //     const res = await ApiService.delete(`/api/contract/delete/${id}`)

        //     if (res.code === 200) {
        //         callback && callback()
        //     }
        // },

    }),
}