import { Link } from "react-router-dom";
import { Header } from '../headerComponents/Header'
import { HeaderMobile } from '../headerComponents/HeaderMobile'
import { useState, useEffect } from 'react'
import { Footer } from '../footerComponents/Footer'
import RingLoader from "react-spinners/RingLoader";

const Home = (props) => {


  const {

    apiItems,
    setApiItems,
    cartItems,
    setCategory,
    category,
    

  } = props;

  

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)

  const fetchInfo = async () => {
    //setLoading(true)

    try {
      //return fetch(picUrl)

      const [apiProducts, apiCategory] = await Promise.all([
        await fetch('https://shoppingapi.fly.dev/users/published'),
        await fetch('https://shoppingapi.fly.dev/users/category'),
       
      ]);


      const productData = await apiProducts.json();
      const categoryData = await apiCategory.json();
      

      setApiItems(productData)
      setCategory(categoryData)
     
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

  //if (loading) return <p>Loading...</p>;

  if (loading) return (
    
    <div className="loadingImage">
       <RingLoader
        color='black'
        loading={loading}
        
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
    
  )


  function RenderSale() {
    const saleData = apiItems.filter((product) => product.sale_percent > 0)

    if (saleData.length > 0) {
      let urlSale = `https://shoppingapi.fly.dev/${saleData[0].colorArray[0].images[0]}`
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
  
  let brandArray = []

  return (
    <div>
      {window.innerWidth > 630 ? <Header cartItems={cartItems}
        category={category} /> : <HeaderMobile cartItems={cartItems}
          category={category} />}
      <div className="homeContainer">
        <RenderSale />
        <div className="categoryContainer">
          <h2>Shop by category</h2>
          <div className="categoryContainer2">
            {category.map((index, iter) => {
              let url = `https://shoppingapi.fly.dev/${index.image}`
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
            {apiItems.map((index, iter) => {
              let url = `https://shoppingapi.fly.dev/${index.colorArray[0].images[0]}`

              if (!brandArray.includes(index.brand) && iter<=6) {
              brandArray.push(index.brand)

              return (
                <Link key={iter} to={`shop/${index._id}`} state={{ category: index.brand }}>
                  <div className="homeLinkContainer">
                    <h3>{index.brand}</h3>
                    <img className="img" alt="no image available" src={url}></img>
                  </div>
                </Link>
              )
            }
            })}
          </div>
        </div>
        <Footer />
      </div>
    </div>

  )



};

export default Home;