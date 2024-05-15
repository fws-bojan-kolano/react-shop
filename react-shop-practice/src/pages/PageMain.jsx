import { useState, useEffect } from 'react';
import Login from '../components/login/Login';
import AdminListing from '../components/adminListing/AdminListing';
import UserProductListing from '../components/userProductListing/UserProductListing';

const PageMain = ({user, onLogin}) => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    useEffect(() => {// Retrieve user
      if(user) {
        setLoggedInUser(user);
      } else {
        const storageUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if(storageUser) {
          setLoggedInUser(storageUser);
        }
      }
    }, [user]);

    return (
        <>
          {!loggedInUser && <Login onLogin={onLogin} />}
          {loggedInUser?.role === 'admin' && <AdminListing />}
          {loggedInUser?.role === 'user' && <UserProductListing />}
        </>
    )
  };
  
export default PageMain;