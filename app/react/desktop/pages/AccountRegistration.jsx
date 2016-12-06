"use strict";
import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import LayoutWithSidebar from '../LayoutWithSidebar';
import Sidebar from '../blocks/Sidebar';
import Header from '../blocks/Header';
import Input from '../utils/Input';
import * as pageActions from '../../actions/PageActions';
import * as userActions from '../../actions/UserActions';
import * as accountRegistrationActions from '../../actions/AccountRegistrationActions';

class AccountRegistration extends React.Component {
    render() {
        const sidebar = React.createElement(Sidebar, this.props);
        const header = React.createElement(Header, this.props);
        return <LayoutWithSidebar {...{...this.props, header}}>
            <h3>{this.props.page.year}</h3>
            <form className='form' action={77} onSubmit={::this.onSubmit}>
                {this.props.fields.map((field, i) => <Input {...field} key={i} inputValueChanged={::this.inputValueChanged}/>)}
                <div className='form__note'>
                    Нажимая кнопку &laquo;Зарегистрироваться&raquo;, я даю согласие на
                    <a href={123}>
                        обработку моих персональных данных
                    </a>
                    и принимаю
                    <a href={456}>
                        Правила сервиса
                    </a>
                </div>
                <button className='form__button' type='submit'>
                    <span>{789}</span>
                </button>
            </form>
            <div className='login-holder'>
                <a href={123}>{456}</a>
            </div>
        </LayoutWithSidebar>
    }
    inputValueChanged(field, value) {
        this.props.accountRegistrationActions.inputValueChanged(field, value);
    }
    onSubmit(event) {
        event.preventDefault();
        this.props.pageActions.setYear(1 + this.props.page.year);
    }
}

AccountRegistration.defaultProps = {
    title: `registration.title_${'test'}`,
    formActionUrl: '#',
    fields: [
        {
            id: 'register_phone',
            type: 'text',
            placeholder: 'Мобильный телефон',
            field: 'phone'
        }, {
            id: 'register_email',
            type: 'text',
            placeholder: 'E-mail',
            field: 'email',
            //onchange: emailChanged
        }, {
            id: 'register_password',
            type: 'password',
            placeholder: 'Придумайте пароль',
            field: 'password'
        }, {
            id: 'register_password_repeat',
            type: 'password',
            placeholder: 'Повторите пароль',
            field: 'passwordConfirm'
        }
    ],
    personalDataUrl: '#',
    serviceRulesUrl: '#',
    loginUrl: '/user/login',
    loginText: 'Войти в кабинет',
    buttonText: 'Зарегистрироваться'
};

AccountRegistration.markup = {
    description: 'Регистрация пользователя (десктопная версия)'
};

AccountRegistration.propTypes = {
    accountRegistration: React.PropTypes.shape({
      phone: React.PropTypes.number,
    })
}

function mapStateToProps(state) {
    return {
        user: state.user,
        page: state.page,
        accountRegistration: state.accountRegistration,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActions, dispatch),
        accountRegistrationActions: bindActionCreators(accountRegistrationActions, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountRegistration)
