import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { BagPlus } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import Alert from '../Common/Alert';
import Select from '../Common/Select';
import Constants from '../Common/Constants';
import { get, post } from '../Common/Http';
import useInput from '../../hooks/use-input';
import './ProductDetails.css';

const ProductDetails = () => {
    const params = useParams();
    const productId = params.id;
    const history = useHistory();
    const [product, setProduct] = useState(null);
    const [addedToCart, setAddedToCart] = useState(false);
    const [productSizes, setProductSizes] = useState([]);
    const [userMessage, setUserMessage] = useState('Loading...');
    const size = useInput(['required']);

    const getProductDetails = async () => {
        const productResponse = await get(`${Constants.BASE_URL}products/${productId}.json`);
        setProduct(productResponse);
        product && setUserMessage('Cannot fetch product details!');
    }

    const getProductSize = async () => {
        const productSizeResponse = await get(`${Constants.BASE_URL}size.json`);
        const productsizes = [];
        for (const key in productSizeResponse) {
            productsizes.push({
                key,
                label: productSizeResponse[key].label,
                description: productSizeResponse[key].description
            });
        }
        setProductSizes(productsizes);
    }

    const addToCart = async () => {
        if (addedToCart) {
            history.push('/cart');
        } else if (product.stock > 0) {
            const cartResponse = await post(`${Constants.BASE_URL}cart.json`, { ...product, productId: productId, size: size.value, quantity: 1 });
            if (cartResponse) {
                toast.success('Successfully added to cart.', { autoClose: 3000 });
                setAddedToCart(true);
            }
        }
    }

    useEffect(() => {
        getProductDetails();
        getProductSize();
    }, []);

    const productTemplate =
        <div className='row my-2'>
            <div className='col-6'>
                <img src={product?.imgURL} className='image' alt='Product' />
            </div>
            <div className='col-6'>
                <div className='row my-2'>
                    <h1 className='title'>{product?.productName}</h1>
                </div>
                <div className='row my-2'>
                    <div>{product?.description}</div>
                </div>
                <div className='row my-2'>
                    <span className='selling-price mr-2'>
                        {product?.discount > 0 ? `₹. ${product?.price * (1 - product?.discount / 100)}`
                            : `₹. ${product?.price}`}
                    </span>
                    {
                        product?.discount > 0 &&
                        <>
                            <span className='price mr-2'>{`₹. ${product?.price}`}</span>
                            <span className='discount mr-2'>{`( ${product?.discount}% OFF )`}</span>
                        </>
                    }
                </div>
                <div className='row my-2'>
                    <div className='col-6 pl-0'>
                        <Select inputName={size}>
                            <option value=''>Select Size</option>
                            {
                                productSizes?.length > 0 &&
                                productSizes.map(productSize =>
                                    <option key={productSize.key} value={productSize.label}>{productSize.description}</option>
                                )
                            }
                        </Select>
                    </div>
                    <div className='col-6'>
                        <button disabled={!size.isValid && !addedToCart} className='btn btn-success' onClick={addToCart}><BagPlus className='align-baseline mr-2' />{addedToCart ? 'Go to cart' : 'Add To Cart'}</button>
                    </div>
                    {
                        size.hasError && <Alert className='my-2' type='danger'>Please select a size before adding to cart.</Alert>
                    }
                </div>
            </div>
        </div>;

    return (
        <>
            {
                product ? productTemplate : <div>{userMessage}</div>
            }
        </>
    )
}

export default ProductDetails;