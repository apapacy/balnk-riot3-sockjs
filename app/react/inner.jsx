"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from 'react/Layout'

export class Inner extends React.Component {
  constructor(props){
    super(props);
    console.log('555555555555555555555555555')
    console.log(props)
  }
  render() {
    return (
      <Layout {...this.props}>
      <div id='root'>
      {JSON.stringify(this.props)}
      next++++++++++*********{this.props.p1}{this.props.b}8888888888
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
 'описание1': {"это руccкий текст":1, b:2},
 'описание2': {a:3, b:4},
}

export default Inner
// export default connect(mapStateToProp)(Component);
