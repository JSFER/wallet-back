import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'

// store
import store from '@src/store/store'

// pages
import App from '@src/container/App/App'
import Login from '@src/container/Login/Login'

import '@src/style/common.css'
import registerServiceWorker from './registerServiceWorker'

const HomeRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            const {
                App: { hasLogin },
            } = store.getState()

            // 因为HomeRoute是非exact匹配，所以当路由重定向为/login后依然会渲染HomeRoute，防止重复渲染（待优化）
            if (props.location.pathname.indexOf('login') !== -1) {
                return null
            }

            return hasLogin ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/login',
                    }}
                />
            )
        }}
    />
)

const Root = () => (
    <Router basename="/admin">
        <div id="root">
            <HomeRoute path="/" component={App} />
            <Route exact path="/login" component={Login} />
        </div>
    </Router>
)

ReactDOM.render(
    <Provider store={store}>
        <Root />
    </Provider>,
    document.getElementById('root'),
)
registerServiceWorker()
