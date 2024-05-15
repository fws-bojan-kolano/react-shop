import { useRef } from 'react';
import './checkoutForm.scss';
import { SERVER } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import { emailRequest } from '../../utils/utils';

export default function CheckoutForm() {
    const emailRef = useRef(null);
    const navigate = useNavigate();

    const handleCheckoutSubmit = async (event) => {// When form is submited
        event.preventDefault();

        const storageUser = JSON.parse(localStorage.getItem('loggedInUser'));
        const emailAddress = emailRef.current.value;

        const dataToSend = {
            ...storageUser,
            emailAddress
        }

        const storeUserAndRedirect = () => {
            const newUser = {
                ...storageUser,
                cart: ''
            }
            localStorage.setItem('loggedInUser', JSON.stringify(newUser));
            navigate('/page-thank-you');
        }

        await emailRequest(`${SERVER}checkout-email`, 'POST', dataToSend, storeUserAndRedirect());// Send email request
    }

    return (
        <>
            <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
                <input type="email" placeholder="Email" required ref={emailRef} />
                <input type="submit" value="Checkout" />
            </form>
        </>
    );
}