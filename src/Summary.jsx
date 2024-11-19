const Summary = (props) => {

  const {

    order,
    setOrder,
    cartState,
    cartItems


  } = props;

  let orderTotal = order.price + order.shipping

  console.log(order)
// add other stuff and fix total when switch api ***********************
  return (
    <div className="error">
      <h1>Order Summary</h1>

      {order.items.map((index) => {

        return (

          <div key={index.id} className="product">

            <div id={index.id} className="card" >


              <p>{index.title}</p>


            </div>

          </div>

        )
      })}
      <p>{order.firstName} {order.lastName}</p>
      <p>{order.address1}</p>
      <p>{order.address2}</p>
      <p>{order.email}</p>
      <p>subtotal: {order.price}</p>
      <p>shipping: {order.shipping}</p>
      <p>order total: {orderTotal}</p>
    </div>
  );
};

export default Summary;