"use strict";
import React from 'react';
import _ from 'lodash';
import {assets} from 'react/util';
import Script from 'react/utils/Script';

export default class Layout extends React.Component {
    render() {
        var component;
        if (typeof window !== 'object') {
            component = <html>
                <head>
                    <meta charSet='utf-8'/>
                    <meta content='IE=10' httpEquiv='X-UA-Compatible'/>
                    <meta content='width=device-width, initial-scale=1.0' name='viewport'/>
                    <title>{this.props.title}</title>
                    <link href={assets('css/styles.css')} media='all' rel='stylesheet'/>
                    <script src={assets('js/require.js')} type='text/javascript'></script>
                    <script src={assets('js/config/require.config.js')} type='text/javascript'></script>
                </head>
                <body>
                    {this.props.children}
                </body>
            </html>;
        } else {
            component = <body>
                {this.props.children}
            </body>;
        }

        return component;
    }
}
