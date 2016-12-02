"use strict";
import React from 'react';
import _ from 'lodash';

export class For extends React.Component {
  render() {
  const Tag = this.props.tag;
  const each = this.props.each;
  const components= [];
  for(let i = 0; i < each.length; i++) {
      let item = {...each[i]};
      let component = React.cloneElement(this.props.children, {...item}, this.props.children.children);
      components.push(React.cloneElement(this.props.children, {...item}, this.props.children.children));
  }
   return <Tag {...this.props}>{components}</Tag>
  }
}


export default For;
