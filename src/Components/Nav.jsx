import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './Home';
import Books from './Books';
import Cart from './Cart';
import About from './About';
const Nav = () => {
    return (
        <Router>
            <div>
                <nav className='Nav'>
                    <ul>
                        <li>
                            <Link to="/" active>Home</Link>
                        </li>
                        <li>
                            <Link to="/Books">Books</Link>
                        </li>
                        <li>
                            <Link to="/Cart">Cart</Link>
                        </li>
                        <li>
                            <Link to="/About">About</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/Books" component={Books} />
                    <Route path="/Cart" component={Cart} />
                    <Route path="/About" component={About} />
                </Switch>
            </div>
        </Router>
    );
}

export default Nav;