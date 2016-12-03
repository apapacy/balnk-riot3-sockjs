"use strict";
import React from 'react';
import _ from 'lodash';
import {assets} from 'react/util';
import Html from 'react/Html'
import Script from 'react/utils/Script';
import Transfer from 'react/utils/Transfer';

export default class Layout extends React.Component {
    render() {
    var component;
    if (typeof window !== 'object') {
        component =             <Html {...this.props}>
                            <div id='root'>{this.props.children}</div>
                            <div id='root1'/>
                            <script async src='http://localhost:3000/browser-sync/browser-sync-client.js?v=2.18.2'></script>
                            <Script>require(["{this.props.footerScript}"]);</Script>
                            <Transfer {...this.props}/>
                    </Html>

    } else {
        component =                     this.props.children

    }

        return component;
    }
}
