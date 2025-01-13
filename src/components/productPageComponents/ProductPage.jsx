import { Header } from '../headerComponents/Header'
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from 'react'
import arrowLeft from '../../assets/arrowLeft.png';
import arrowRight from '../../assets/arrowRight.png';

function ProductPage(props) {

    const {

        apiItems,
        setApiItems,
        cartItems,
        setCartItems,
        category

    } = props;
console.log(cartItems)

    //get data from link

    const location = useLocation()

    const [newQuantity, setNewQuantity] = useState(1)
    const inCart = useRef(false);
    const [colorDrop, setColorDrop] = useState()
    const colorIndex = useRef(0)
    const [sizeDrop, setSizeDrop] = useState()
    const sizeIndex = useRef(0)
    const [imageIter, setImageIter] = useState(0)

    // values of current color selected ******L*

    const pageData = location.state;


    const currentProduct = apiItems.filter((product) => product._id == pageData)


    let itemTitle = currentProduct[0].title
    let itemDescription = currentProduct[0].description
    let sale_percent = currentProduct[0].sale_percent
    let itemPrice = currentProduct[0].colorArray[colorIndex.current].sizeArray[sizeIndex.current].price
    let itemLength = currentProduct[0].colorArray[colorIndex.current].sizeArray[sizeIndex.current].length
    let itemHeight = currentProduct[0].colorArray[colorIndex.current].sizeArray[sizeIndex.current].height
    let itemWidth = currentProduct[0].colorArray[colorIndex.current].sizeArray[sizeIndex.current].width
    let itemWeight = currentProduct[0].colorArray[colorIndex.current].sizeArray[sizeIndex.current].weight
    let itemQuantity = Number(currentProduct[0].colorArray[colorIndex.current].sizeArray[sizeIndex.current].quantity)
    let itemColor = currentProduct[0].colorArray[colorIndex.current].color
    let itemSize = currentProduct[0].colorArray[colorIndex.current].sizeArray[sizeIndex.current].size
    let itemImage = currentProduct[0].colorArray[colorIndex.current].images
    let itemId = currentProduct[0]._id
    if (!itemImage) {
        itemImage = []
    }

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

            let exists = Object.values(cartItems[i]).includes(currentProduct[0]._id);


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


    function changeColor(e) {

        let index = currentProduct[0].colorArray.findIndex(
            (temp) => temp['color'] == e.target.value)
        colorIndex.current = index
        setColorDrop(e.target.value)
    }

    function changeSize(e) {

        let index = currentProduct[0].colorArray[colorIndex.current].sizeArray.findIndex(
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

                    {currentProduct[0].colorArray.map((item, iter) => {
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

                    {currentProduct[0].colorArray[colorIndex.current].sizeArray.map((item, iter) => {
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

            setCartItems([...cartItems, { id: itemId, title: itemTitle, price: itemPrice, quantity: quantity, image: itemImage, length: itemLength, width: itemWidth, height: itemHeight, weight: itemWeight, color: itemColor, size: itemSize, colorIter: colorIndex.current, sizeIter: sizeIndex.current, sale_percent: sale_percent }])
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

    // render sale price 

    function RenderSale() {


        let priceDiv = (itemPrice / 100).toFixed(2)
        let salePrice = (priceDiv - (priceDiv * (sale_percent / 100))).toFixed(2)

        if (sale_percent == null) {
            return (
                <p className="price">${priceDiv}</p>
            )
        }

        else {
            return (
                <div>
                    <p className='salePercent'>save {sale_percent}%</p>
                    <p className='regPrice'>${priceDiv}</p>
                    <p className='price'>${salePrice}</p>
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

    // increase or decrease image index

    function increaseImage() {
        if (imageIter == itemImage.length - 1) {
            setImageIter(0)
        }
        else {
            setImageIter(imageIter + 1)
        }
    }

    function decreaseImage() {
        if (imageIter == 0) {
            setImageIter(itemImage.length - 1)
        }
        else {
            setImageIter(imageIter - 1)
        }
    }

    //image scroll 

    function ImageScroll() {
        if (itemImage.length == 0) {
            return (
            <img className="img" alt="no image available" src={''}></img>
            )
        }
        if (itemImage.length == 1) {
            let url = `http://localhost:3000/${itemImage[0]}`
            return (
                <img className="img" src={url}></img>
            )
        }
       
        
        if (itemImage.length > 1) {
            let url = `http://localhost:3000/${itemImage[imageIter]}`
            return (

                <div className='scrollContainer'>
                    <div className='arrowContainer' onClick={(e) => increaseImage(e)}><img src={arrowLeft}></img></div>
                    <img className="img" src={url}></img>
                    <div className='arrowContainer' onClick={(e) => decreaseImage(e)}><img src={arrowRight}></img></div>
                </div>

            )
        }

    }


    if (currentProduct[0].title)

        return (
            <div>
                <Header
                    cartItems={cartItems}
                    category={category}
                />
                <div className='productPageContainer'>
                    <div className="itemContainer">
                        <div className="item">
                            <h2>{itemTitle}</h2>
                            <ImageScroll />
                            <p>{itemDescription}</p>
                            <RenderSale />
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