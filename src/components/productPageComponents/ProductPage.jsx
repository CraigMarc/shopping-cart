import { Header } from '../headerComponents/Header'
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
    const inCart = useRef(false);
    const [colorDrop, setColorDrop] = useState()
    const colorIndex = useRef(0)
    const [sizeDrop, setSizeDrop] = useState()
    const sizeIndex = useRef(0)

    // values of current color selected ******L*

    const currentProduct = apiItems[arrayNumber]

    let itemTitle = currentProduct.title
    let itemDescription = currentProduct.description
    let itemPrice = apiItems[arrayNumber].colorArray[colorIndex.current].sizeArray[sizeIndex.current].price
    let itemLength = apiItems[arrayNumber].colorArray[colorIndex.current].sizeArray[sizeIndex.current].length
    let itemHeight = apiItems[arrayNumber].colorArray[colorIndex.current].sizeArray[sizeIndex.current].height
    let itemWidth = apiItems[arrayNumber].colorArray[colorIndex.current].sizeArray[sizeIndex.current].width
    let itemWeight = apiItems[arrayNumber].colorArray[colorIndex.current].sizeArray[sizeIndex.current].weight
    let itemQuantity = Number(apiItems[arrayNumber].colorArray[colorIndex.current].sizeArray[sizeIndex.current].quantity)
    let itemColor = apiItems[arrayNumber].colorArray[colorIndex.current].color
    let itemSize = apiItems[arrayNumber].colorArray[colorIndex.current].sizeArray[sizeIndex.current].size
    let itemImage = apiItems[arrayNumber].colorArray[colorIndex.current].images
    let itemId = apiItems[arrayNumber]._id

    /*
    if (apiItems == undefined) {
        return (
            <div>
                <Header
                    cartItems={cartItems}
                />
            </div>
        )
    }*/



    //if item already in cart update quantity state and change incart to show items in cart

    function checkCartQuantity() {

        for (let i = 0; i < cartItems.length; i++) {

            let exists = Object.values(cartItems[i]).includes(apiItems[arrayNumber]._id);


            if (exists == true && cartItems[i].colorIter == colorIndex.current && cartItems[i].sizeIter == sizeIndex.current) {

                inCart.current = true
                setNewQuantity(cartItems[i].quantity)

                return
            }
            else {
                setNewQuantity(1)
            }
        }


    }

    useEffect(() => {
        checkCartQuantity();
    }, [colorIndex.current, sizeIndex.current])


    let url = `http://localhost:3000/${itemImage[0]}`

    function changeColor(e) {

        let index = currentProduct.colorArray.findIndex(
            (temp) => temp['color'] == e.target.value)
        colorIndex.current = index
        setColorDrop(e.target.value)
    }

    function changeSize(e) {

        let index = currentProduct.colorArray[colorIndex.current].sizeArray.findIndex(
            (temp) => temp['size'] == e.target.value)
        sizeIndex.current = index
        setSizeDrop(e.target.value)
    }


    //dropdown form

    function Dropdown() {

        return (
            <div>

                <label>Color</label>
                <select required value={colorDrop} onChange={(e) => changeColor(e)}>

                    {currentProduct.colorArray.map((item, iter) => {
                        let color = item.color
                        if (item.color == "false") {
                            color = 'only one color'
                        }
                        return (
                            <option id={iter} key={iter}>{color}</option>

                        )
                    })}
                </select>
                <label>Size</label>
                <select required value={sizeDrop} onChange={(e) => changeSize(e)}>

                    {currentProduct.colorArray[colorIndex.current].sizeArray.map((item, iter) => {
                        let size = item.size
                        if (item.size == "false") {
                            size = 'only one size'
                        }

                        return (
                            <option id={iter} key={iter}>{size}</option>

                        )
                    })}
                </select>

            </div>
        )

    }


    //submit to cart

    function handleProductSubmit(event) {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.target).entries());

        let quantity = data.quantity
        if (quantity == "") {
            quantity = 1
        }
        
        if (inCart.current == true) {

            const updateArray = structuredClone(cartItems)
            updateArray[0].quantity = quantity
            setCartItems(updateArray)

        }

        else {

            setCartItems([...cartItems, { id: itemId, title: itemTitle, price: itemPrice, quantity: quantity, image: itemImage, length: itemLength, width: itemWidth, height: itemHeight, weight: itemWeight, color: itemColor, size: itemSize, colorIter: colorIndex.current, sizeIter: sizeIndex.current }])
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

    // let know if out of stock or overordered

    function renderMessage() {

        if (newQuantity > itemQuantity && itemQuantity != 0 && itemQuantity > 0) {
            return (
                <h2>There are only {itemQuantity} left in inventory</h2>
            )
        }
        if (itemQuantity <= 0) {
            return (

                <h2>This item is currently out of stock</h2>
            )
        }
        else {
            return (
                <div>
                    {renderSubmit()}
                </div>
            )
        }
    }




    // render quantity form

    function renderForm() {
        return (

            <form id="edForm" onSubmit={handleProductSubmit}>
                <Dropdown />
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
                {renderMessage()}


            </form>

        )
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
                        {renderForm()}

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