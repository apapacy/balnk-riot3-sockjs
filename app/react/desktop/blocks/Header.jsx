"use strict";
import React from 'react';

export default class Header extends React.Component {
    render() {
        return <header id='header'>
            <a className='logo' href='#'>Finhub</a>
            <ul className='main-navigation'>
                <li className='main-navigation__item'>
                    <a className='main-navigation__credit' href='/register/borrower'>
                        <span className='main-navigation__text'>Кредит</span>
                    </a>
                </li>
                <li className='main-navigation__item'>
                    <a className='main-navigation__credit' href=''>
                        <span className='main-navigation__text'>Кредит</span>
                    </a>
                </li>
                <li className='main-navigation__item'>
                    <a className='main-navigation__wallet' href=''>
                        <span className='main-navigation__text'>Кошелек</span>
                    </a>
                </li>
                <li className='main-navigation__item'>
                    <a className='main-navigation__partner' href=''>
                        <span className='main-navigation__text'>Партнерка</span>
                    </a>
                </li>
                <li className='main-navigation__item'>
                    <a className='main-navigation__support' href=''>
                        <span className='main-navigation__text'>Поддержка</span>
                    </a>
                </li>
                <li className='main-navigation__item'>
                    <a className='main-navigation__notifications js-notifications-open' href='#'>
                        <span className='count'>2</span>
                    </a>
                </li>
                <li className='main-navigation__item'>
                    <a className='main-navigation__account' href='#'></a>
                </li>
            </ul>
        </header>
    }
}
