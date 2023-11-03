import { Header } from './Header'
import { useLocation } from 'react-router-dom'

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

    let itemTitle = apiItems[arrayNumber - 1].title
    let itemDescription = apiItems[arrayNumber - 1].description
    let itemPrice = apiItems[arrayNumber - 1].price
    let itemImage = apiItems[arrayNumber - 1].image

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

        setCartItems([...cartItems, { id: uuid, title: itemTitle, price: itemPrice, quantity: quantity, total: totalRounded }])

        
    }
    
    return (
        <div>
            <Header
            cartItems={cartItems}
            />
            <h2>{itemTitle}</h2>
            <img className="img" src={itemImage}></img>
            <p>{itemDescription}</p>
            <p>${itemPrice}</p>
            <form id="edForm" onSubmit={handleProductSubmit}>
                <label>
                    Quantity {' '}
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

        </div>
    )


}

export default ProductPage