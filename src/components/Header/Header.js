import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
const Header = () => {
    return (
        <>
            <nav className='navbar navbar-expand-sm navbar-dark bg-dark'>
                <NavLink className='navbar-brand' to='/home'>
                    <img src={logo} height='30' alt='Logo'/>
                </NavLink>
                <div className='collapse navbar-collapse'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/add-product'>Add</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/view-product'>View</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/cart'>Cart</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/favorites'>Favorites</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink className='nav-link' to='/order'>Orders</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Header;