"use strict";
import React from 'react';

export class Transfer extends React.Component {
    render() {
        const innerHtml = `
          requirejs(
            ['react', 'react-dom', 'redux', 'react-redux', 'react/store/configureStore', '${this.props.componentPath}'],
            function(React, ReactDOM, Redux, ReactRedux, Store, Component) {
            if (typeof Component.default === 'function') {
              Component = Component.default;
            }
            var props = ${this.props.componentProperties};
            const store = Store.default();
            props.store = store;
            const component = React.createElement(Component, props, null);
            const provider = React.createElement(ReactRedux.Provider, {store}, component);
            ReactDOM.render(provider, document.getElementById('layoutWrapper'));
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
