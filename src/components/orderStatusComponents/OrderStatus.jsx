import { Header } from '../headerComponents/Header'
import { HeaderMobile } from '../headerComponents/HeaderMobile'
import { useState } from 'react'
import SizeAndColor from '../reusedComponents/SizeAndColor'
import { useNavigate } from 'react-router-dom';

function OrderStatus(props) {

  const {

    cartItems,
    category,
    apiItems

  } = props;

  const [orderStatus, setOrderStatus] = useState(null)

  const navigate = useNavigate();

  //submit function

  const handleSubmit = async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());


    //send form data
    await fetch(`https://shoppingapi.fly.dev/users/order_status`, {
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
        navigate('/network_error')
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
      <div className='osOrder'>
        {index.productsArray.map((data) => {

          return (

            <div  key={data.id}>
              <div >
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


  function RenderOrderStatus(props) {
    const {

      index

    } = props;

    if (index.shipped == true) {
      return (
        <p className='osMessage'>You order has been shipped the tracking number is 1Z1325425FW</p>
      )
    }
    else {
      return (
        <p className='osMessage'>We have recieved your order and will be shipping it shortly.</p>
      )
    }


  }

  function RenderContent() {
    if (orderStatus == null) {
      return (
        <div>
          <h3>Submit your email to check your order status</h3>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Email</p>
              <input className="osInput" type="email" name="email" />
            </label>
            <div className='osSubmit'>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      )
    }
    if (orderStatus.length == 0) {
      return (
        <h3>No orders were found that matched this email.</h3>
      )
    }
    else {
      return (
        <div>
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
      )
    }
  }



  return (
    <div>
      {window.innerWidth > 630 ? <Header cartItems={cartItems} apiItems={apiItems}
        category={category} /> : <HeaderMobile cartItems={cartItems}
          category={category} />}
      <div className='orderStatusContainer'>
        <RenderContent />
      </div>
    </div>
  )



}

export default OrderStatus;