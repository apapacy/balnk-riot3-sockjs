"use strict";
import React from 'react';

export default class Script extends React.Component {
    render() {
        const script = React.createElement('script', {
            type: 'application/javascript',
            dangerouslySetInnerHTML: {
                __html: this.props.children.join('')
            }
        });
        return script;
    }
}
