import React, { useEffect, useState } from 'react';

const Cart = ({ cartList, setCartList }) => {
    //sub components
    const [total, setTotal] = useState(0.00);
    const clearCartList = () => setCartList([]);
    const RenderEmptyText = () => {
        return <h2 className='cart-empty-text'>Your shopping cart appears to be empty.</h2>
    }
    useEffect(() => {
        let tempTotal = total
        cartList.forEach((item) => {
            tempTotal += item.price;
        })
        setTotal(tempTotal);
    }, [cartList])
    const RenderCart = () => {
        return (
            <div className='Cart'>
                <h1>Shopping Cart</h1>
                <div className="shopping-cart-wrapper">
                    <div className="shopping-cart-list">
                        <div id="cart-table-header" className="shopping-cart-item">
                            <span>Book title and author</span>
                            <span>Book cost</span>
                        </div>
                        {cartList.map((item) => {
                            return (
                                <div className="shopping-cart-item">
                                    <span className="shopping-item-book">{item.title} by | {item.author}</span>
                                    <span className="shopping-item-cost">$ {item.price}</span>
                                </div>
                            )
                        })}
                        <div id="total" className="shopping-cart-item">
                            <span>Total: ${total}</span>
                        </div>
                    </div>
                    <div className="cart-btn-wrapper">
                        <button onClick={() => clearCartList()} className="btn-cancel">Clear All</button>
                        <button className="btn-payment">
                            <i class="fas fa-dollar-sign"></i>
                            <span className="add-to-cart-text"> Pay books</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div>
            { cartList.length !== 0 ? <RenderCart /> : <RenderEmptyText />}
        </div>
    );
}


export default Cart;