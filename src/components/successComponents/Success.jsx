import { useEffect, useRef } from 'react'
import { useLocation } from "react-router-dom";
import SizeAndColor from '../reusedComponents/SizeAndColor'

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
      let colorQuery = "color" + i
      let sizeQuery = "size" + i
      let sizeIndex = "sizeIter" + i
      let colorIndex = "colorIter" + i
      let sale_percentIter = "sale_percent" + i

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
      const color = new URLSearchParams(search).get(colorQuery);
      const size = new URLSearchParams(search).get(sizeQuery);
      const sizeIter = new URLSearchParams(search).get(sizeIndex);
      const sizeIterN = Number(sizeIter)
      const colorIter = new URLSearchParams(search).get(colorIndex);
      const colorIterN = Number(colorIter)
      const sale_percent = new URLSearchParams(search).get(sale_percentIter);
      const sale_percentN = Number(sale_percent)


      productArray.push({ price: priceN, quantity: quantityN, id: id, height: heightN, image: image, length: lengthN, title: title, total: totalN, weight: weightN, width: widthN, color: color, size: size, sizeIter: sizeIterN, colorIter: colorIterN, sale_percent: sale_percentN })

    }
    return productArray
  }

  

  // create email temp literals

  let productArray = createProductArray()
 

  let orderTotal = orderCostN + shippingCostN

  function orderTL() {
    let template = ""

    for (let i = 0; i < productArray.length; i++) {

      let priceEmail = 0
      

      if (!productArray[i].sale_percent) {
        priceEmail = (productArray[i].price / 100).toFixed(2)
       
      }

      else {
        priceEmail = ((productArray[i].price - (productArray[i].price * (productArray[i].sale_percent / 100)))/100).toFixed(2)
      }


      if (productArray[i].color != "false" & productArray[i].size != "false") {
        template = template +
          `
    ` +
          `
    ${productArray[i].title} 
    Quantity: ${productArray[i].quantity} 
    Price: $${priceEmail}
    Color: ${productArray[i].color}
    Size: ${productArray[i].size}`

      }

      if (productArray[i].size != "false" && productArray[i].color == "false") {
        template = template +
          `
    ` +
          `
    ${productArray[i].title} 
    Quantity: ${productArray[i].quantity} 
    Price: $${priceEmail}
    Size: ${productArray[i].size}`

      }

      if (productArray[i].color != "false" && productArray[i].size == "false") {
        template = template +
          `
  ` +
          `
  ${productArray[i].title} 
  Quantity: ${productArray[i].quantity} 
  Price: $${priceEmail}
  Color: ${productArray[i].color}`

      }

      if (productArray[i].color == "false" && productArray[i].size == "false") {
        template = template +
          `
` +
          `
${productArray[i].title} 
Quantity: ${productArray[i].quantity} 
Price: $${priceEmail}
    `


      }
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
    await fetch(`https://shoppingapi.fly.dev/users/email`, {
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
    await fetch(`https://shoppingapi.fly.dev/users/newOrder`, {
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
        sessionStorage.removeItem("state:apiItems");
        sessionStorage.removeItem("state:cartItems");
        sessionStorage.removeItem("state:cartState");
        sessionStorage.removeItem("state:category");
        sessionStorage.removeItem("state:brand");
        sessionStorage.removeItem("state:order");
       
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

  // render sale price 

  function RenderPrice(props) {

    const {

      index

    } = props;

    let priceDiv = (index.price / 100).toFixed(2)
    let salePrice = (priceDiv - (priceDiv * (index.sale_percent / 100))).toFixed(2)

    if (!index.sale_percent) {
      return (
        <p><span className='ccSpan'>price:</span> ${priceDiv}</p>
      )
    }
    else {
      return (
        <p><span className='ccSpan'>price:</span> ${salePrice}</p>
      )
    }
  }


  return (
    <div className="successContainer">

      <div>
        <h3>Order Summary:</h3>
        <p><span className='ccSpan'>order number:</span> {orderId}</p>

        {productArray.map((index, iter) => {

          return (
            <div className='orderSummary' key={iter}>
              <p><span className='ccSpan'>item:</span> {index.title}</p>
              <p><span className='ccSpan'>quantity:</span> {index.quantity}</p>
              <SizeAndColor
                data={index}
              />
              <RenderPrice
                index={index}
              />
            </div>
          )
        })}
        <p><span className='ccSpan'>shipping:</span> ${(shippingCostN / 100).toFixed(2)}</p>
        <p className='totalSum'>total: ${(orderTotal / 100).toFixed(2)}</p>
      </div>
      <p>Your order is being prepared and you should receive a confirmation email shortly.</p>
      <p>Thank you for shopping.</p>
    </div>

  );
};

export default Success;