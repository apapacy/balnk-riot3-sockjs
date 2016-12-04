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
      <div onClick={this.onClick}>
      next++++++++++*********{this.props.p1}{this.props.b1}8888888888
      </div>
      </Layout>
    )
  }
  onClick(){
    alert('click')
  }
}

Inner.defaultProps = {
  p1: 'second-----------',
  footerScript: 'markup/index',
}

Inner.markup = {
  description: 'Описание для вывдоа в списке компонентов',
  queryString: {
   'описание1': {"это руccкий текст":1, b:2},
   'описание2': {a:3, b:4},
  }
}

export default Inner
