import { Header } from './Header'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom";


function Shop() {

  const [data, setData] = useState()
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInfo = async (pics) => {
    //setLoading(true)

    try {
      //return fetch(picUrl)
      const res = await fetch("https://fakestoreapi.com/products?limit=12")

      const productData = await res.json();
      setData(productData)


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

  //console.log(data)
  
  //display error and loading for api call
  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Header
        data={data}
      />

      <div className="product card">
      <Link to="/product">
        {data.map((index) => {

          return (
            <div key={index.id}  id={index.id} className="card" >

              <img className="img" src={index.image}></img>
              <p>{index.title}</p>
              <p>${index.price}</p>

            </div>
          )
        })}
        </Link>
      </div>

    </div>
  )


}

export default Shop