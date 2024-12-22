import { Header } from './Header'
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from 'react'


function ProductPage(props) {

    const {

        apiItems,
        setApiItems,
        cartItems,
        setCartItems,

    } = props;


    //get data from link

    const location = useLocation()

    let arrayNumber = location.state

    const [newQuantity, setNewQuantity] = useState(1)
    const colorIndex = useRef()
    const inCart = useRef(false);
    const [colorDrop, setColorDrop] = useState(apiItems[arrayNumber].colorArray[0].color)
   

    if (apiItems == undefined) {
        return (
            <div>
                <Header
                    cartItems={cartItems}
                />
            </div>
        )
    }


    let checkArr = []

    //if item already in cart update quantity state and change incart to show items in cart

    function checkCartQuantity() {

        for (let i = 0; i < cartItems.length; i++) {

            let exists = Object.values(cartItems[i]).includes(apiItems[arrayNumber]._id);
            if (exists == true) {

                checkArr.push(i, cartItems[i])
                setNewQuantity(checkArr[1].quantity)
                inCart.current = true

            }
        }


    }

    useEffect(() => {
        checkCartQuantity();
    }, [])

    const currentProduct = apiItems[arrayNumber]
    
    let itemTitle = currentProduct.title
    let itemDescription = currentProduct.description

    // change depending on size and color chosen ************************

    let itemPrice = apiItems[arrayNumber].price
    let itemLength = apiItems[arrayNumber].length
    let itemHeight = apiItems[arrayNumber].height
    let itemWidth = apiItems[arrayNumber].width
    let itemWeight = apiItems[arrayNumber].weight
    let itemImage = apiItems[arrayNumber].image
    let itemId = apiItems[arrayNumber]._id

    let url = `http://localhost:3000/${itemPrice}`

    function changeColor (e) {
      console.log(e.target.value)
        setColorDrop(e.target.value)
       
       // let index = currentProduct.colorArray.findIndex(
         //   (temp) => temp['color'] == colorDrop.current)
            //setColorIndex({index: index})

    }

   
    //dropdown form

    function Dropdown() {

        return (
            <div>
                <form>
                    <label>Color</label>
                    <select required  onChange={(e) => changeColor(e)}>
                    <option default value={currentProduct.colorArray[0].color}>{currentProduct.colorArray[0].color}</option>
                        {currentProduct.colorArray.map((item, iter) => {
                          
                            
                            return (
                                <option id={iter} key={iter}>{item.color}</option>

                            )
                        })}
                    </select>

                </form>
            </div>
        )

    }

    //submit to cart

    function handleProductSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target).entries());
        let uuid = self.crypto.randomUUID();
        let quantity = data.quantity
        if (quantity == "") {
            quantity = 1
        }
        let total = quantity * itemPrice

        if (inCart.current == true) {

            const updateArray = structuredClone(cartItems)
            updateArray[0].quantity = quantity
            setCartItems(updateArray)

        }

        else {

            setCartItems([...cartItems, { id: itemId, title: itemTitle, price: itemPrice, quantity: quantity, total: total, image: itemImage, length: itemLength, width: itemWidth, height: itemHeight, weight: itemWeight }])
        }

    }

    // set quantity

    function setCartQuant(e) {
        setNewQuantity(e.target.value)
    }

    // update submit button

    function renderSubmit() {

        if (inCart.current == true) {
            return (
                <input type="submit" value="Update Quantity" />
            )
        }

        else {
            return (
                <input type="submit" value="Add to Cart" />
            )
        }
    }


    // if order is more then inventory

    function renderMessage() {


        if (newQuantity > apiItems[arrayNumber].quantity && apiItems[arrayNumber].quantity != 0 && apiItems[arrayNumber].quantity > 0) {

            return (

                <form id="edForm" onSubmit={handleProductSubmit}>
                    <label>
                        Quantity { }
                        <input
                            onChange={setCartQuant}
                            id="quantity"
                            type="number"
                            name="quantity"
                            min="1"
                            value={newQuantity}
                        />
                    </label>

                    <h2>There are only {apiItems[arrayNumber].quantity} left in inventory</h2>

                </form>

            )
        }



        // if item is out of stock 
        if (apiItems[arrayNumber].quantity <= 0) {
            return (

                <h2>This item is currently out of stock</h2>
            )

        }

        else {

            return (

                <form id="edForm" onSubmit={handleProductSubmit}>
                    <label>
                        Quantity { }
                        <input
                            onChange={setCartQuant}
                            id="quantity"
                            type="number"
                            name="quantity"
                            min="1"
                            value={newQuantity}
                        />
                    </label>

                    {renderSubmit()}

                </form>

            )
        }
    }


    if (apiItems[arrayNumber].title)

        return (
            <div>
                <Header
                    cartItems={cartItems}
                />
                <div className='productPageContainer'>
                    <div className="itemContainer">
                        <div className="item">
                            <h2>{itemTitle}</h2>
                            <img className="img" src={url}></img>
                            <p>{itemDescription}</p>
                            <p className="price">${(itemPrice / 100).toFixed(2)}</p>
                        </div>
                    </div>
                    <div className='formContainer'>
                        {renderMessage()}
                        <Dropdown />
                        <div className='productButton'>
                            <Link to="/">
                                <div className='shopButtonContainer'>
                                    <button>Continue Shopping</button>
                                </div>
                            </Link>
                            <Link to="/cart">
                                <div className='checkoutButtonContainer'>
                                    <button>Proceed to Checkout</button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        )



}

export default ProductPage