"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from 'react/Layout'

export class Inner extends React.Component {
  render() {
    return (
      <Layout {...this.props}>
      <div id='root'>
      next++++++++++*********{this.props.p1}
      </div>
      </Layout>
    )
  }
}

Inner.defaultProps = {
  p1: 'second-----------',
  mainScript: 'test.js'
}

Inner.description = 'Описание для вывдоа в списке компонентов'
Inner.queryString = {
 'описание1': {"это руччкий текст":1, b:2},
 'описание2': {a:3, b:4},
}

export default Inner
// export default connect(mapStateToProp)(Component);
