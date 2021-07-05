import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'react-bootstrap-icons';
import { get } from '../Common/Http';
import Constants from '../Common/Constants';
import Alert from '../Common/Alert';

const Order = () => {
    const [orders, setOrders] = useState([]);
    const [userMessage, setUserMessage] = useState('Loading...');

    const toggleOrder = (index, toggleValue) => {
        setOrders((prevState) => {
            prevState[index].isExpanded = toggleValue;
            return [...prevState];
        });
    }

    const getOrders = async () => {
        const orderList = [];
        const ordersResponse = await get(`${Constants.BASE_URL}order.json`);

        for (const key in ordersResponse) {
            orderList.push({
                key,
                orderItems: ordersResponse[key].orderItems,
                total: ordersResponse[key].total,
                isExpanded: false
            });
        }

        setOrders(orderList);
        setUserMessage(orderList.length === 0 &&
            <div className='vertical-align-center flex-column'>
                <Alert className='d-block m-2' type='info'>You haven't added any orders!!</Alert>
                <NavLink className='btn btn-outline-info' to='/view-product'>Check our products here</NavLink>
            </div>);
    }

    useEffect(() => {
        getOrders();
    }, []);

    const ordersTemplate = orders?.map((order, index) =>
        <div key={order.key} className='col-12 box'>
            <div className='row vertical-align-center'>
                <span className='ml-3'>Order #{order?.key}</span>
                <span className='ml-auto mr-3'>Total: ₹. {order?.total}</span>
                {
                    order?.isExpanded ?
                        <ChevronUp className='icon mr-3' onClick={toggleOrder.bind(null, index, false)} />
                        :
                        <ChevronDown className='icon mr-3' onClick={toggleOrder.bind(null, index, true)} />
                }
            </div>
            {
                order.isExpanded &&
                <div className='box mx-0 py-0'>
                    {
                        order?.orderItems?.length > 0 &&
                        order.orderItems.map(item =>
                            <div className='row vertical-align-center my-2 mx-0'>
                                <img src={item.imgURL} className='img-responsive' height='100' alt='Order Line Item' />
                                <span className='ml-auto'>{item.productName} ( x{item.quantity} )</span>
                                <span className='ml-auto mr-3'>₹. {item.amount}</span>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    );

    return (
        <>
            {
                orders?.length > 0 ?
                    <div className='row'>
                        {ordersTemplate}
                    </div>
                    :
                    <div>{userMessage}</div>
            }
        </>
    );
}

export default Order;