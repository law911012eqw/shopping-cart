import React from 'react';

const Cart = () => {
    return (
        <div className='Cart'>
            <h1>Shopping Cart</h1>
            <div className="shoppping-cart-wrapper">
                <div className="shopping-cart-list"></div>
                <div className="cart-btns-wrapper">
                    <button className="btn-cancel">Cancel</button>
                    <button className="btn-payment">Pay</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;