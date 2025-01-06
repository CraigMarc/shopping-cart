import { Link } from "react-router-dom";
import shoppingCart from '../../assets/shoppingCart.png';
import { useState } from 'react'

function Header(props) {

  const {

    cartItems,
    category

  } = props;

  const [isDropdownVisible, setDropdownVisible] = useState(false);

  let itemNumber = 0
  if (cartItems != undefined) {

    for (let i = 0; i < cartItems.length; i++) {
      let toNumber = Number(cartItems[i].quantity)
      itemNumber = itemNumber + toNumber
    }

  }



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
          <li className="liDropdown">All Products</li>
          <li className="liDropdown">On Sale</li>
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
