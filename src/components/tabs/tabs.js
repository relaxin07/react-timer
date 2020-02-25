import React from 'react';
import {NavLink} from 'react-router-dom';
import './tabs.css';

const MyTabs = () => {

    return (
        <div>
            <ul className="top-links">
                <li className="top-links__li">
                    <NavLink exact to="/" className="top-links__link" activeClassName="active">Tasks log</NavLink>
                </li>
                <li className="top-links__li">
                    <NavLink to="/chart-page" className="top-links__link" activeClassName="active">Tasks chart</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default MyTabs;