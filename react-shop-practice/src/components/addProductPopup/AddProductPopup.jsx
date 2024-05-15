import './addProductPopup.scss';
import { generateUniqueId } from '../../utils/utils';
import { useRef, useState } from 'react';
import { fetchProducts } from '../../data/products/httpProducts';
import { SERVER } from '../../utils/utils';

export default function AddProductPopup({onSubmitNewProduct, onClosePopup}) {
    const newProductID = generateUniqueId();
    const newProductName = useRef(null);
    const newProductPrice = useRef(null);
    const newProdctImageLink = useRef(null);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [closePopup, setClosePopup] = useState(false);

    const handleClosePopup = () => {// Move state for closing the popup to List of products
        setClosePopup(true);
        onClosePopup(closePopup);
    }

    const handleSubmitNewProduct = async (event) => {// Send new product to List of products
        event.preventDefault();

        const idValue = parseFloat(newProductID);
        const nameValue = newProductName.current.value;
        const priceValue = parseFloat(newProductPrice.current.value);
        const imageValue = newProdctImageLink.current.value;

        const newProduct = {
            id: idValue,
            name: nameValue,
            price: priceValue,
            image: imageValue
        };

        try {
            const products = await fetchProducts();
            const matchingProduct = products.filter(product => product.name === newProduct.name && product.price === newProduct.price);

            if(matchingProduct.length > 0) {
                setShowError(true);
                setShowSuccess(false);
                return;
            } else {
                const response = await fetch(`${SERVER}products`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({...newProduct})
                })

                if(response.ok) {
                    const data = await response.json();
                    setShowError(false);
                    setShowSuccess(true);
                    onSubmitNewProduct();
                    return data;
                } else {
                    throw new Error('Failed to create product. Please try again later.');
                }
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    return (
        <div className="add-product-popup">
            <form onSubmit={handleSubmitNewProduct}>
                <button onClick={handleClosePopup}>X</button>
                <h2>Add New Product</h2>
                {showError && <span className='register-error'>Product already exists or inputs are incorrect.</span>}
                {showSuccess && <span className='register-success'>Product created!</span>}
                <input type="text" placeholder='Product name' required ref={newProductName} />
                <input type="number" placeholder='Product price' required ref={newProductPrice} />
                <input type="text" placeholder='Product image link' required ref={newProdctImageLink} />
                <input type="submit" value='Submit' />
            </form>
        </div>
    )
}