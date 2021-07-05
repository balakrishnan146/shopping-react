import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { XLg } from 'react-bootstrap-icons';
import { get, del } from '../Common/Http';
import Constants from '../Common/Constants';
import Alert from '../Common/Alert';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [userMessage, setUserMessage] = useState('Loading...');

    const removeFromCart = async (cart) => {
        await del(`${Constants.BASE_URL}cart/${cart}.json`);
        getCartItems();
    }

    const getCartItems = async () => {
        const cartItemList = [];
        const cartItemsResponse = await get(`${Constants.BASE_URL}cart.json`);

        for (const key in cartItemsResponse) {
            cartItemList.push({
                key,
                productId: cartItemsResponse[key].productId,
                productName: cartItemsResponse[key].productName,
                imgURL: cartItemsResponse[key].imgURL,
                stock: cartItemsResponse[key].stock,
                price: cartItemsResponse[key].price,
                discount: cartItemsResponse[key].discount
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

    const cartItemsTemplate = cartItems?.map(cartItem =>
        <div key={cartItem.key} className='col-12 favorite-box vertical-align-center'>
            <img src={cartItem.imgURL} className='img-responsive' height='100' alt='Cart Item' />
            <NavLink className='title font-weight-light ml-auto' to={`/view-product/${cartItem.productId}`}>
                {cartItem?.productName}
            </NavLink>
            <XLg className='icon ml-auto mr-2' onClick={removeFromCart.bind(null, cartItem.key)} />
        </div>
    );

    return (
        <>
            {
                cartItems?.length > 0 ?
                    <div className='row'>
                        {cartItemsTemplate}
                    </div>
                    :
                    <p>{userMessage}</p>
            }
        </>
    )
}

export default Cart;