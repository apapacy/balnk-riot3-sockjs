"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from 'react/Layout'

export class Inner extends React.Component {
  static description = 'Описание для вывдоа в списке компонентов'
  constructor(...props){
    super(...props);
    props.p1='first';
  }
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
  p1: 'second',
  mainScript: 'test.js'
}

export default Inner
// export default connect(mapStateToProp)(Component);
