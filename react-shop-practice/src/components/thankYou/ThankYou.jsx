import { useNavigate } from 'react-router-dom';

export default function ThankYou() {
    const navigate = useNavigate();

    const handleNavigateToHome = () => {// Go to home
        navigate('/');
        window.location.reload();
    }

    return (
        <>
            <h1>Thank you for the purchse!</h1>
            <h2>You should recieve the email soon!</h2>
            <button onClick={handleNavigateToHome}>Go to home</button>
        </>
    )
}