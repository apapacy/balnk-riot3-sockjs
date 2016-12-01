"use strict";
import React from 'react';
import _ from 'lodash';

export class If extends React.Component {
  render() {
    if (this.props.if) {
      return this.props.children;
    } else {
      return false;
    }
  }
}

If.defaultProps = {
}

export default If
