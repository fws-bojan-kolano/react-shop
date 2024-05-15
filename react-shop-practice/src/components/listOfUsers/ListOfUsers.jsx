import { useState, useRef } from 'react';
import './listOfUsers.scss';

export default function ListOfUsers({users, onRemoveUser, onChangePassword}) {
    const [inputShown, setInputShown] = useState(false);

    const newPassword = useRef(null);

    const handleShowInput = (userId) => {// Show the change input and button
        setInputShown(prevUserId => (prevUserId === userId ? null : userId));
    }

    return (
        <div className="list-of-users">
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        <span>ID: {user.id} - Username: {user.username} - Password: {user.password}</span>
                        <div className="list-of-users__buttons">
                            <button onClick={() => onRemoveUser(user)}>Remove User</button>
                            <button onClick={() => handleShowInput(user.id)}>Change Password</button>
                            {inputShown === user.id && 
                                (
                                    <>
                                        <input type="text" placeholder='Enter New Password' ref={newPassword} />
                                        <button onClick={() => onChangePassword(user, newPassword.current.value)}>Confirm</button>
                                    </>
                                )
                            }
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}