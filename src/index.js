import React from 'react';
import ReactDOM from 'react-dom';
import App from '@src/container/App/App';
import registerServiceWorker from './registerServiceWorker';

import './style/common.css'

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
