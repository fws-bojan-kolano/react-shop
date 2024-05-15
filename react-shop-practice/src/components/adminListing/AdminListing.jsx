
import ListOfProducts from '../listOfProducts/ListOfProducts';
import ListOfUsers from '../listOfUsers/ListOfUsers';
import { fetchUsers } from '../../data/users/httpUsers';
import { fetchProducts } from '../../data/products/httpProducts';
import './adminListing.scss';
import {useCallback, useState} from 'react';
import { SERVER } from '../../utils/utils';
import { emailRequest } from '../../utils/utils';

export default function AdminListing() {
    const [showContent, setShowContent] = useState('users');
    const [users, setUsers] = useState([]);
    const [products, setProducts] = useState([]);
    const [toggleMessage, setToggleMessage] = useState(null);

    const fetchUserApi = `${SERVER}users`;
    const fetchProductApi = `${SERVER}products`;

    const fetchDataAndSetState = async (fetchFunction, setStateFunction, contentType) => {
        try {
            const data = await fetchFunction();
            setStateFunction(data);
        } catch (error) {
            throw new Error(error);
        }
        setShowContent(contentType);
        setToggleMessage(null);
    }

    const responseCondition = async (singleData, method, api, fetchFunction, updateParameter) => {
        let response;

        if(singleData) {
            response = await fetch(api, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(singleData)
            });
        }

        if(response && response.ok) {
            const data = await response.json();
            const updatedData = await fetchFunction();
            if(updateParameter === 'user') {
                setUsers(updatedData);
            } else if (updateParameter === 'product') {
                setProducts(updatedData);
            }
            setToggleMessage('success');
            return data;
        } else {
            setToggleMessage('error');
            throw new Error('Failed to execute command. Please try again later.');
        }
    }

    const toggleErrorMessage = (error) => {
        console.error('Error:', error.message);
        setToggleMessage('error');
    }

    const handleShowUsers = () => {// Show users
        fetchDataAndSetState(fetchUsers, setUsers, 'users');
    }

    const handleShowProducts = () => {// Show products
        fetchDataAndSetState(fetchProducts, setProducts, 'products');
    }

    const handleRemoveUser = useCallback(async function handleRemoveUser(transferedUser) {// Remove a user
        try {
            const users = await fetchUsers();
            const matchingUser = users.filter(user => user.id === transferedUser.id);

            const userToDelete = {...matchingUser[0]};

            await responseCondition(userToDelete, 'DELETE', fetchUserApi, fetchUsers, 'user');

            await emailRequest(`${SERVER}remove-user-email`, 'POST', userToDelete);// Send email request
            
        } catch (error) {
            toggleErrorMessage(error);
        }
    }, []);

    const handleChangePassword = useCallback(async function handleChangePassword(transferedUser, transferedPassword) {// Change the password of the user
        if(transferedPassword !== '') {
            try {
                const users = await fetchUsers();
                const matchingUser = users.filter(user => user.id === transferedUser.id);
    
                const newUser = {
                    ...matchingUser[0],
                    password: transferedPassword
                }
    
                await responseCondition(newUser, 'PUT', fetchUserApi, fetchUsers, 'user');

                await emailRequest(`${SERVER}change-password-email`, 'POST', newUser);// Send email request
                
            } catch (error) {
                toggleErrorMessage(error);
            }
        } else {
            setToggleMessage('error');
        }
    }, []);

    const handleRemoveProduct = useCallback(async function handleRemoveUser(transferedProduct) {// Remove a product
        try {
            const products = await fetchProducts();
            const matchingProduct = products.filter(product => product.id === transferedProduct.id);

            const productToDelete = {...matchingProduct[0]};

            await responseCondition(productToDelete, 'DELETE', fetchProductApi, fetchProducts, 'product');
            
        } catch (error) {
            toggleErrorMessage(error);
        }
    }, []);

    const handleAddNewProduct = useCallback(async function handleAddNewProduct(newProduct) {// Update listed products with the new one
        setProducts(newProduct);
    }, []);

    const handleChangeProduct = useCallback(async function handleChangeProduct(newProduct) {// Update listed products with the new one
        setProducts(newProduct);
    }, []);

    return (
        <>
            <div className="admin-listing">
                <button onClick={handleShowUsers}>List all users</button>
                <button onClick={handleShowProducts}>List all products</button>
                {toggleMessage === 'success' ? 
                    (
                        <p className='admin-listing-success'>Database Updated</p>) : toggleMessage === 'error' ? 
                        (<p className='admin-listing-error'>Error. Please try again.</p>
                    ) : null
                }
            </div>
            {showContent === 'users' ? 
            <ListOfUsers users={users} onRemoveUser={handleRemoveUser} onChangePassword={handleChangePassword} /> : 
            <ListOfProducts products={products} onRemoveProduct={handleRemoveProduct} onAddNewProduct={handleAddNewProduct} onChangeExistingProduct={handleChangeProduct} />}
        </>
    )
}