import { Header } from './Header'
import Checkout from './Checkout'
import { Link } from "react-router-dom";

function Cart(props) {

    const {

        cartItems,
        setCartItems,

    } = props;




    const handleDelete = (event) => {
        const id = event.target.value;
        const newData = cartItems.filter((item) => item.id !== id)
        setCartItems(newData);

    }

    if (cartItems.length == 0) {
        return (
            <div className='checkoutContainer'>
                <Header />
                <p>cart is empty</p>
            </div>
        )
    }

    function grandTotal(cartItems) {
        let cartTotal = 0
        for (let i = 0; i < cartItems.length; i++) {
            var toNumber = Number(cartItems[i].total)
            cartTotal = toNumber + cartTotal
        }
        return cartTotal
    }

    let cartGrandTotal = grandTotal(cartItems)
    let cartGrandTotalRound = Number(cartGrandTotal).toFixed(2);


    const listCartItems = cartItems.map(data =>
        <div key={data.id}>
            <div className='cartCont'>
                <div className='cartCont1'>
                    <p>{data.title}</p>
                    <img className="checkoutImg" src={data.image}></img>
                </div>
                <div className='cartCont2'>
                    <p>quantity: {data.quantity}</p>
                    <p>${data.total}</p>
                </div>
                <div className="deleteButtonContainer">
                <button className="delete" value={data.id} onClick={handleDelete}>delete</button>

            </div>
            </div>
            

        </div>

    )

    function handleCheckout() {
        return (
            <div>
                <Checkout />
            </div>
        )
    }


    return (
        <div>
            <Header
                cartItems={cartItems}
            />

            <div className='checkoutContainer'>
                <h1>Shopping Cart</h1>
                <div>{listCartItems}</div>
                <div className='subTotal'>Subtotal: ${cartGrandTotalRound}</div>

                <div className='checkoutButtons'>
                <Link to="/shop">
                    <button>Continue Shopping</button>
                </Link>

                <Link to="/checkout">
                    <button type="button">
                        Check Out
                    </button>
                </Link>
                </div>

            </div>


        </div>
    )


}

export default Cart