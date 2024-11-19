import { Header } from './Header'
import Checkout from './Checkout'
import { Link } from "react-router-dom";
import { useEffect } from "react";


function Cart(props) {

    const {

        cartItems,
        setCartItems,
        cartState,
        setCartState,

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
                <h1>cart is empty</h1>
            </div>
        )
    }

    function grandTotal(cartItems) {
        let cartTotal = 0
        for (let i = 0; i < cartItems.length; i++) {
            let toNumber = Number(cartItems[i].total)
            cartTotal = toNumber + cartTotal
        }
        
        return cartTotal
    }

    let cartGrandTotal = grandTotal(cartItems)
    let cartGrandTotalRound = Number(cartGrandTotal).toFixed(2);

    useEffect(() => {
        setCartState(cartGrandTotalRound)
      }, [cartItems]); 
   

    const listCartItems = cartItems.map(data =>
        <div className='cart2' key={data.id}>
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


    return (
        <div>
            <Header
                cartItems={cartItems}
            />

            <div className='checkoutContainer'>
                <h1>Shopping Cart</h1>
                <div>{listCartItems}</div>
                <div className='subTotal'>Subtotal: ${cartState}</div>

                <div className='checkoutButtons'>
                <Link to="/">
                    <button>Continue Shopping</button>
                </Link>

                <Link to="/address">
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