import { Header } from './Header'
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";


function ProductPage(props) {

    const {

        apiItems,
        setApiItems,
        cartItems,
        setCartItems,

    } = props;

    if (apiItems == undefined) {
        return (
            <div>
                <Header
                    cartItems={cartItems}
                />
            </div>
        )
    }


    //get data from link

    const location = useLocation()

    let arrayNumber = location.state
  
    let itemTitle = apiItems[arrayNumber].title
    let itemDescription = apiItems[arrayNumber].description
    let itemPrice = apiItems[arrayNumber].price
    let itemLength = apiItems[arrayNumber].length
    let itemHeight = apiItems[arrayNumber].height
    let itemWidth = apiItems[arrayNumber].width
    let itemWeight = apiItems[arrayNumber].weight
    let itemImage = apiItems[arrayNumber].image

     let url = `http://localhost:3000/uploads/${itemImage}`

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
        let totalRounded = (Math.round(total * 100) / 100).toFixed(2);

        setCartItems([...cartItems, { id: uuid, title: itemTitle, price: itemPrice, quantity: quantity, total: totalRounded, image: itemImage, length: itemLength, width: itemWidth, height: itemHeight, weight: itemWeight }])


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
                            <p className="price">${itemPrice}.00</p>
                        </div>
                    </div>
                    <div className='formContainer'>
                        <form id="edForm" onSubmit={handleProductSubmit}>
                            <label>
                                Quantity { }
                                <input
                                    id="quantity"
                                    type="number"
                                    name="quantity"
                                    min="1"
                                    placeholder='1'
                                />
                            </label>

                            <input type="submit" value="Add to Cart" />

                        </form>
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