"use strict";
import React from 'react';

export default class LayoutWithSidebar extends React.Component {
    render() {
        return <div id='wrapper'>
            {this.props.header}
            {this.props.sidebar}
            <section id='main'>
                <div id='main-hidder'>{this.props.mainHider}</div>
                <div className='registration-container'>{this.props.children}</div>
            </section>
            {this.props.footer}
        </div>
    }
}
