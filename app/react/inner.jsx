"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './Layout'

export default class Inner extends React.Component {
  state = {
    state: 'states',
  }
  constructor(props){
    super(props);
  }
  render() {
    return (
      <Layout {...this.props}>
      <div onClick={this.onClick}>
      next++++++++++{this.state.state}*********{this.props.p1}{this.props.b1}8888888888
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
