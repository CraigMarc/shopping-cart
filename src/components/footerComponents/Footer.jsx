import { Link } from "react-router-dom";

function Footer () {
return (
    <footer>
        <div className="footerContainer">
        <Link>
        <p>Contact us</p>
        </Link>
        <Link>
        <p>Check order status</p>
        </Link>
        </div>
    </footer>
)

}

export { Footer }