import { Link } from "react-router-dom";
import CartItems from '../reusedComponents/CartItems'

const Summary = (props) => {

  const {

    order,
    setOrder,
    cartState,
    cartItems


  } = props;


  let orderNum = Number(order.price)

  let orderTotal = orderNum + order.shipping


  return (
    <div className="summaryContainer">
      <h1>Order Summary</h1>

      {cartItems.map((data) => {

        let url = `https://shoppingapi.fly.dev/${data.image}`

        return (

          <div className='cart2' key={data.id}>
            <div className='cartCont'>
              <CartItems
                data={data}
              />
            </div>
          </div>

        )
      })}
      <div className="orderContainer">
        <p className="pItems">{order.firstName} {order.lastName}</p>
        <p className="pItems">{order.address1}</p>
        <p className="pItems">{order.address2}</p>
        <p className="pItems">{order.town}</p>
        <p className="pItems">{order.state}</p>
        <p className="pItems">{order.email}</p>
        <p className="pItems">subtotal: {(order.price / 100).toFixed(2)}</p>
        <p className="pItems">shipping: {(order.shipping / 100).toFixed(2)}</p>
        <p className="total">order total: {(orderTotal / 100).toFixed(2)}</p>
      </div>
      <div className="summarySubmit">
        <Link to="/checkout">
          <button type="button">
            Proceed to Payment
          </button>
        </Link>
      </div>
    </div >


  );
};

export default Summary;