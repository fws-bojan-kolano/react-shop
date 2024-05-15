import './login.scss';
import { fetchUsers } from '../../data/users/httpUsers';
import { useRef, useState } from "react";
import { Link } from 'react-router-dom';

export default function Login({onLogin}) {
    const [showError, setShowError] = useState(false);

    const usernameRef = useRef(null);
    const passwordeRef = useRef(null);

    const handleFetchUsers = async (event) => {
        event.preventDefault();

        try {
            const users = await fetchUsers();// Get all users

            const inputUsernameValue = usernameRef.current.value;
            const inputPasswordValue = passwordeRef.current.value;

            const matchingUser = users.filter(user => user.username === inputUsernameValue && user.password === inputPasswordValue);
            if(matchingUser.length > 0) {
                onLogin(matchingUser[0]);// Send user to Main
                setShowError(false);
            } else {
                setShowError(true);
            }
        } catch (error) {
            throw new Error("Failed to fetch users");
        }
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <form className='login-form' onSubmit={handleFetchUsers}>
                {showError && <span className='login-error'>Enter correct username and password!</span>}
                <input type="text" placeholder='Username' ref={usernameRef} />
                <input type="text" placeholder='Password' ref={passwordeRef} />
                <input type="submit" value="Log In" />
            </form>
            <Link to="/page-register">Register</Link>
        </div>
    )
}