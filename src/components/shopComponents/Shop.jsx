import { Header } from '../headerComponents/Header'
import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from "react-router-dom";


function Shop(props) {

  const {

    apiItems,
    setApiItems,
    cartItems,
    category

  } = props;

  const location = useLocation();
  const pageData = location.state;
  const filteredProducts = useRef()

  // filter products
 
  const categoryData = apiItems.filter((product) => product.category._id == pageData._id)
  const brandData = apiItems.filter((product) => product.brand._id == pageData._id)

  if (categoryData.length == 0 && brandData.length == 0 ) {
    filteredProducts.current = null
  }

  if (categoryData.length > 0) {
    filteredProducts.current = categoryData
  }

  if (brandData.length > 0) {
    filteredProducts.current = brandData
  }

  
  if (pageData._id == "all") {
    let newArray = structuredClone(apiItems)
    filteredProducts.current = newArray
  }

  if (pageData._id == "sale") {
    const saleData = apiItems.filter((product) => product.sale_percent != 0)
    filteredProducts.current = saleData
  }

  if (pageData._id == "search") {
    const searchData = apiItems.filter((product) => product.title.toLowerCase().includes(pageData.name) || product.description.toLowerCase().includes(pageData.name) || product.category.name.toLowerCase().includes(pageData.name))
    filteredProducts.current = searchData
  }
 
  // display sale price or reg price

  function RenderSale (props) {

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
          <p className='salePercent'>save {index.sale_percent}%</p>
          <p className='regPrice'>${priceDiv}</p>
          <p className='price'>${salePrice}</p>
        </div>
      )
    }

  }

// display products if exist

  function RenderProducts() {

    if (filteredProducts.current) {
      return (
        <div>
          {filteredProducts.current.map((index, iter) => {

let url = ""
if (index.colorArray[0].images) {
           let image = index.colorArray[0].images[0]
            url = `http://localhost:3000/${image}`
          }
            
          

            return (

              <Link key={iter} to="/product" state={index._id}>
                <div className="product">

                  <div id={index.id} className="card" >

                    <img className="img" src={url}></img>
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
      <Header
        cartItems={cartItems}
        category={category}
      />
      <div className='shopContainer'>
        <h1>{pageData.name}</h1>
        <div className="productCard">
          <RenderProducts />

        </div>
      </div>
    </div>
  )


}

export default Shop