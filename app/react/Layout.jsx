"use strict";
import React from 'react';
import _ from 'lodash';
import {assets} from 'react/util';
import Html from 'react/Html'
import Script from 'react/utils/Script';

export default class Layout extends React.Component {
    render() {
        return (
            <Html {...this.props}>
                    {this.props.children}
                    <div id='root'>root</div>
                    <script async src='http://localhost:3000/browser-sync/browser-sync-client.js?v=2.18.2'></script>
                    <Script>require(["{this.props.footerScript}"]);</Script>
            </Html>
        )
    }
}
