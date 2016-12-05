"use strict";
import React from 'react';
import	{bindActionCreators}	from	'redux'
import	{connect}	from	'react-redux'
import LayoutWithSidebar from '../LayoutWithSidebar';
import Sidebar from '../blocks/Sidebar';
import Header from '../blocks/Header';
import	*	as	pageActions	from	'../../actions/PageActions'

class AccountRegistration extends React.Component {
    render() {
        const sidebar = React.createElement(Sidebar, this.props);
        const header = React.createElement(Header, this.props);
        return <LayoutWithSidebar {...{...this.props, header}} >
            <h3>{this.props.page.year}</h3>
            <form className='form' action={77} onSubmit={::this.onSubmit}>
                <div/>
                <div className='form__note'>
                    Нажимая кнопку &laquo;Зарегистрироваться&raquo;, я даю согласие на
                    <a href={123}> обработку моих персональных данных </a>
                    и принимаю
                    <a href={456}> Правила сервиса</a>
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
    onSubmit(event) {
      event.preventDefault();
      console.log(this.props)
	    this.props.pageActions.setYear(1 + this.props.page.year);
    }
}

AccountRegistration.defaulpProps = {
};

AccountRegistration.markup = {
  description: 'Регистрация пользователя (десктопная версия)',
};

function	mapStateToProps(state)	{
		return	{
				user:	state.user,
				page:	state.page
		}
}

function	mapDispatchToProps(dispatch)	{
		return	{
				pageActions:	bindActionCreators(pageActions,	dispatch)
		}
}

export	default	connect(mapStateToProps,	mapDispatchToProps)(AccountRegistration)
