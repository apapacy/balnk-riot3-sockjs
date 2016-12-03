"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from 'react/Layout'

export class Inner extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <Layout {...this.props}>
      <div data-reactroot="" >
      next++++++++++*********{this.props.p1}{this.props.b1}8888888888
      </div>
      </Layout>
    )
  }
}

Inner.defaultProps = {
  p1: 'second-----------',
  footerScript: 'markup/index'
}

Inner.description = 'Описание для вывдоа в списке компонентов'
Inner.queryString = {
 'описание1': {"это руccкий текст":1, b:2},
 'описание2': {a:3, b:4},
}

export default Inner
// export default connect(mapStateToProp)(Component);
