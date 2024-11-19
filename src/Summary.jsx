const Summary = (props) => {

  const {

    order,
    setOrder,
    cartState,
    cartItems


  } = props;

  let orderTotal = order.price + order.shipping

// add other stuff and fix total when switch api ***********************
  return (
    <div className="error">
      <h1>Order Summary</h1>

{cartItems.map((data) => {

return (

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