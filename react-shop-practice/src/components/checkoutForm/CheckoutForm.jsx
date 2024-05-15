import { useRef } from 'react';
import './checkoutForm.scss';
import { SERVER } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

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

        try {
            const response = await fetch(`${SERVER}email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            })
        
            if(response.ok) {
                const newUser = {
                    ...storageUser,
                    cart: ''
                }
                localStorage.setItem('loggedInUser', JSON.stringify(newUser));
                navigate('/page-thank-you');
            } else {
                const errorMessage = await response.text();
                alert(`Error: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending email');
        }
    }

    return (
        <>
            <form action="" className="checkout-form" onSubmit={handleCheckoutSubmit}>
                <input type="email" placeholder="Email" required ref={emailRef} />
                <input type="submit" value="Checkout" />
            </form>
        </>
    );
}