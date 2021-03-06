import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';

import Home from './Home';
import Books from './Books';
import Cart from './Cart';
import logo from '../assets/images/shoppingcart-logo.png'
const Nav = () => {
    const [cartList, setCartList] = useState([]);

    //Reserved array of book objects for later
    const [books, setBooks] = useState([]);
    console.log('cart list: ' + cartList);
    console.log('books: ' + {books});
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
                                exact to="/shopping-cart/"
                                activeStyle={{
                                    fontWeight: "bold",
                                }}
                            >Home</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/shopping-cart/Books"
                                activeStyle={{
                                    fontWeight: "bold",
                                }}
                            >Books</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/shopping-cart/Cart"
                                activeStyle={{
                                    fontWeight: "bold",
                                }}
                            >Cart</NavLink>
                            <div
                                className="cart-num-notif"
                                style={
                                        cartList.length !== 0 ? { visibility: "visible" } : { visibility: "hidden" }
                                    }>
                                    { cartList.length !== 0 ? cartList.length : null } 
                            </div>
                        </li>
                    </ul>   
                </nav>

                <Switch>
                    <Route exact path="/shopping-cart/">
                        <Home />
                    </Route>
                    <Route exact path="/shopping-cart/Books">
                        <Books cartList={cartList} setCartList={setCartList} books={books} setBooks={setBooks} />
                    </Route>
                    <Route exact path="/shopping-cart/Cart">
                        <Cart cartList={cartList} setCartList={setCartList} />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default Nav;