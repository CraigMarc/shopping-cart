import { Header } from '../headerComponents/Header'


function OrderStatus(props) {

    const {

        cartItems,
        category,

    } = props;

    return (
        <div>
            <Header
                cartItems={cartItems}
                category={category}
            />
            <div className='orderStatusContainer'>
            <h3>Order Status</h3>
            </div>
        </div>
    )
}

export default OrderStatus;