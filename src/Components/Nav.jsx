import React from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

import Home from './Home';
import Books from './Books';
import Cart from './Cart';
import logo from '../assets/images/shoppingcart-logo.png'
const Nav = () => {
    const quote = `Sell used books at reasonably low price`;
    return (
        <Router>
            <div>
                <nav className='Nav'>
                    <div className="logo">

                        <img className="rineria" src={logo} alt="logo" />
                        <span>{quote}</span>
                    </div>
                    <ul>
                        <li>
                            <NavLink
                                exact to="/"
                                activeStyle={{
                                    fontWeight: "bold",
                                }}
                            >Home</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/Books"
                                activeStyle={{
                                    fontWeight: "bold",
                                }}
                            >Books</NavLink>
                        </li>
                        <li>
                        <NavLink
                                to="/Cart"
                                activeStyle={{
                                    fontWeight: "bold",
                                }}
                            >Cart</NavLink>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/Books" component={Books} />
                    <Route path="/Cart" component={Cart} />
                </Switch>
            </div>
        </Router>
    );
}

export default Nav;