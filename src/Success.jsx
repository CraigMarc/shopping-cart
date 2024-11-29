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
    const items = new URLSearchParams(search).get('items');


    console.log({ firstName, lastName, email, address1, address2, town, state, zip, items })

 //submit new product
 
 async function newOrder () {
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