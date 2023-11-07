import { Link } from "react-router-dom";
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
            <Link className="heading" to="/">
                <div>Home</div>
            </Link>
            <Link className="heading" to="/shop">
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
