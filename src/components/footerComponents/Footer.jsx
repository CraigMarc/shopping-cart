import { Link } from "react-router-dom";

function Footer () {
return (
    <footer>
        <div className="footerContainer">
        <Link to="/contact">
        <p>Contact us</p>
        </Link>
        <Link to="/order_status">
        <p>Check order status</p>
        </Link>
        </div>
    </footer>
)

}

export { Footer }