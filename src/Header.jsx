import { Link } from "react-router-dom";

function Header() {

    return (
        <header>
            <Link to="/home">
                <div>home page</div>
            </Link>
            <Link to="/shop">
                <div>shop</div>
            </Link>
            <Link to="/cart">
                <div>shopping cart</div>
            </Link>
        </header>
    )

}

export { Header };
