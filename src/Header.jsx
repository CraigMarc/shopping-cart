import { Link } from "react-router-dom";


function Header(props) {

    const {

        cartItems

    } = props;

    let itemNumber = 0
    if (cartItems != undefined) {
        itemNumber = cartItems.length

    }

    
    return (
        <header>
            <Link to="/">
                <div>home page</div>
            </Link>
            <Link to="/shop">
                <div>shop</div>
            </Link>
            <Link to="/cart">
                <div>{itemNumber} shopping cart</div>

            </Link>
        </header>
    )

}

export { Header }
