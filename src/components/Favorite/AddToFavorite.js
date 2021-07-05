import { useState, useEffect } from 'react';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import { get, post, del } from '../Common/Http';
import Constants from '../Common/Constants';
import './AddToFavorite.css';

const AddToFavorite = (props) => {
    const [isAdded, setIsAdded] = useState(false);
    const [favorites, setFavorites] = useState([]);

    const addToFavorite = async () => {
        const reqObj = {
            productName: props.product.productName,
            imgURL: props.product.imgURL,
            productId: props.product.key
        }
        await post(`${Constants.BASE_URL}favorites.json`, reqObj);
        setIsAdded(true);
    }

    const removeFromFavorite = async () => {
        const favorite = favorites.find(fav => fav.productId === props.product.key).key;
        await del(`${Constants.BASE_URL}favorites/${favorite}.json`);
        setIsAdded(false);
    }

    const getFavorites = async () => {
        const favoriteList = [];
        const favoritesResponse = await get(`${Constants.BASE_URL}favorites.json`);
        for (const key in favoritesResponse) {
            favoriteList.push({
                key,
                productId: favoritesResponse[key].productId
            });
        }
        setFavorites(favoriteList);
        setIsAdded(favoriteList.some(fav => fav.productId === props.product.key));
    }

    useEffect(() => {
        getFavorites();
    }, []);

    return (
        <>
            {
                isAdded ?
                    <HeartFill className='fav-fill-icon mx-1' onClick={removeFromFavorite} />
                    :
                    <Heart className='fav-icon mx-1' onClick={addToFavorite} />
            }
        </>
    );
}

export default AddToFavorite;
