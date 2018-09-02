import ApiService from '@src/utils/ApiService'

const Product = {
    state: {
        products: [],
        current: 1,
        size: 10,
        total: 0,
    },
    reducers: {
        updateProduct: (state, { products, total, current }) => ({
            ...state,
            products,
            total,
            current,
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
            const res = await ApiService.get('/api/product/query', { params })

            if (res.code === 0) {
                const { products, total, current } = res.data

                dispatch({
                    type: 'Product/updateProduct',
                    payload: {
                        products,
                        total,
                        current,
                    },
                })
            }
        },
    }),
}

export default Product
