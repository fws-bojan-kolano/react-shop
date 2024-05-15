import './header.scss';
import {useState, useEffect, useContext} from 'react';
import Cart from '../cart/Cart';
import { CartContext } from '../cart/cart-context';
import { useNavigate } from 'react-router-dom';

export default function Header({user}) {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [isCheckoutPage, setIsCheckoutPage] = useState(false);
    const cartContext = useContext(CartContext);

    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [user])

    useEffect(() => {// Check if checkout or thank you page is loaded
        const currentLocation = window.location.pathname;
        if(currentLocation === '/page-checkout' || currentLocation === '/page-thank-you') {
            setIsCheckoutPage(true);
        } else {
            setIsCheckoutPage(false);
        }
    },[])

    const handleLogOut = () => {// Log Out
        setLoggedIn(false);
        localStorage.removeItem('loggedInUser');
        navigate('/');
        window.location.reload();
    }

    const handleToggleCart = () => {// Toggle cart
        setShowCart(!showCart);
    }

    let headerContent = (!user || !loggedIn) ? "Log In or Register" : `Welcome ${user.username}; role: ${user.role}`;
    let itemLength = cartContext.items?.length || 0;

    return (
        <div className="header">
            <span className="header-user">{headerContent}</span>
            <div className="header-links">
                {loggedIn && <button onClick={handleLogOut}>Log Out</button>}
                {(loggedIn && user.role === 'user' && !isCheckoutPage) && <button onClick={handleToggleCart}>Cart ({itemLength})</button>}
            </div>
            {(loggedIn && user.role === 'user' && showCart) && <Cart />}
        </div>
    )
}