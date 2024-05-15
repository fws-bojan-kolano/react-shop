import { createContext, useEffect, useState } from "react";
import { fetchProducts } from "../../data/products/httpProducts";

export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    updateItemQuantity: () => {},
    removeItemFromCart: () => {}
});

export default function CartContextProvider({children}) {
    const [user, setUser] = useState({});

    useEffect(() => {// Retrieve user from localstorage
        try {
            const storageUser = JSON.parse(localStorage.getItem('loggedInUser'));
            if(storageUser !== '' && storageUser !== null) {
                setUser(storageUser);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    const findCartItemIndex = (items, productID) => {// Get matching index hook
        return items.findIndex(cartItem => cartItem.id === productID);
    }

    const updateUser = (cartItemUpdate) => {// Update user hook
        const storageUser = JSON.parse(localStorage.getItem('loggedInUser'));

        const updatedUser = {
            ...storageUser,
            cart: cartItemUpdate
        };

        setUser(updatedUser);
        localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));
    }

    const handleAddItemToCart = (productId, productAmount) => {// Add to cart that gets product id and amount
        let updatedItems = user.cart || [];

        const existingCartItemIndex = findCartItemIndex(updatedItems, productId);
        const existingCartItem = updatedItems[existingCartItemIndex];

        if(existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + productAmount
            };

            updatedItems[existingCartItemIndex] = updatedItem;
            updateUser(updatedItems);
        } else {
            fetchProducts()
            .then(retrievedProducts => {
                const addedProduct = retrievedProducts.find(product => product.id === productId);

                updatedItems.push({
                    id: addedProduct.id,
                    name: addedProduct.name,
                    price: addedProduct.price,
                    image: addedProduct.image,
                    quantity: productAmount
                });
                updateUser(updatedItems);
            })
            .catch(error => {
                console.log(error);
            });
        }

        return {
            items: updatedItems
        }
    }

    const handleUpdateItemQuantity = (productId, productAmount) => {// Update cart when increment or decrement is clicked
        let updatedItems = user.cart || [];

        const updatedCartItemIndex = findCartItemIndex(updatedItems, productId);
        const updatedItem = {
            ...updatedItems[updatedCartItemIndex]
        }

        updatedItem.quantity += productAmount;

        if(updatedItem.quantity <= 0) {
            updatedItems.splice(updatedCartItemIndex, 1);
        } else {
            updatedItems[updatedCartItemIndex] = updatedItem;
        }
        updateUser(updatedItems);

        return {
            items: updatedItems
        };
    }

    const handleRemoveItemFromCart = (productId) => {// Remove product form cart
        let updatedItems = user.cart || [];
        const updatedCartItemIndex = findCartItemIndex(updatedItems, productId);

        if (updatedCartItemIndex !== -1) {
            updatedItems.splice(updatedCartItemIndex, 1);
            updateUser(updatedItems);
        }

        return {
            items: updatedItems
        };
    }

    const contextValue = {
        items: user.cart,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateItemQuantity,
        removeItemFromCart: handleRemoveItemFromCart
    };

    return (
        <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
    )
}