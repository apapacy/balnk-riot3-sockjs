"use strict";
import React from 'react';
import If from 'react/utils/If';
import For from 'react/utils/For';
import Layout from 'react/Layout';

export class Index extends React.Component {
    render() {
        return (
            <Layout {...this.props}>
                <ul>
                    {this.props.components.map(item => item.description && <li key={item.path}>
                        <a href={'/' + item.path}>{item.path} {item.description}</a>
                    </li> || <li onClick={this.liClick}>Not available</li>)}
                </ul>
            </Layout>
        )
    }
    liClick(event) {
        console.log(this)
        console.log(event)
    }
}

Index.defaultProps = {
    mainScript: '/dependencies/js/test/index'
}

export default Index
