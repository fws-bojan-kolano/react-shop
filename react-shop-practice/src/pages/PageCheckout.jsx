import CheckoutForm from "../components/checkoutForm/CheckoutForm";
import Cart from "../components/cart/Cart";

const PageCheckout = () => {

    return (
      <>
        <h1>Checkout</h1>
        <div className="checkout-cart">
          <Cart />
        </div>
        <CheckoutForm />
      </>
    );
  };
  
export default PageCheckout;