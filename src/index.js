import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import Routes from './Routes';

ReactDOM.render(Routes, document.getElementById('root'));
// ReactDOM.render(<SampleModal />, document.getElementById('root2'));
registerServiceWorker();
