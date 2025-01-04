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

  const categoryData = apiItems.filter((product) => product.category._id == pageData._id)
  const brandData = apiItems.filter((product) => product.brand._id == pageData._id)

  if (categoryData.length > 0) {
    filteredProducts.current = categoryData
  }

  if (brandData.length > 0) {
    filteredProducts.current = brandData
  }



  function RenderProducts() {

    if (filteredProducts.current) {
      return (
        <div>
          {filteredProducts.current.map((index, iter) => {

            let image = index.colorArray[0].images[0]

            let url = `http://localhost:3000/${image}`
            let priceDiv = (index.colorArray[0].sizeArray[0].price / 100).toFixed(2)


            return (

              <Link key={iter} to="/product" state={index._id}>
                <div className="product">

                  <div id={index.id} className="card" >

                    <img className="img" src={url}></img>
                    <p>{index.title}</p>
                    <p className="price">${priceDiv}</p>

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