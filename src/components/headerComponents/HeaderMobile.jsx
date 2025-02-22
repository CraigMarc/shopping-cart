import { Link, useNavigate } from "react-router-dom";
import shoppingCart from '../../assets/shoppingCart.png';
import { useState } from 'react'
import search from '../../assets/search.png';
import leftArrow from '../../assets/leftArrowMenu.png';

function HeaderMobile(props) {

  const {

    cartItems,
    category

  } = props;

  const navigate = useNavigate();

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isSubDropdownVisible, setSubVisible] = useState(false);
  const [subIter, setSubIter] = useState();

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

    navigate('/shop/search', { state: { category: { name: data.search, _id: "search" } } });

  }

  const handleSubMouseEnter = (e, iter) => {

    setSubVisible(true);
    setSubIter(iter)
  };

  const handleSubMouseLeave = () => {
    setSubVisible(false);
  };

  function SubDropdownMenu(props) {

    const {

      index,
      iter,
      catName

    } = props;

    return (
      <div className="subDropdown-menu">
        <ul className="ulSubDropdown">
          <Link onClick={handleAnchorClick} key={iter} to={`/shop/${index._id}`} state={{ category: index }}>
            <li className="liDropdown">All {catName}</li>
          </Link>
          {index.subCategory.map((index2, iter) => {
            return (
              <div key={iter}>
                <Link onClick={handleAnchorClick} to={`/shop/${index._id}`} state={{ category: index, subCategory: index2.name }}>
                  <li className="liDropdown">{index2.name}</li>
                </Link>
              </div>
            )
          })}

        </ul>
      </div>
    )
  }

  // show menu and submenu

  const RenderSubMenu = (props) => {

    const {

      index,
      iter

    } = props;


    if (index.subCategory.length == 0) {
      return (
        <Link onClick={handleAnchorClick} key={iter} to={`/shop/${index._id}`} state={{ category: index }}>
          <li className="liDropdown">{index.name}</li>
        </Link>
      )
    }
    else {
      return (
        <div key={iter}
          className="subMenu" value={iter}
          onMouseEnter={(e) => handleSubMouseEnter(e, iter)}
          onMouseLeave={handleSubMouseLeave}
        >
          

            <li className="liDropdown"><img className="downArrowImg" src={leftArrow}></img>{index.name}</li>

          

          {subIter == iter && isSubDropdownVisible && <SubDropdownMenu index={index} iter={iter} catName={index.name} />}
        </div>
      )
    }

  }

  const handleAnchorClick = () => {
    setDropdownVisible(false);
  }


  // dropdown menu

  const DropdownMenu = () => {
    return (
      <div className="dropdown-menu">
        <ul className="ulDropdown">
        <Link onClick={handleAnchorClick} to={`/`} state={{ category: { name: "All Products", _id: "all" } }}>
            <li className="liDropdown">Home</li>
            
          </Link>
        <Link onClick={handleAnchorClick} to={`/shop/all`} state={{ category: { name: "All Products", _id: "all" } }}>
            <li className="liDropdown">All Products</li>
            
          </Link>
          <Link onClick={handleAnchorClick} to={`/shop/all`} state={{ category: { name: "On Sale", _id: "sale" } }}>
            <li className="liDropdown">On Sale</li>
            
          </Link>

          {category.map((index, iter) => {
            return (
              <RenderSubMenu
                key={iter}
                index={index}
                iter={iter}
              />
            )
          })}
          
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
      <header className="headerMobile">
        <h1>My Store</h1>
       

        <div
          className="menu"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button className="buttonDropdown">Shop</button>

          {isDropdownVisible && <DropdownMenu />}
        </div>
        <Link className="heading" to="/cart">
          <div className="cartContainer"><span data-testid="cartNumber" className="itemNumber">{itemNumber}</span><img className="shoppingCart" src={shoppingCart}></img></div>

        </Link>
      </header>
      <div className="mobileSearch">
        <form onSubmit={handleSearchSubmit}>
          <div className="searchContainer">
            <input className="searchInput" type="text" name="search" placeholder="search our products">
            </input>
            <input className="searchSubmit" type="image" src={search}></input>
          </div>
        </form>
      </div>
    </div>
  )

}

export { HeaderMobile }
