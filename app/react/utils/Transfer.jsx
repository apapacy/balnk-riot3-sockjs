"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export class Script extends React.Component {
  render() {
  const innerHtml = `
  alert(0)
  requirejs(['react', 'react-dom', '${this.props.componentUrl}'], function(React, ReactDOM, Component){
  if (typeof Component.default === 'function') {
    Component = Component.default;
  }
  alert(1)
  const component = React.createElement(Component, JSON.stringify(this.props), null)
  alert(2)
  ReactDOM.render(component, document.getElementById('root'))
  alert(3)
  });
  `;
      return React.createElement('script', {dangerouslySetInnerHTML:{ __html: innerHtml}});
  }
}

Script.defaultProps = {
}

export default Script
