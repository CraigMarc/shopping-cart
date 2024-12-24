import { Link } from "react-router-dom";
import shoppingCart from '../../assets/shoppingCart.png';


function Header(props) {

    const {

        cartItems

    } = props;

    

    let itemNumber = 0
    if (cartItems != undefined) {
       
        for (let i=0; i<cartItems.length; i++){
             let toNumber = Number(cartItems[i].quantity)
            itemNumber = itemNumber + toNumber
        }

    }

    
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
        </header>
        </div>
    )

}

export { Header }
