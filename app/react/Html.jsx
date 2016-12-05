"use strict";
import React from 'react';
import _ from 'lodash';
import {assets} from './util';
import Script from './utils/Script';
import Transfer from './utils/Transfer';


export default class Layout extends React.Component {
    render() {
        let component;
        if (typeof window !== 'object000')
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
                    <div id='layoutWrapper' dangerouslySetInnerHTML = {{ __html: this.props.componentHtml}}/>
                    <script async src='http://localhost:3000/browser-sync/browser-sync-client.js?v=2.18.2'></script>
                    <Script>
                        require(["{this.props.footerScript}"]);
                    </Script>
                    <Transfer {...this.props}/>
                </body>
            </html>;
        else
            component = this.props.children;
        return component;
    }
}
