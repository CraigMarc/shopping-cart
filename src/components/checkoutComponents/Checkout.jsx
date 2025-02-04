import { Header } from '../headerComponents/Header'
import { useLocation, useNavigate } from 'react-router-dom';

// before using backend and payment
/*
function Checkout(props) {

    const {

       
        cartItems
    
      } = props;


    return (
        <div>
            <Header
                cartItems={cartItems}
            />
            <div className='finalContainer'>
            <h2>Not a real store so didn't make the checkout functional</h2>
            </div>

        </div>
    )

}*/
/*

// code for old stripe api 


import React from "react";
//import "./Pay.css";
import StripeCheckout from "react-stripe-checkout";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const KEY = "pk_test_51Q0OsODmVJRVlYWkkRMV6XZ4NcD9VOVBEdsCb0ypBuBtQN4NL7bDDZFJETo7JwD7XA2uYNbTVqkk3A3Z115I1zaY00RVrJ1opv"


const Checkout = () => {
    const [stripeToken, setStripToken] = useState(null);
    const navigate = useNavigate();

    const onToken = (token) => {
       // console.log(token);
        setStripToken(token);
    };

    useEffect(() => {
        const makeRequest = async () => {
            
            try {
             
               const response = await fetch('http://localhost:3000/users/payment', {

                    method: 'POST',
                    body: JSON.stringify({
                        tokenId: stripeToken.id,
                        amount: 2000,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                //console.log(response.data);
                navigate("/success");
            } catch (err) {
                console.log(err);
            }
        };

        stripeToken && makeRequest();
    }, [stripeToken]);

    return (
        <div className="container">
            {stripeToken ? (
                <span>Processing. Please Wait</span>
            ) : (
                <StripeCheckout
                    name="My Store"
                    image="https://avatars.githubusercontent.com/u/1486366?v=4"
                    billingAddress
                    shippingAddress
                    description=" Your total is $20"
                    amount={2000}
                    token={onToken}
                    stripeKey={KEY}
                >
                    <button>Pay now</button>
                </StripeCheckout>
            )}
        </div>
    );
};*/
/*
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

export default function App() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  );
};*/

// code for new stripe api

import { useStripe, useElements, PaymentElement, CardElement } from '@stripe/react-stripe-js';
import { useState } from "react";

const Checkout = (props) => {


  const {

    cartState,
    order,
    oosRef,
    setApiItems

  } = props;


  const navigate = useNavigate();

  function objectToQueryString(obj, iter) {
    return Object.keys(obj)
      .map(key => `${encodeURIComponent(key + iter)}=${encodeURIComponent(obj[key])}`)
      .join('&');
  }

  let queryString = ""
  let itemNumber = order.items.length

  for (let i = 0; i < order.items.length; i++) {
    queryString = queryString + "&" + objectToQueryString(order.items[i], i);

  }

  let totalPrice = order.shipping + cartState
  

  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [errorServer, setErrorServer] = useState(null);

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
    console.log('hello')
    return (
    <div className='netError'>
    <h3>A network error was encountered try again later.</h3>
  </div>
    )
  }

// function to make payment


  async function callStripe() { 

try {
    const response = await fetch('http://localhost:3000/users/intent', {
    
      method: 'POST',
      body: JSON.stringify({
        currency: 'usd',
        amount: totalPrice,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      
         })
       

    const { client_secret: clientSecret } = await response.json();

    // Confirm the PaymentIntent using the details collected by the Payment Element

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:5173/success?orderId=${order.orderId}&firstname=${order.firstName}&lastname=${order.lastName}&email=${order.email}&address1=${order.address1}&address2=${order.address2}&town=${order.town}&state=${order.state}&zip=${order.zip}&price=${order.price}&shipping=${order.shipping}&items=${order.items}&itemnumber=${itemNumber}${queryString}`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      
      handleError(error);

    } else {

      // Your customer is redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer is redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }
  catch {
    navigate('/network_error')
  }
    
  }


  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();


    if (!stripe) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);

    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    // make api call to make sure items are in stock

    await fetch("http://localhost:3000/users/published")


      .then((response) => response.json())
      .then((data) => {

    // subtract from inventory if in stock
   

        function buildOosArray() {

          let oosArrayAll = []

          for (let i = 0; i < order.items.length; i++) {
            
            let oosArray = data.filter(function (obj) {
              return obj._id == order.items[i].id
            }
            );
           
            if (oosArray[0].colorArray[order.items[i].colorIter].sizeArray[order.items[i].sizeIter].quantity < order.items[i].quantity ) {
             
              oosArrayAll.push({oosArray: oosArray[0], colorIter: order.items[i].colorIter, sizeIter: order.items[i].sizeIter})
            
            }
          }
         
          return oosArrayAll
        }
  
        // stripe logic here if (inventory < order) send to out of stock check whole product array

        if (buildOosArray().length > 0) {
          oosRef.current = buildOosArray()

          //if item out of stock update apiItems state
          setApiItems(data)
          
          navigate('/oos')

        }
        else {

          // call function to make payment
          callStripe()
        }
      })
      .catch((err) => {
        console.log(err.message);
        setErrorServer(true)
      })

  };

  if (errorServer) return (
    <div className='netError'>
      <h3>A network error was encountered try again later.</h3>
    </div>
  )

  
  return (
    <form className='paymentForm' onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe || loading}>
        Submit Payment
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
}



export default Checkout
