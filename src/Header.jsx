import { Link } from "react-router-dom";
import './header.css'
import shoppingCart from './assets/shoppingCart.png';


function Header(props) {

    const {

        cartItems

    } = props;

    let itemNumber = 0
    if (cartItems != undefined) {
        itemNumber = cartItems.length

    }

    
    return (
        <div className="headerDiv"> 
        <header>
            <Link to="/">
                <div>Home Page</div>
            </Link>
            <Link to="/shop">
                <div>Shop</div>
            </Link>
            <Link to="/cart">
                <div className="cartContainer">{itemNumber} <img className="shoppingCart" src={shoppingCart}></img></div>

            </Link>
        </header>
        </div>
    )

}

export { Header }
