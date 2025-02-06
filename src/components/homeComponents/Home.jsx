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

  function RenderSale() {
    const saleData = apiItems.filter((product) => product.sale_percent > 0)

    if (saleData.length > 0) {
      let urlSale = `http://localhost:3000/${saleData[0].colorArray[0].images[0]}`
      return (
        <div className="categoryContainer">
          <h2>Check out our sale items</h2>

          <div className="categoryContainer2">
            <Link to={`/shop/all`} state={{ category: { name: "On Sale", _id: "sale" } }}>

              <div className="homeLinkContainer">
                <img className="img" alt="no image available" src={urlSale}></img>
              </div>
            </Link>

          </div>
        </div>
      )
    }
  }

  // render page


  return (
    <div>
      {window.innerWidth > 600 ? <Header cartItems={cartItems}
        category={category} /> : <HeaderMobile cartItems={cartItems}
          category={category} />}
      <div className="homeContainer">
        <RenderSale />
        <div className="categoryContainer">
          <h2>Shop by category</h2>
          <div className="categoryContainer2">
            {category.map((index, iter) => {
              let url = `http://localhost:3000/${index.image}`
              return (
                <Link key={iter} to={`shop/${index._id}`} state={{ category: index }}>
                  <div className="homeLinkContainer">
                    <h3>{index.name}</h3>
                    <img className="img" alt="no image available" src={url}></img>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
        <div className="categoryContainer">
          <h2>Shop by brand</h2>
          <div className="categoryContainer2">
            {brand.map((index, iter) => {
              let url = `http://localhost:3000/${index.image}`
              return (
                <Link key={iter} to={`shop/${index._id}`} state={{ category: index }}>
                  <div className="homeLinkContainer">
                    <h3>{index.name}</h3>
                    <img className="img" alt="no image available" src={url}></img>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
        <Footer />
      </div>
    </div>

  )



};

export default Home;