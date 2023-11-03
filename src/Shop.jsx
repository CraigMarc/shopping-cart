import { Header } from './Header'
import { useState, useEffect } from 'react'


function Shop() {

    const [data, setData] = useState([1,2,3,4])

    const fetchInfo = async (pics) => {
        //setLoading(true)
        if (pics == undefined) {
          pics = "mountains"
        }
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
    
      }
    
    
      useEffect(() => {
        fetchInfo();
      }, [])

     console.log(data)
    
      
    return (
        <div>
            <Header
            data={data}
            />

            <p>shop</p>
            
        </div>
    )


}

export default Shop