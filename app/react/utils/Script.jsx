"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

export class Script extends React.Component {
  render() {
      return React.createElement('script', {
          dangerouslySetInnerHTML:{ __html: this.props.children.join(''),
          type: 'text/javascript',
        }
      });
  }
}

Script.defaultProps = {
}

export default Script
