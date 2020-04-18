import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/app-component';

const reactRoot = document.querySelector('#react-root');
ReactDOM.render(React.createElement(App), reactRoot);
