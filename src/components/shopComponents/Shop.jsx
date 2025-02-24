import { Header } from '../headerComponents/Header'
import { Footer } from '../footerComponents/Footer'
import { HeaderMobile } from '../headerComponents/HeaderMobile'
import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from "react-router-dom";


function Shop(props) {

  const {

    apiItems,
    setApiItems,
    cartItems,
    category

  } = props;

  // scroll to top of page 

  useEffect(() => {
    window.scrollTo(0, 0)
  }, []);

  const location = useLocation();
  const pageData = location.state;
  const filteredProducts = useRef()

  // filter products

  const categoryData = apiItems.filter((product) => product.category._id == pageData.category._id)
  const brandData = apiItems.filter((product) => product.brand == pageData.category)


  if (categoryData.length == 0 && brandData.length == 0) {
    filteredProducts.current = null
  }

  if (categoryData.length > 0) {
    filteredProducts.current = categoryData
  }

  if (pageData.subCategory) {
    filteredProducts.current = categoryData.filter((product) => product.subCategory == pageData.subCategory)
    
  }

  if (brandData.length > 0) {
    filteredProducts.current = brandData
   
  }


  if (pageData.category._id == "all") {
    let newArray = structuredClone(apiItems)
    filteredProducts.current = newArray
   
  }

  if (pageData.category._id == "sale") {
    const saleData = apiItems.filter((product) => product.sale_percent > 0)
    filteredProducts.current = saleData
   
  }

  if (pageData.category._id == "search") {
    let lowerCase = pageData.category.name.toLowerCase()
    

    if (lowerCase.charAt(lowerCase.length - 1) == 's') {
     let nonPlural = lowerCase.substring(0, lowerCase.length - 1)
      let searchData = apiItems.filter((product) => product.title.toLowerCase().includes(nonPlural) || product.description.toLowerCase().includes(nonPlural) || product.category.name.toLowerCase().includes(nonPlural) || product.title.toLowerCase().includes(lowerCase) || product.description.toLowerCase().includes(lowerCase) || product.category.name.toLowerCase().includes(lowerCase))
      filteredProducts.current = searchData
    }

    if (lowerCase.charAt(lowerCase.length - 1) != 's') {
      let plural = lowerCase + 's'
      let searchData = apiItems.filter((product) => product.title.toLowerCase().includes(plural) || product.description.toLowerCase().includes(plural) || product.category.name.toLowerCase().includes(plural) || product.title.toLowerCase().includes(lowerCase) || product.description.toLowerCase().includes(lowerCase) || product.category.name.toLowerCase().includes(lowerCase))
      filteredProducts.current = searchData
    }
   
  }

  if (!filteredProducts.current) {
    filteredProducts.current = []
  }

  // display sale price or reg price

  function RenderSale(props) {

    const {

      index

    } = props

    let priceDiv = (index.colorArray[0].sizeArray[0].price / 100).toFixed(2)
    let salePrice = (priceDiv - (priceDiv * (index.sale_percent / 100))).toFixed(2)

    if (index.sale_percent == null) {
      return (
        <p className="price">${priceDiv}</p>
      )
    }

    else {
      return (
        <div>
          <p className='salePercentShop'>you save {index.sale_percent}%</p>
          <p className='regPrice'>${priceDiv}</p>
          <p className='price'>${salePrice}</p>
        </div>
      )
    }

  }

  function RenderTitle() {
    if (pageData.subCategory) {
      return (
        <h1>{pageData.subCategory}</h1>
      )
    }
    if (!pageData.category.name) {
      return (
        <h1>{pageData.category}</h1>
      )
    }
    else {
      return (
        <h1>{pageData.category.name}</h1>
      )
    }
  }

   

  // display products if exist

  function RenderProducts() {

    if (filteredProducts.current.length > 0) {
      return (
        <div className="productCard">
          {filteredProducts.current.map((index, iter) => {

            let url = ""
            if (index.colorArray[0].images) {
              let image = index.colorArray[0].images[0]
              url = `https://shoppingapi.fly.dev/${image}`
            }



            return (

              <Link key={iter} to="/product" state={index._id}>
                <div className="product">

                  <div id={index.id} className="card" >

                    <img className="img" alt="no image available" src={url}></img>
                    <p>{index.title}</p>
                    <RenderSale
                      index={index}
                    />

                  </div>

                </div>
              </Link>
            )
          })}

        </div>
      )
    }
    else {
      return (
        <div>
          <h3>There are no products currently available.</h3>
        </div>
      )
    }

  }

  return (
    <div>
      {window.innerWidth > 630 ? <Header cartItems={cartItems}
        category={category} /> : <HeaderMobile cartItems={cartItems}
          category={category} />}
      <div className='shopContainer'>
        <RenderTitle />

        <RenderProducts />

      </div>
      <Footer />
    </div>
  )


}

export default Shop