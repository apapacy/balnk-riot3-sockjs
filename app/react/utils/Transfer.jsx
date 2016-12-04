"use strict";
import React from 'react';

export class Transfer extends React.Component {
    render() {
        const innerHtml = `
          requirejs(['react', 'react-dom', '${this.props.componentPath}'], function(React, ReactDOM, Component){
            if (typeof Component.default === 'function') {
              Component = Component.default;
            }
            var props = ${this.props.componentProperties};
            const component = React.createElement(Component, props, null)
            ReactDOM.render(component, document.getElementById('layoutWrapper'))
          });
        `;
        return React.createElement('script', {
            type: 'application/javascript',
            dangerouslySetInnerHTML: {
                __html: innerHtml
            }
        });
    }
}

export default Transfer
