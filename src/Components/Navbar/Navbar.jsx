import React, { useContext } from 'react'
import './Navbar.module.css'
// import logo from '../../Assets/turbohub.svg'
import { Link } from 'react-router-dom'
// import { CounterContext } from '../../Context/CounterContext'
import { UserContext } from '../../Context/UserContext'
import { useNavigate } from "react-router-dom";
import Cart from '../../Assets/cart.png'
import favourite from '../../Assets/favourite.png'
import categoryIcon from '../../Assets/category.png'
import brandsIcon from '../../Assets/tag.png'
import HomeIcon from '../../Assets/HomeIcon.svg'
import { CartContext } from '../../Context/CartContext';
import { WishListContext } from '../../Context/WishListContext';


export default function Navbar() {

  // let { counter } = useContext(CounterContext);
  const { userToken, setUserToken } = useContext(UserContext);
  const { numOfCartItems } = useContext(CartContext);
  const { numOfFavItems } = useContext(WishListContext);
  let navigate = useNavigate();


  function logOut() {
    localStorage.removeItem('userToken');
    setUserToken(null);
    navigate('/login');
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to={''} className="navbar-brand logo  " >
        <h1 className='pacifico-regular'>Flat</h1>
      </Link>
      {/* {counter} */}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {userToken ? <ul className="navbar-nav me-auto align-items-center">
          <li className="nav-item">
            <Link to={'/'} className="nav-link pe-0" ><img height={40} src={HomeIcon} alt="" /></Link>
          </li>
          <li className="nav-item">
            <Link to={'/Brands'} className="nav-link " ><img height={28} src={brandsIcon} alt="" /></Link>
          </li>
          <li className="nav-item">
            <Link to={'/categories'} className="nav-link " ><img height={25} src={categoryIcon} alt="" /></Link>
          </li>
          <li className="nav-item">
            <Link to={'/cart'} className="nav-link position-relative" >
              <img height={30} src={Cart} alt="" />
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                {numOfCartItems}
                <span class="visually-hidden">unread messages</span>
              </span>
            </Link>
          </li>
          <li className="nav-item position-relative ">
            <Link to={'/wishlist'} className="nav-link  " >
              <img height={25} src={favourite} alt="" /></Link>
              <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
              {numOfFavItems}
              <span class="visually-hidden">unread messages</span>
            </span>
          </li>
        </ul> : null

        }

        <ul className="navbar-nav ms-auto align-items-center">
          <div className="SocialMedia">
            <Link className='text-dark' to="https://www.facebook.com"><i className='fab mx-2 fa-facebook'></i></Link>
            <Link className='text-dark' to="https://www.youtube.com"><i className='fab mx-2 fa-youtube'></i></Link>
            <Link className='text-dark' to="https://www.x.com"><i className='fab mx-2 fa-twitter'></i></Link>
            <Link className='text-dark' to="https://www.instagram.com"><i className='fab mx-2 fa-instagram' ></i></Link>
            <Link className='text-dark' to="https://www.linkedin.com"><i className='fab mx-2 fa-linkedin '></i></Link>
          </div>
          {userToken ?
            <li className="nav-item">
              <Link to={'Login'} className="nav-link pe-auto" onClick={logOut} >LogOut</Link>
            </li>
            :
            <>
              <li className="nav-item">
                <Link to={'Login'} className="nav-link " >Login</Link>
              </li>
              <li className="nav-item">
                <Link to={'register'} className="nav-link" >Register</Link>
              </li>
            </>
          }

        </ul>
      </div>
    </nav>
  )

}
