import React from 'react';
import ReactDOM from 'react-dom';
import Inner from 'react/inner';

alert(1)

const inner = React.createElement(Inner, {b1: 'new b-1'}, null)
alert(2)
ReactDOM.render(inner, document.getElementById('root'))
alert(3)
