"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

export class Div extends React.Component {
  constructor(...props){
    super(...props);
    props.p1='first';
  }
  render() {
    return (
      <div>
      New++++++++++*********{this.props.p1}
      </div>
    )
  }
}

Div.defaultProps = {
  p1: 'second'
}

export default Div
// export default connect(mapStateToProp)(Component);
