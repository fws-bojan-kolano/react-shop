import { useState, useRef, useContext } from "react";
import { CartContext } from "../cart/cart-context";

export default function SingleProduct({id, name, src, price}) {
    const [amount, setAmount] = useState(1);
    const inputAmount = useRef();
    const cartContext = useContext(CartContext);

    const handleIncrement = () => {// Amount Increment
        setAmount(prevAmount => prevAmount + 1);
    }

    const handleDecrement = () => {// Amount Decrement
        if(amount > 1) {
            setAmount(prevAmount => prevAmount - 1);
        }
    }

    const handleAmountChange = (event) => {// Change amount
        const value = parseInt(event.target.value);
        if(!isNaN(value) && value >= 1) {
            setAmount(value);
        }
    }

    return (
        <>
            <li className='user-product-listing__item' key={id}>
                <p className='user-product-listing__item-id'>ID: {id}</p>
                <p className='user-product-listing__item-name'>{name}</p>
                <img className='user-product-listing__item-image' src={src} />
                <p className='user-product-listing__item-price'>Price: ${price}</p>
                <div className="user-product-listing__input-box">
                    <button className="dec" onClick={handleDecrement}>-</button>
                    <input type="number" className="amount" min="1" value={amount} ref={inputAmount} onChange={handleAmountChange} />
                    <button className="inc" onClick={handleIncrement}>+</button>
                </div>
                <button className="add-to-cart" onClick={() => cartContext.addItemToCart(id, amount)}>Add to cart</button>
            </li>
        </>
    )
}