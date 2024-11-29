import { useEffect } from 'react'
import { useLocation } from "react-router-dom";

const Success = (props) => {

  const {

    cartItems,
    order

  } = props;

  const search = useLocation().search;
  const firstName = new URLSearchParams(search).get('firstname');
  const lastName = new URLSearchParams(search).get('lastname');
  const email = new URLSearchParams(search).get('email');
  const address1 = new URLSearchParams(search).get('address1');
  const address2 = new URLSearchParams(search).get('address2');
  const town = new URLSearchParams(search).get('town');
  const state = new URLSearchParams(search).get('state');
  const zip = new URLSearchParams(search).get('zip');
  const itemNumber = new URLSearchParams(search).get('itemnumber');
  

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
      let weightIter = "weigth" + i
      let widthIter = "title" + i

      const price = new URLSearchParams(search).get(priceIter);
      const quantity = new URLSearchParams(search).get(quantityIter);
      const id = new URLSearchParams(search).get(idIter);
      const height = new URLSearchParams(search).get(heightIter);
      const image = new URLSearchParams(search).get(imageIter);
      const length = new URLSearchParams(search).get(lengthIter);
      const title = new URLSearchParams(search).get(titleIter);
      const total = new URLSearchParams(search).get(totalIter);
      const weight = new URLSearchParams(search).get(weightIter);
      const width = new URLSearchParams(search).get(widthIter);


productArray.push({price: price, quantity: quantity, id: id, height: height, image: image, length: length, title: title, total: total, weight: weight, width: width })

    }
    return productArray
  }


let productArray = createProductArray()

console.log(productArray)
 
  //submit new product

  async function newOrder() {
    await fetch(`http://localhost:3000/users/newOrder`, {
      method: 'Post',
      body: JSON.stringify({

        firstName: order.firstName,
        lastName: order.lastName,
        email: order.email,
        address1: order.address1,
        address2: order.address2,
        town: order.town,
        state: order.state,
        zip: order.zip,
        orderCost: order.price,
        shippingCost: order.shipping,
        productsArray: order.items,

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

  useEffect(() => {
    newOrder();
  }, [])


  return (
    <div className="container">
      <button>Successfully Paid</button>
      <p>Your order is being prepared and you will receive a confirmation email, Thank you for shopping.</p>
    </div>
  );
};

export default Success;