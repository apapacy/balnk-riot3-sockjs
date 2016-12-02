import React from 'react';
import ReactDOM from 'react-dom';
import Inner from 'react/inner';

alert(1)

const inner = React.createElement(Inner, {b1: 'new b-1'}, null)
ReactDOM.render(inner, document.getElementsByTagName('body')[0])
