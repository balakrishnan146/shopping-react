import { useState, useEffect } from 'react';
import { XLg } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';
import { get, del } from '../Common/Http';
import Constants from '../Common/Constants';
import Alert from '../Common/Alert';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [userMessage, setUserMessage] = useState('Loading...');

    const removeFromFavorite = async (favorite) => {
        await del(`${Constants.BASE_URL}favorites/${favorite}.json`);
        getFavorites();
    }

    const getFavorites = async () => {
        const favoriteList = [];
        const favoritesResponse = await get(`${Constants.BASE_URL}favorites.json`);

        for (const key in favoritesResponse) {
            favoriteList.push({
                key,
                productId: favoritesResponse[key].productId,
                productName: favoritesResponse[key].productName,
                imgURL: favoritesResponse[key].imgURL,
            });
        }

        setFavorites(favoriteList);
        setUserMessage(favoriteList.length === 0 &&
            <div className='vertical-align-center flex-column'>
                <Alert className='d-block m-2' type='info'>You haven't added any favorites!!</Alert>
                <NavLink className='btn btn-outline-info' to='/view-product'>Check our products here</NavLink>
            </div>);
    }

    useEffect(() => {
        getFavorites();
    }, []);

    const favoritesTemplate = favorites?.map(fav =>
        <div key={fav.key} className='col-12 box vertical-align-center'>
            <img src={fav.imgURL} className='img-responsive' height='100' alt='Favorite' />
            <NavLink className='title font-weight-light ml-auto' to={`/view-product/${fav.productId}`}>
                {fav?.productName}
            </NavLink>
            <XLg className='icon ml-auto mr-2' onClick={removeFromFavorite.bind(null, fav.key)} />
        </div>
    );

    return (
        <>
            {
                favorites?.length > 0 ?
                    <div className='row'>
                        {favoritesTemplate}
                    </div>
                    :
                    <div>{userMessage}</div>
            }
        </>
    );
}

export default Favorites;