import { useEffect, useRef } from 'react'
import { useLocation } from "react-router-dom";

const Success = (props) => {

  const {

    cartItems,
    order

  } = props;

  const search = useLocation().search;
  const orderId = new URLSearchParams(search).get('orderId');
  const firstName = new URLSearchParams(search).get('firstname');
  const lastName = new URLSearchParams(search).get('lastname');
  const email = new URLSearchParams(search).get('email');
  const address1 = new URLSearchParams(search).get('address1');
  const address2 = new URLSearchParams(search).get('address2');
  const town = new URLSearchParams(search).get('town');
  const state = new URLSearchParams(search).get('state');
  const zip = new URLSearchParams(search).get('zip');
  const itemNumber = new URLSearchParams(search).get('itemnumber');
  const orderCost = new URLSearchParams(search).get('price');
  const orderCostN = Number(orderCost)
  const shippingCost = new URLSearchParams(search).get('shipping');
  const shippingCostN = Number(shippingCost)


  function createProductArray() {

    let productArray = []

    for (let i = 0; i < itemNumber; i++) {

      let priceIter = "price" + i
      let quantityIter = "quantity" + i
      let idIter = "id" + i
      let heightIter = "height" + i
      let imageIter = "image" + i
      let lengthIter = "length" + i
      let titleIter = "title" + i
      let totalIter = "total" + i
      let weightIter = "weight" + i
      let widthIter = "width" + i

      const price = new URLSearchParams(search).get(priceIter);
      const priceN = Number(price)
      const quantity = new URLSearchParams(search).get(quantityIter);
      const quantityN = Number(quantity)
      const id = new URLSearchParams(search).get(idIter);
      const height = new URLSearchParams(search).get(heightIter);
      const heightN = Number(height)
      const image = new URLSearchParams(search).get(imageIter);
      const length = new URLSearchParams(search).get(lengthIter);
      const lengthN = Number(length)
      const title = new URLSearchParams(search).get(titleIter);
      const total = new URLSearchParams(search).get(totalIter);
      const totalN = Number(total)
      const weight = new URLSearchParams(search).get(weightIter);
      const weightN = Number(weight)
      const width = new URLSearchParams(search).get(widthIter);
      const widthN = Number(width)

      productArray.push({ price: priceN, quantity: quantityN, id: id, height: heightN, image: image, length: lengthN, title: title, total: totalN, weight: weightN, width: widthN })

    }
    return productArray
  }

  // create email temp literals

  let productArray = createProductArray()

  let orderTotal = orderCostN + shippingCostN

  function orderTL() {
    let template = ""
    for (let i = 0; i < productArray.length; i++) {

      template = template +
        `
      ` +
        `
      ${productArray[i].title} 
      Quantity: ${productArray[i].quantity} 
      Price: $${(productArray[i].price / 100).toFixed(2)
        }`
    }

    template = template + `
    `
      + `  Shipping: $${(shippingCostN / 100).toFixed(2)}` + `

    ` +

      `Total: $${(orderTotal / 100).toFixed(2)}`

    return template
  }



  // send email

  async function sendEmail() {
    await fetch(`http://localhost:3000/users/email`, {
      method: 'Post',
      body: JSON.stringify({
        email: email,
        order_details: `Thank you for your order ${firstName}, it will be shipped shortly.,
        
        orderId: ${orderId}

        Order Summary:
        ${orderTL()}
        `,
        

      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })



      .then((response) => response.json())
      .then((data) => {
        //navigate('/')

      })


      .catch((err) => {
        console.log(err.message);


      });


  }


  //submit new product

  async function newOrder() {
    await fetch(`http://localhost:3000/users/newOrder`, {
      method: 'Post',
      body: JSON.stringify({

        orderId: orderId,
        firstName: firstName,
        lastName: lastName,
        email: email,
        address1: address1,
        address2: address2,
        town: town,
        state: state,
        zip: zip,
        orderCost: orderCost,
        shippingCost: shippingCost,
        productsArray: productArray,

      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })



      .then((response) => response.json())
      .then((data) => {
        //navigate('/')

      })


      .catch((err) => {
        console.log(err.message);


      });


  }

  const initialized = useRef(false)

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      newOrder();
      sendEmail()
    }
  }, [])

  
  return (
    <div className="successContainer">
     
      <p>Your order is being prepared and you will receive a confirmation email, Thank you for shopping.</p>
      <div>
        <h3>Order Summary:</h3>
        <p>order number: {orderId}</p>
       
        {productArray.map((index, iter) => {

          return (
            <div className='orderSummary' key={iter}>
              <p>item: {index.title}</p>
              <p>quantity: {index.quantity}</p>
              <p>price: ${(index.price / 100).toFixed(2)}</p>
            </div>
          )
        })}
        <p>shipping: ${(shippingCostN / 100).toFixed(2)}</p>
        <p className='totalSum'>total: ${(orderTotal / 100).toFixed(2)}</p>
      </div>
    </div>

  );
};

export default Success;