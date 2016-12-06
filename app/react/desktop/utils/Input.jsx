"use strict";
import React from 'react';
import {createStore} from 'redux'
import {Provider} from 'react-redux'

export default class Input extends React.Component {
    render() {
        return <div className={`form__field ${this.props.class}`}>
            <input type={this.props.type || 'text'} id={this.props.id} required={true} value={this.props.source} onKeyUp={::this.onChange}/>
            <label htmlFor={this.props.id}>{this.props.placeholder}</label>
            <span className='form__caret'></span>
            <div className="form-error">{this.props.error}</div>
        </div>;
    }
    onChange(event) {
        alert('keyup')
    }
}
