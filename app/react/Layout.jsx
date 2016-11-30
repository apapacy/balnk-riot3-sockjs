"use strict";
import React from 'react';
import _ from 'lodash';
import {assets} from 'react/util';

export default class Layout extends React.Component {
    render() {
        return (
            <html>
                <head>
                    <meta charSet='utf-8'/>
                    <meta content='IE=10' httpEquiv='X-UA-Compatible'/>
                    <meta content='width=device-width, initial-scale=1.0' name='viewport'/>
                    <title></title>
                    <link href={assets('css/slick.css')} media='all' rel='stylesheet'/>
                    <link href={assets('css/slick-theme.css')} media='all' rel='stylesheet'/>
                    <link href={assets('css/styles.css')} media='all' rel='stylesheet'/>
                    <script src={assets('js/require.js')} data-main={assets('js/main.js')} type='text/javascript'></script>
                    <script src={assets('js/config/require.config.js')} type='text/javascript'></script>
                </head>
                <body>
                    {this.props.children}
                    <script async src='http://localhost:3000/browser-sync/browser-sync-client.js?v=2.18.2'></script>
                    <script async src={this.props.mainScript}></script>
                </body>
            </html>
        )
    }
}
