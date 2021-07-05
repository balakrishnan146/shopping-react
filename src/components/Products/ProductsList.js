import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Constants from '../Common/Constants';
import { get } from '../Common/Http';
import ProductCard from './ProductCard';

const ProductsList = () => {
    const [productList, setProductList] = useState([]);
    const [userMessage, setUserMessage] = useState('Loading...');
    const history = useHistory();

    const getProducts = async () => {
        const products = [];
        const productResponse = await get(`${Constants.BASE_URL}products.json`);
        for (const key in productResponse) {
            if (productResponse[key].stock > 0) {
                products.push({
                    key,
                    productName: productResponse[key].productName,
                    imgURL: productResponse[key].imgURL,
                    stock: productResponse[key].stock,
                    price: productResponse[key].price,
                    description: productResponse[key].description
                });
            }
        }
        setProductList(products);
        products.length === 0 && setUserMessage('No Products Found!');
    }

    const onProductSelect = (product) => {
        history.push(`/view-product/${product.key}`);
    }

    useEffect(() => {
        getProducts();
    }, []);

    const productsTemplate = productList.length ? productList.map(product =>
        <ProductCard className='col-3' key={product.key} product={product}
            onClick={onProductSelect.bind(null, product)}></ProductCard>
    ) : <div>{userMessage}</div>;

    return (
        <div className="row">
            {productsTemplate}
        </div>
    );
}

export default ProductsList;