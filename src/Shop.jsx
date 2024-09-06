import { Header } from './Header'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

import image1 from './assets/images/image1.jpg';
import image2 from './assets/images/image2.jpg';
import image3 from './assets/images/image3.jpg';
import image4 from './assets/images/image4.jpg';
import image5 from './assets/images/image5.jpg';
import image6 from './assets/images/image6.jpg';
import image7 from './assets/images/image7.jpg';
import image8 from './assets/images/image8.jpg';
import image9 from './assets/images/image9.jpg';
import image10 from './assets/images/image10.jpg';
import image11 from './assets/images/image11.jpg';
import image12 from './assets/images/image12.jpg';


function Shop(props) {

  const {

    apiItems,
    setApiItems,
    cartItems

  } = props;

  // if api goes down use data in assets file uncomment and comment out fetch change setApiItems in app.jsx
//<img className="img" src={imageArray[index.id - 1]}></img>

//let imageArray = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12]
 


  if (apiItems == undefined) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchInfo = async (pics) => {
      //setLoading(true)

      try {
        //return fetch(picUrl)
       // const res = await fetch("https://fakestoreapi.com/products?limit=12")
        const res = await fetch("https://fakestoreapi.in/api/products?limit=12")

        const productData = await res.json();
       console.log(productData)
        //setData(productData)
        setApiItems(productData.products)

      }
      

      catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
        //add error message to dom
        setError("true")

      }
      setLoading(false)

    }


    useEffect(() => {
      fetchInfo();
    }, [])

   

    //display error and loading for api call

    if (error) return (
      <div>
        <Header />
        <p>A network error was encountered</p>
      </div>
    )

    if (loading) return <p>Loading...</p>;

  }


  return (
    <div>
      <Header
        cartItems={cartItems}
      />
      <div className='shopContainer'>
        <h1>Our Products</h1>
        <div className="productCard">

          {apiItems.map((index) => {

            return (

              <div key={index.id} className="product">
                <Link  to="/product" state={index.id}>
                  <div id={index.id} className="card" >

                    <img className="img" src={index.image}></img>
                    <p>{index.title}</p>
                    <p>${index.price}</p>

                  </div>
                </Link>
              </div>

            )
          })}

        </div>
      </div>
    </div>
  )


}

export default Shop