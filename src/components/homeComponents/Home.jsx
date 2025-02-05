import { Link } from "react-router-dom";
import { Header } from '../headerComponents/Header'
import { HeaderMobile } from '../headerComponents/HeaderMobile'
import { useState, useEffect } from 'react'
import { Footer } from '../footerComponents/Footer'

const Home = (props) => {

  const {

    apiItems,
    setApiItems,
    cartItems,
    setCategory,
    setBrand,
    category,
    brand


  } = props;

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)

  const fetchInfo = async () => {
    //setLoading(true)

    try {
      //return fetch(picUrl)

      const [apiProducts, apiCategory, apiBrand] = await Promise.all([
        await fetch('http://localhost:3000/users/published'),
        await fetch('http://localhost:3000/users/category'),
        await fetch('http://localhost:3000/users/brand')
      ]);



      const productData = await apiProducts.json();
      const categoryData = await apiCategory.json();
      const brandData = await apiBrand.json();

      setApiItems(productData)
      setCategory(categoryData)
      setBrand(brandData)
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
    <div className="netError">

      <h2>A network error was encountered please try again later</h2>
    </div>
  )

  if (loading) return <p>Loading...</p>;

  // render page


  return (
    <div>
      {window.innerWidth > 800 ? <Header cartItems={cartItems}
        category={category}/> : <HeaderMobile cartItems={cartItems}
        category={category}/>}
      

      <div className="categoryContainer">
        <h3>Categories</h3>
        {category.map((index, iter) => {
          let url = `http://localhost:3000/${index.image}`
          return (
            <Link key={iter} to={`shop/${index._id}`} state={{category:index}}>
            <div>
            <img className="img" alt="no image available" src={url}></img>
            <p>{index.name}</p>
            </div>
            </Link>
          )
        })}

      </div>
      <div className="categoryContainer">
        <h3>Brands</h3>
        {brand.map((index, iter) => {
          let url = `http://localhost:3000/${index.image}`
          return (
            <Link key={iter} to={`shop/${index._id}`} state={{category: index}}>
            <div>
            <img className="img" alt="no image available" src={url}></img>
            <p>{index.name}</p>
            </div>
            </Link>
          )
        })}

      </div>
      <Footer/>
    </div>

  )



};

export default Home;