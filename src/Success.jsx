const Success = () => {

 //submit new product
 /*
 async function newOrder () {
  await fetch(`http://localhost:3000/users/newOrder`, {
    method: 'Post',
    body: JSON.stringify({

      firstName: "craig",
      lastName: "mar",
      email: "cm@yahoo.com",
      address1: "10 e ave",
      address2: "apt 1",
      town: "here",
      state: "nj",
      zip: "07701",
      orderCost: 10.00,
      shippingCost: 5.00,
      productsArray: order,

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


}*/




    return (
      <div className="container">
        <button>Successfully Paid</button>
        <p>Your order is being prepared and you will receive a confirmation email, Thank you for shopping.</p>
      </div>
    );
  };
  
  export default Success;