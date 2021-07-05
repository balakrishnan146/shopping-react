import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { XLg, BagCheck } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import { get, post, del } from '../Common/Http';
import Constants from '../Common/Constants';
import Alert from '../Common/Alert';
import './Cart.css';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [userMessage, setUserMessage] = useState('Loading...');

    const removeFromCart = async (cart) => {
        await del(`${Constants.BASE_URL}cart/${cart}.json`);
        getCartItems();
    }

    const getTotal = () => {
        return cartItems.map((item) => getCartItemAmount(item)).reduce((a, b) => a + b);
    }

    const getCartItemAmount = (cartItem) => {
        let amount = cartItem.price * cartItem.quantity;
        if (cartItem.discount > 0) {
            amount -= amount * cartItem.discount / 100;
        }
        return amount;
    }

    const reduceQuantity = (index) => {
        setCartItems((prevState) => {
            prevState[index].quantity -= 1;
            prevState[index].amount = getCartItemAmount(prevState[index]);
            return [...prevState];
        });
    }

    const addQuantity = (index) => {
        setCartItems((prevState) => {
            prevState[index].quantity += 1;
            prevState[index].amount = getCartItemAmount(prevState[index]);
            return [...prevState];
        });
    }

    const placeOrder = async () => {
        if (getTotal() > 0) {
            const orderResponse = await post(`${Constants.BASE_URL}order.json`, { orderItems: cartItems, total: getTotal() });
            const cartResponse = await del(`${Constants.BASE_URL}cart.json`);
            getCartItems();
            toast.success('Order Placed Successfully.', { autoClose: 3000 });
        }
    }

    const getCartItems = async () => {
        const cartItemList = [];
        const cartItemsResponse = await get(`${Constants.BASE_URL}cart.json`);

        for (const key in cartItemsResponse) {
            cartItemList.push({
                key,
                productId: cartItemsResponse[key].productId,
                productName: cartItemsResponse[key].productName,
                description: cartItemsResponse[key].description,
                imgURL: cartItemsResponse[key].imgURL,
                size: cartItemsResponse[key].size,
                stock: cartItemsResponse[key].stock,
                price: cartItemsResponse[key].price,
                quantity: cartItemsResponse[key].quantity,
                discount: cartItemsResponse[key].discount,
                amount: getCartItemAmount(cartItemsResponse[key])
            });
        }

        setCartItems(cartItemList);
        setUserMessage(cartItemList.length === 0 &&
            <div className='vertical-align-center flex-column'>
                <Alert className='d-block m-2' type='info'>You don't have any items in your cart.</Alert>
                <NavLink className='btn btn-outline-info' to='/view-product'>Check our products here</NavLink>
            </div>);
    }

    useEffect(() => {
        getCartItems();
    }, []);

    const cartItemsTemplate = cartItems?.map((cartItem, index) =>
        <div key={cartItem.key} className='col-12 my-2 vertical-align-center'>
            <img src={cartItem.imgURL} className='img-responsive' height='100' alt='Cart Item' />
            <NavLink className='title font-weight-light ml-auto' to={`/view-product/${cartItem.productId}`}>
                {cartItem?.productName}
            </NavLink>
            <div className="btn-group mx-5" role="group" aria-label="Quantity group">
                <button type="button" className="btn btn-outline-primary" disabled={cartItem.quantity === 1}
                    onClick={reduceQuantity.bind(null, index)}>-</button>
                <div className='cart-quantity'>{cartItem.quantity}</div>
                <button type="button" className="btn btn-outline-primary" disabled={cartItem.quantity === cartItem.stock}
                    onClick={addQuantity.bind(null, index)}>+</button>
            </div>
            <div className='ml-auto mr-2'>
                {cartItem.price} x {cartItem.quantity} {cartItem?.discount > 0 && `(- ${cartItem.discount}%)`} = ₹. {cartItem.amount}
            </div>
            <XLg className='icon ml-auto mr-2' onClick={removeFromCart.bind(null, cartItem.key)} />
        </div>
    );

    return (
        <>
            {
                cartItems?.length > 0 ?
                    <>
                        <div className='row'>
                            {cartItemsTemplate}
                        </div>
                        <div className='order-bar bg-light'>
                            <span>Total: ₹. {getTotal()}</span>
                            <button disabled={getTotal() <= 0} className='btn btn-success ml-3' onClick={placeOrder}>
                                <BagCheck className='align-baseline mr-2' />
                                Place Order
                            </button>
                        </div>
                    </>
                    :
                    <div>{userMessage}</div>
            }
        </>
    )
}

export default Cart;