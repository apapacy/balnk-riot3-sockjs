"use strict";
import React from 'react';

export class If extends React.Component {
  render() {
    if (this.props.if) {
      return this.props.children;
    } else {
      return false;
    }
  }
}

export default If
