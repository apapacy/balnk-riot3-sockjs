"use strict";
import React from 'react';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {connect} from 'react-redux'
import * as pageActions from '../../actions/PageActions';
import * as userActions from '../../actions/UserActions';
import * as accountRegistrationActions from '../../actions/AccountRegistrationActions';

export default class Input extends React.Component {
    render() {
        console.log(this.props);
        return <div className={`form__field ${this.props.class}`}>
            <input
                type={this.props.type || 'text'}
                id={this.props.id}
                required={true}
                value={this.props.source}
                onChange={::this.onChange}
                ref={(input) => this.input = input}
            />
            <label htmlFor={this.props.id}>{this.props.placeholder}</label>
            <span className='form__caret'></span>
            <div className="form-error">{this.props.error}</div>
        </div>;
    }
    onChange(event) {
        this.props.inputValueChanged(this.props.field, this.input.value);
    }
}
