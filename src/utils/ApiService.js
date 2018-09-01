import axios from 'axios'
import { notification } from 'antd'
import qs from 'qs'
import { HOST } from '@src/config'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(config => {
    const nConfig = config

    Object.assign(nConfig, {
        data: qs.stringify(config.data),
    })

    if (process.env.NODE_ENV === 'development') {
        nConfig.url = HOST + nConfig.url
    }

    return nConfig
})

axios.interceptors.response.use(
    res => {
        const { data } = res

        if (data.code !== 0) {
            notification.error({
                message: '请求失败',
                description: data.message,
            })
        }

        return data
    },
    () => {
        notification.error({
            message: '网络异常，请检查网络连接',
            description: '',
        })

        return {
            code: -1,
        }
    },
)

export default axios
