import React, { useState } from 'react';

const Cart = () => {

    const [cartList, setCartList] = useState([]);
    const renderEmptyText = () => {
        return (
            <div className='cart-empty-text'>
                <p>{`Your shopping cart appears to be empty.`}</p>
            </div>
        );
    }
    const renderCart = () => {
        return (
            <div className='Cart'>
                <h1>Shopping Cart</h1>
                <div className="shoppping-cart-wrapper">
                    <div className="shopping-cart-list"></div>
                    <div className="cart-btn-wrapper">
                        <button className="btn-cancel">Cancel</button>
                        <button className="btn-payment">Pay</button>
                    </div>
                </div>
            </div>
        );

    }
    return (
        <div>
            { cartList.length != 0 ? renderCart  : renderEmptyText }
        </div>
    );
}

export default Cart;