import './userListing.scss';
import { fetchProducts } from '../../data/products/httpProducts';
import SingleProduct from '../singleProduct/SingleProduct';
import { useFetch } from '../../hooks/useFetch';

export default function UserProductListing() {

    const {fetchedData: products, setFetchedData} = useFetch(fetchProducts, []);// Fetch all products using custom useFetch hook

    return (
        <div className="user-product-listing">
            <ul className='user-product-listing__row'>
                {products.map(product => (
                    <SingleProduct
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        src={product.image}
                        price={product.price}
                    />
                ))}
            </ul>
        </div>
    )
}