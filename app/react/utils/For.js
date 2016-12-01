"use strict";
import React from 'react';
import _ from 'lodash';

export function For(collection, Component) {
  return collection.map(item => <Component.type {...Component.props} item={item}>{Component.props.children}</Component.type>);
}


export default For;
