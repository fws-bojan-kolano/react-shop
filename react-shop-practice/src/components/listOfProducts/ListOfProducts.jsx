import { useState } from 'react';
import './listOfProducts.scss';
import AddProductPopup from '../addProductPopup/AddProductPopup';
import ChangeProductPopup from '../changeProductPopup/ChangeProductPopup';
import { fetchProducts } from '../../data/products/httpProducts';

export default function ListOfProducts({products, onRemoveProduct, onAddNewProduct, onChangeExistingProduct}) {
    const [togglePopupAdd, setTogglePopupAdd] = useState(false);
    const [togglePopupChange, setTogglePopupChange] = useState(false);

    const handleSubmit = async (functionCall) => {
        try {
            const products = await fetchProducts();
            functionCall(products);
        } catch (error) {
            throw new Error(error);
        }
    }

    const handleTogglePopupAdd = () => {// Show Add popup
        setTogglePopupAdd(true);
    }

    const handleTogglePopupChange = () => {// Show Chnage popup
        setTogglePopupChange(true);
    }

    const handleClosePopup = (popupState) => {// Close Add popup
        setTogglePopupAdd(popupState);
    }

    const handleClosePopupChange = (popupState) => {// Close Change popup
        setTogglePopupChange(popupState);
    }

    const handleSubmitNewProduct = async () => {// Move updated products to Admin Listing
        handleSubmit(onAddNewProduct);
    }

    const handleSubmitChangeProduct = async () => {// Move updated products to Admin Listing
        handleSubmit(onChangeExistingProduct);
    }

    return (
        <div className="list-of-products">
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <span>ID: {product.id} - Name: {product.name} - Price: {product.price}</span>
                        <div className="list-of-users__buttons">
                            <button onClick={() => onRemoveProduct(product)}>Remove Product</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={handleTogglePopupAdd}>Add New Product</button>
            <button onClick={handleTogglePopupChange}>Change Product</button>
            {togglePopupAdd && <AddProductPopup onSubmitNewProduct={handleSubmitNewProduct} onClosePopup={handleClosePopup} />}
            {togglePopupChange && <ChangeProductPopup onClosePopup={handleClosePopup} onClosePopupChange={handleClosePopupChange} onSubmitChangeProduct={handleSubmitChangeProduct} />}
        </div>
    )
}