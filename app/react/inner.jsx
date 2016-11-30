"use strict";
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from 'react/Layout'

export class Inner extends React.Component {
  constructor(...props){
    super(...props);
    props.p1='first';
  }
  render() {
    return (
      <Layout>
      <div id='root'>
      next++++++++++*********{this.props.p1}
      </div>
      </Layout>
    )
  }
}

Inner.defaultProps = {
  p1: 'second'
}

export default Inner
// export default connect(mapStateToProp)(Component);
