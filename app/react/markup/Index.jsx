"use strict";
import React from 'react';
import If from 'react/utils/If';

export class Index extends React.Component {
    render() {
        return (
            <ul>
                {this.props.components && this.props.components.map((item) => <If if={item.description}>
                    <li key={item.path}>
                        <a href={'/' + item.path}>{item.path} {item.description}</a>
                    </li>
                </If>)}
            </ul>
        )
    }
}

Index.defaultProps = {}

export default Index
// export default connect(mapStateToProp)(Component);
