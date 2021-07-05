import { NavLink } from 'react-router-dom';

const Home = () => {
  return (<div class="jumbotron">
    <h1 class="display-4">Welcome!</h1>
    <NavLink className='btn btn-outline-info' to='/view-product'>Check our products here</NavLink>
  </div>);
}

export default Home;