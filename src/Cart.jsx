import { Header } from './Header'


function Cart(props) {

    const {
        
        cartItems,

    } = props;
    console.log(cartItems)


    return (
        <div>
            <Header
            />
            <p>shopping cart</p>

        </div>
    )


}

export default Cart