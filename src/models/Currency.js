import ApiService from '@src/utils/ApiService'
import cloneDeep from 'lodash/cloneDeep'

const Currency = {
    state: {
        currencies: [],
        pageNo: 0,
        pageSize: 10,
        total: 0,
    },
    reducers: {
        updateCurrencies: (state, { currencies, total, pageNo }) => {
            const nState = cloneDeep(state)

            nState.currencies = currencies.map(c => ({ key: c.id, ...c }))
            nState.total = total
            nState.pageNo = pageNo

            return nState
        },
    },
    effects: dispatch => ({
        async fetchCurrenciesAsync({ pageNo }, rootState) {
            const {
                Currency: { pageSize },
            } = rootState
            const res = await ApiService.get(`/api/currency/query/page?pageIndex=${pageNo}&pageSize=${pageSize}`)

            if (res.code === 200) {
                dispatch({
                    type: 'Currency/updateCurrencies',
                    payload: {
                        currencies: res.data.data,
                        total: res.data.total,
                        pageNo,
                    },
                })
            }
        },
        async addCurrencyAsync({ params, callback }, rootState) {
            const {
                App: { userId },
            } = rootState
            const res = await ApiService.post('/api/currency/add', Object.assign(params, { userId }))

            if (res.code === 200) {
                callback && callback()
            }
        },
    }),
}

export default Currency
