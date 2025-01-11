import { Link, useNavigate } from "react-router-dom";
import shoppingCart from '../../assets/shoppingCart.png';
import { useState } from 'react'
import search from '../../assets/search.png';

function Header(props) {

  const {

    cartItems,
    category

  } = props;

  const navigate = useNavigate();

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  let itemNumber = 0
  if (cartItems != undefined) {

    for (let i = 0; i < cartItems.length; i++) {
      let toNumber = Number(cartItems[i].quantity)
      itemNumber = itemNumber + toNumber
    }

  }

  const handleSearchSubmit = (event) => {

    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target).entries());

    navigate('/shop/search', { state: { name: data.search, _id: "search" } });

  }

// dropdown menu

  const DropdownMenu = () => {
    return (
      <div className="dropdown-menu">
        <ul className="ulDropdown">

          {category.map((index, iter) => {
            return (
              <Link key={iter} to={`/shop/${index._id}`} state={index}>
                <li className="liDropdown">{index.name}</li>
              </Link>
            )
          })}
          <Link to={`/shop/all`} state={{name: "All Products", _id: "all"}}>
          <li className="liDropdown">All Products</li>
          </Link>
          <Link to={`/shop/all`} state={{name: "On Sale", _id: "sale"}}>
          <li className="liDropdown">On Sale</li>
          </Link>
        </ul>
      </div>
    );
  };

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };


  return (
    <div className="headerDiv">
      <header>
        <h1>My Store</h1>
        <Link className="heading" to="/">
          <div>Home</div>
        </Link>
        <form onSubmit={handleSearchSubmit}>
          <div className="searchContainer">
          <input className="searchInput" type="text" name="search" placeholder="search our products">
          </input>
          <input className="searchSubmit" type="image" src={search}></input>
          </div>
        </form>
        <Link className="heading" to="/cart">
          <div className="cartContainer"><span data-testid="cartNumber" className="itemNumber">{itemNumber}</span><img className="shoppingCart" src={shoppingCart}></img></div>

        </Link>
        <div
          className="menu"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className="buttonDropdown">Shop</button>
          {/* <DropdownMenu /> */}
          {isDropdownVisible && <DropdownMenu />}
        </div>
      </header>
    </div>
  )

}

export { Header }
