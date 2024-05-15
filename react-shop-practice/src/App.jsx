import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './App.scss';
import Header from './components/header/Header';
import CartContextProvider from './components/cart/cart-context';
import PageCheckout from './pages/PageCheckout';
import PageMain from './pages/PageMain';
import PageRegister from './pages/PageRegister';
import PageThankYou from './pages/PageThankYou';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {// Retrieve user
    const storageUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if(storageUser) {
      setLoggedInUser(storageUser);
    }
  }, []);

  const handleLogin = (user) => {// Get user from login form
    setLoggedInUser(user);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  const handleLogOut = () => {
    setLoggedInUser(false);// Show Login
  }

  return (
    <CartContextProvider>
      <BrowserRouter>
        <Header user={loggedInUser} onLogOut={handleLogOut} />
        <Routes>
            <Route path="/" element={<PageMain user={loggedInUser} onLogin={handleLogin} onLogOut={handleLogOut} />} />
            <Route path="/page-checkout" element={<PageCheckout />} />
            <Route path="/page-register" element={<PageRegister />} />
            <Route path="/page-thank-you" element={<PageThankYou />} />
        </Routes>
      </BrowserRouter>
    </CartContextProvider>
  )
}

export default App
