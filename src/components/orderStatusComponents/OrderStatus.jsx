import { Header } from '../headerComponents/Header'
import { useState } from 'react'
import SizeAndColor from '../reusedComponents/SizeAndColor'

function OrderStatus(props) {

  const {

    cartItems,
    category,

  } = props;

  const [orderStatus, setOrderStatus] = useState(null)

  //submit function

  const handleSubmit = async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());


    //send form data
    await fetch(`http://localhost:3000/users/order_status`, {
      method: 'Post',
      body: JSON.stringify({
        email: data.email,

      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },

    })



      .then((response) => response.json())
      .then((data) => {
        setOrderStatus(data)
      })


      .catch((err) => {
        console.log(err.message);
      });


  }

  // render sale price 

  function RenderPrice(props) {

    const {

      index

    } = props;

    let priceDiv = (index.price / 100).toFixed(2)
    let salePrice = (priceDiv - (priceDiv * (index.sale_percent / 100))).toFixed(2)

    if (index.sale_percent == 0) {
      return (
        <p>price: ${priceDiv}</p>
      )
    }
    else {
      return (
        <p>price: ${salePrice}</p>
      )
    }
  }

  function DisplayOrderItems(props) {

    const {

      index

    } = props;

    return (
      <div>
        {index.productsArray.map((data) => {

          return (

            <div className='cart2' key={data.id}>
              <div className='cartCont'>
                <p>item: {data.title}</p>
                <SizeAndColor
                  data={data}
                />
                <RenderPrice
                  index={data}
                />

              </div>
            </div>

          )
        })}
      </div>
    )
  }

  console.log(orderStatus)
  function RenderOrderStatus(props) {
    const {

      index

    } = props;

    if (index.shipped == true) {
      return (
        <p>You order has been shipped the tracking number is 1Z1325425FW</p>
      )
    }
    else {
      return (
        <p>We have recieved your order and will be shipping it shortly.</p>
      )
    }


  }


  if (orderStatus == null) {
    return (
      <div>
        <Header
          cartItems={cartItems}
          category={category}
        />
        <div className='orderStatusContainer'>
          <h3>Order Status</h3>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Email</p>
              <input className="titleInput" type="text" name="email" />
            </label>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
  if (orderStatus.length == 0) {
    return (
      <div>
        <Header
          cartItems={cartItems}
          category={category}
        />
        <div className='orderStatusContainer'>
          <h3>No orders were found that matched this email.</h3>
        </div>
      </div>
    )
  }
  else {
    return (
      <div>
        <Header
          cartItems={cartItems}
          category={category}
        />
        <div className='orderStatusContainer'>
          <h3>Your Orders</h3>

          {orderStatus.map((index, iter) => {

            return (
              <div>
                <p>order number: {index.orderId}</p>
                <DisplayOrderItems
                  index={index}
                />
                <RenderOrderStatus
                  index={index}
                />
              </div>
            )
          })}



        </div>
      </div>
    )
  }
}

export default OrderStatus;