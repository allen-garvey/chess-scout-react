import React from 'react';
import css from './header.module.scss';
import { Link } from 'react-router-dom';

const Header = () => 
    <div className={css.container}>
        <h1 className={css.title}>
            <Link to="/">Chess Scout</Link>
        </h1>
    </div>;

export default Header;
