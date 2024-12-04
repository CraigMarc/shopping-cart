import { Link } from "react-router-dom";

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
    <div className="error">
      <h1>Order Summary</h1>

      {cartItems.map((data) => {

        let url = `http://localhost:3000/uploads/${data.image}`

        return (

          <div className='cart2' key={data.id}>
            <div className='cartCont'>
              <div className='cartCont1'>
                <p>{data.title}</p>
                <img className="checkoutImg" src={url}></img>
              </div>
              <div className='cartCont2'>
                <p>quantity: {data.quantity}</p>
                <p>${data.total}</p>
              </div>

            </div>


          </div>

        )
      })}
      <div className="orderContainer">
        <p className="pItems">{order.firstName} {order.lastName}</p>
        <p className="pItems">{order.address1}</p>
        <p className="pItems">{order.address2}</p>
        <p className="pItems">{order.email}</p>
        <p className="pItems">subtotal: {order.price}</p>
        <p className="pItems">shipping: {order.shipping}</p>
        <p className="total">order total: {orderTotal}</p>
      </div>
      <Link to="/checkout">
        <button type="button">
          Proceed to Payment
        </button>
      </Link>

    </div>


  );
};

export default Summary;