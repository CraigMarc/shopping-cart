import { Header } from './Header'
import { useState, useEffect } from 'react'


function Shop() {

  const [data, setData] = useState()
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInfo = async (pics) => {
    //setLoading(true)

    try {
      //return fetch(picUrl)
      const res = await fetch("https://fakestoreapi.com/products?limit=10")

      const productData = await res.json();
      setData(productData)


    }

    catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
      //add error message to dom
      //setError("true")
      //setFindPicsState(true)
    }
    setLoading(false)

  }


  useEffect(() => {
    fetchInfo();
  }, [])

  console.log(data)
  
  if (error) return <p>A network error was encountered</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Header
        data={data}
      />

      <div className="product card">
        {data.map((index) => {

          return (
            <div key={index.id}  id={index.id} className="card" >

              <img className="img" src={index.image}></img>
              <p>{index.title}</p>
            </div>
          )
        })}
      </div>

    </div>
  )


}

export default Shop