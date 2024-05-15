import './cart.scss';
import { useContext } from 'react';
import { CartContext } from './cart-context';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const cartContext = useContext(CartContext);
    const navigate = useNavigate();

    const handleRedirectToCheckout = (event) => {// Go to checkout
        event.preventDefault();
        navigate('/page-checkout');
        window.location.reload();
    }

    let totalPrice = 0;
    if(cartContext.items !== '') {
        totalPrice = cartContext.items?.reduce(
            (acc, item) => acc + item.price * item.quantity, 0
        ).toFixed(2);
    } else {
        totalPrice = 0;
    }

    return (
        <div className="cart">
            {cartContext.items?.length === 0 && <p>Your Cart is empty.</p>}
            {cartContext.items?.length > 0 && (
                <>
                    <h2>Your Cart</h2>
                    <ul>
                        {cartContext.items.map(item => (
                            <li key={item.id}>
                                <span>{item.name} - ${item.price}</span>
                                <div className="cart-buttons">
                                    <button onClick={() => cartContext.updateItemQuantity(item.id, -1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => cartContext.updateItemQuantity(item.id, 1)}>+</button>
                                    <button className='remove' onClick={() => cartContext.removeItemFromCart(item.id)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-total">
                        <p>Total: ${totalPrice}</p>
                        <button onClick={handleRedirectToCheckout}>Go to Checkout</button>
                    </div>
                </>
            )}
        </div>
    );
}