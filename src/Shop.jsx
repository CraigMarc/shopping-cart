import { Header } from './Header'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";



function Shop(props) {

  const {

    apiItems,
    setApiItems,
    cartItems

  } = props;

  if (apiItems == undefined) {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchInfo = async (pics) => {
      //setLoading(true)

      try {
        //return fetch(picUrl)
        const res = await fetch("https://fakestoreapi.com/products?limit=12")

        const productData = await res.json();
        //setData(productData)
        setApiItems(productData)

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