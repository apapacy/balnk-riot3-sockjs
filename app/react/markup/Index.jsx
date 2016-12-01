"use strict";
import React from 'react';
import ReactDOM from 'react-dom';

export class Index extends React.Component {
    constructor(...props) {
        super(...props);
        console.log(this.props)
    }
    render() {
        return (
            <ul>
                {this.props.components && this.props.components.map((item) => <li key={item.name}>
                    <a href={'/' + item.name}>{item.name}  {item.description}</a>
                </li>)}
            </ul>
        )
    }
}

Index.defaultProps = {}

export default Index
// export default connect(mapStateToProp)(Component);
