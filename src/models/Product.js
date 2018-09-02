import ApiService from '@src/utils/ApiService'

const Product = {
    state: {
        products: [],
    },
    reducers: {
        updateProducts: (state, payload) => ({
            ...state,
            products: payload,
        }),
    },
    effects: dispatch => ({
        async addProductAction({ params, cb }) {
            const res = await ApiService.post('/api/product/save', params)

            if (res.code === 0) {
                cb()
            }
        },
        async queryProductsAction({ params }) {
            const res = await ApiService.get('/api/product/query', params)

            if (res.code === 0) {
                dispatch({
                    type: 'Product/updateProducts',
                    payload: res.data,
                })
            }
        },
    }),
}

export default Product
