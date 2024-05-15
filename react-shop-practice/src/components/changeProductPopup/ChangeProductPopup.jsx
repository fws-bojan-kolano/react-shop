import './changeProductPopup.scss';
import { useRef, useState } from 'react';
import { fetchProducts } from '../../data/products/httpProducts';
import { SERVER } from '../../utils/utils';

export default function ChangeProductPopup({onSubmitChangeProduct, onClosePopupChange}) {
    const [closePopup, setClosePopup] = useState(false);
    const [showError, setShowError] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const existingProductID = useRef(null);
    const newProductName = useRef(null);
    const newProductPrice = useRef(null);
    const newProdctImageLink = useRef(null);

    const handleClosePopup = () => {// Move state for closing the popup to List of products
        setClosePopup(true);
        onClosePopupChange(closePopup);
    }

    const findProduct = async () => {// Find product with the exact ID
        const existingID = parseFloat(existingProductID.current.value);
        const products = await fetchProducts();
        const matchingProduct = products.find(product => product.id === existingID);
        return matchingProduct;
    }

    const handleShowForm = async (event) => {// Show form if the ID matches
        event.preventDefault();

        try {
            const matchingProduct = await findProduct();
            if(matchingProduct) {
                setShowError(false);
                setShowForm(true);
            } else {
                setShowError(true);
                setShowForm(false);
            }
        } catch (error) {
            throw new Error('Failed to find product. Please try again later.');
        }
    }

    const handleSubmitChangeProduct = async (event) => {// Send new product to List of products
        event.preventDefault();

        const nameValue = newProductName.current.value;
        const priceValue = parseFloat(newProductPrice.current.value);
        const imageValue = newProdctImageLink.current.value;

        try {
            const matchingProduct = await findProduct();
            const newProduct = {
                ...matchingProduct,
                name: nameValue,
                price: priceValue,
                image: imageValue
            };

            try {
                const response = await fetch(`${SERVER}products`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newProduct)
                })

                if(response.ok) {
                    const data = await response.json();
                    setShowSuccess(true);
                    onSubmitChangeProduct();
                    return data;
                } else {
                    throw new Error('Failed to change product. Please try again later.');
                }
            } catch (error) {
                throw new Error(error);
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    return (
        <div className="change-product-popup">
            <div className="wrapper">
                <h2>Enter Existing Product ID</h2>
                <button onClick={handleClosePopup}>X</button>
                {showError && <span className='register-error'>Product with entered ID doesn't exist.</span>}
                <input type="number" placeholder='Product ID' ref={existingProductID} />
                <button className='confirm-button' onClick={handleShowForm}>Confirm ID</button>
                {showForm &&
                    <form onSubmit={handleSubmitChangeProduct}>
                        <p>Change Existing Product Data</p>
                        {showSuccess && <span className='register-success'>Product changed!</span>}
                        <input type="text" placeholder='New Product name' required ref={newProductName} />
                        <input type="number" placeholder='New Product price' required ref={newProductPrice} />
                        <input type="text" placeholder='New Product image link' required ref={newProdctImageLink} />
                        <input type="submit" value='Submit' />
                    </form>
                }
            </div>
        </div>
    )
}