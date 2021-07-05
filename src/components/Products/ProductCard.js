import { useState } from 'react';
import AddToFavorite from '../Favorite/AddToFavorite';
import './ProductCard.css';

const ProductCard = (props) => {

    const product = props.product;

    const [showOptions, setShowOptions] = useState(false);

    const onProductFocus = () => {
        setShowOptions(true);
    }
    const onProductBlur = () => {
        setShowOptions(false);
    }

    return (
        <div className={`card ${props.className}`}
            onMouseEnter={onProductFocus} onMouseLeave={onProductBlur}>
            <img className='card-img-top' src={product.imgURL} alt='Product' onClick={props.onClick} />
            {showOptions &&
                <div className='card-body p-2'>
                    <span className='card-title m-0'>{product.productName}</span>
                    <span className='ml-auto'>
                        <AddToFavorite product={product} />
                    </span>
                </div>
            }
        </div>
    );
}

export default ProductCard;