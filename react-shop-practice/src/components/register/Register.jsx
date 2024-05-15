import { useState, useRef } from 'react';
import './register.scss';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../data/users/httpUsers';
import { SERVER } from '../../utils/utils';
import { generateUniqueId } from '../../utils/utils';

async function createUser(username, password, email) {
    const userId = generateUniqueId();

    const response = await fetch(`${SERVER}users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: userId,
            username: username,
            password: password,
            role: 'user',
            email: email,
            cart: ''
        })
    })

    if(response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Failed to create user. Please try again later.');
    }
}

export default function Register() {
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const usernameRef = useRef(null);
    const passwordeRef = useRef(null);
    const emaileRef = useRef(null);

    const toggleErrorMessage = (condition) => {// Show or hide error and success messages
        if(condition === 'showError') {
            setShowError(true);
            setShowSuccess(false);
        } else if(condition === 'hideError') {
            setShowError(false);
            setShowSuccess(true);
        }
    }

    const handleSendUser = async (event) => {// Handle user on submit
        event.preventDefault();

        const inputUsernameValue = usernameRef.current.value;
        const inputPasswordValue = passwordeRef.current.value;
        const inputEmailValue = emaileRef.current.value;

        if (!inputUsernameValue || !inputPasswordValue || !inputEmailValue) {
            toggleErrorMessage('showError');
            return;
        }

        try {
            const users = await fetchUsers();// Get all users
            const matchingUser = users.filter(user => user.username === inputUsernameValue && user.password === inputPasswordValue);

            if(matchingUser.length > 0) {// User exists
                toggleErrorMessage('showError');
                return;
            }

            const newUser = await createUser(inputUsernameValue, inputPasswordValue, inputEmailValue);
            console.log('User created successfully:', newUser);
            toggleErrorMessage('hideError');
        } catch (error) {
            toggleErrorMessage('showError');
            console.error('Error:', error.message);
        }
    }

    return (
        <div className="register">
            <form className='register-form' onSubmit={handleSendUser}>
                {showError && <span className='register-error'>User already exists or credentials are incorrect.</span>}
                {showSuccess && <span className='register-success'>User created!</span>}
                <input type="text" placeholder='Username' ref={usernameRef} />
                <input type="text" placeholder='Password' ref={passwordeRef} />
                <input type="email" placeholder='Email' ref={emaileRef} />
                <input type="submit" value="Register" />
            </form>
            <Link to="/">Back to login</Link>
        </div>
    )
}