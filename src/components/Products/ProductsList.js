import { useEffect, useState } from 'react';
import Constants from '../Common/Constants';
import { get } from '../Common/Http';

const ProductsList = () => {
    const [productList, setProductList] = useState([]);

    const getProducts = async () => {
        const products = [];
        const productResponse = await get(`${Constants.BASE_URL}products.json`);
        for (const key in productResponse) {
            products.push({
                key,
                productName: productResponse[key].productName,
                imgURL: productResponse[key].imgURL,
                stock: productResponse[key].stock,
                price: productResponse[key].price,
                description: productResponse[key].description
            })
        }
        setProductList(products);
    }

    useEffect(() => {
        getProducts();
    }, []);

    const productsTemplate = productList.length ? productList.map(product =>
        <div key={product.key}>{product.productName}</div>
    ) : <div>No Products Found!</div>;

    return (
        <>
            {productsTemplate}
        </>
    );
}

export default ProductsList;