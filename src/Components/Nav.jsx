import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './Home';
import Books from './Books';
import Cart from './Cart';
import logo from '../assets/images/shoppingcart-logo.png'
const Nav = () => {
    const quote = `Sell used books in a low price`;
    return (
        <Router>
            <div>
                <nav className='Nav'>
                    <div className="logo">
                        
                        <img src={logo} alt="logo" />
                        <span>{quote}</span>
                    </div>
                    <ul>
                        <li>
                            <Link to="/" active="true">Home</Link>
                        </li>
                        <li>
                            <Link to="/Books">Books</Link>
                        </li>
                        <li>
                            <Link to="/Cart">Cart</Link>
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