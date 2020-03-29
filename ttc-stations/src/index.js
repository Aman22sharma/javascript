import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
