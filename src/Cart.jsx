import { Header } from './Header'


function Cart(props) {

    const {

        cartItems,

    } = props;
    console.log(cartItems)

    function handleDelete() {

    }

    function grandTotal(cartItems) {
        let cartTotal = 0
        for (let i = 0; i < cartItems.length; i++) {
            cartTotal = cartItems[i].total + cartTotal
        }
        return cartTotal
    }

    let cartGrandTotal = (Math.round(grandTotal(cartItems) * 100) / 100).toFixed(2);
    

    const listCartItems = cartItems.map(data =>
        <div key={data.id}>
            <p>{data.title}</p>
            <p>{data.quantity}</p>
            <p>{data.total}</p>
           
            <div className="deleteButtonContainer">
                <button className="delete" value={data.id} onClick={handleDelete}>delete</button>

            </div>

        </div>

    )


    return (
        <div>
            <Header
            />
            <p>shopping cart</p>
            <div>{listCartItems}</div>
            <div>{cartGrandTotal}</div>
        </div>
    )


}

export default Cart