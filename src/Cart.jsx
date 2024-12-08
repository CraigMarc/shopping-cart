import { Header } from './Header'
import Checkout from './Checkout'
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";


function Cart(props) {

    const {

        cartItems,
        setCartItems,
        cartState,
        setCartState,
        apiItems,
        newQuantity,
        setNewQuantity


    } = props;


    let showButton = [true]

    console.log(cartItems)


    const handleDelete = (event) => {
        const id = event.target.value;
        const newData = cartItems.filter((item) => item.id !== id)
        setCartItems(newData);

    }

    if (cartItems.length == 0) {
        return (
            <div className='checkoutContainer'>
                <Header />
                <h1>cart is empty</h1>
            </div>
        )
    }

    function grandTotal(cartItems) {
        let cartTotal = 0
        for (let i = 0; i < cartItems.length; i++) {
            let toNumber = Number(cartItems[i].total)
            cartTotal = toNumber + cartTotal
        }

        return cartTotal
    }

    let cartGrandTotal = grandTotal(cartItems)
    // let cartGrandTotalRound = Number(cartGrandTotal).toFixed(2);

    useEffect(() => {
        setCartState(cartGrandTotal)
    }, [cartItems]);

    let quantArray = []

    const listCartItems = () => {
        return (
            <div>
                {cartItems.map((data, iter) => {

                    let url = `http://localhost:3000/uploads/${data.image}`

                    return (
                        <div className='cart2' key={data.id}>
                            <div className='cartCont'>
                                <div className='cartCont1'>
                                    <p>{data.title}</p>
                                    <img className="checkoutImg" src={url}></img>
                                </div>
                                <div className='cartCont2'>
                                    <p>quantity: {data.quantity}</p>
                                    <p>${(data.total / 100).toFixed(2)}</p>
                                </div>
                                {renderMessage(data, iter)}
                                <div className="deleteButtonContainer">
                                    <button className="delete" value={data.id} onClick={handleDelete}>delete</button>
                                    <button>update quantity</button>
                                </div>
                            </div>


                        </div>

                    )

                })}
            </div>
        )
    }

    // render quantity update

    let updateQuantArr = []
    let updateQuantArr2 = []

    function updateCart() {

        const updateArray = structuredClone( cartItems)
        
        for (let i = 0; i < cartItems.length; i++) {
            updateArray[i].quantity = updateQuantArr2[i]
        }
       
        setCartItems(updateArray)
    }



    function renderMessage(data, iter) {

        
        updateQuantArr[iter] = cartItems[iter].quantity

        function updateArray(e) {

            setNewQuantity(e.target.value)
            updateQuantArr[e.target.id] = e.target.value
            for (let i = 0; i < updateQuantArr.length; i++) {
                if (i == e.target.id) {
                    updateQuantArr2[i] = e.target.value
                }
                else {
                    updateQuantArr2[i] = updateQuantArr[i]
                }
            }

            updateCart()
        }


        let productArray = apiItems.filter(function (obj) {
            return obj._id == data.id
        }
        );

        if (newQuantity > productArray[0].quantity) {
            showButton[iter] = false
            return (

                <form id="edForm">
                    <label>
                        Quantity { }
                        <input
                            onChange={updateArray}
                            id={iter}
                            type="number"
                            name="quantity"
                            min="1"
                            value={data.quantity}
                        />
                    </label>

                    <h3>There are only {productArray[0].quantity} left in inventory</h3>

                </form>

            )
        }

        // if item is out of stock 
        if (productArray[0].quantity <= 0) {
            showButton[iter] = false

            return (

                <h2>This item is currently out of stock</h2>
            )

        }

        else {
            showButton[iter] = true
            return (

                <form id="edForm">
                    <label>
                        Quantity { }
                        <input
                            onChange={updateArray}
                            id={iter}
                            type="number"
                            name="quantity"
                            min="1"
                            value={data.quantity}
                        />
                    </label>

                </form>

            )
        }
    }


    // render checkout button

    function checkoutButton() {

        if (showButton.includes(false)) {
            return (
                <p></p>
            )
        }
        else {
            /*
                        return (
                            <Link to="/address">
                                <button type="button">
                                    Check Out
                                </button>
                            </Link>
                        )*/
            return (
                <button type="button">
                    Check Out
                </button>
            )
        }
    }



    return (
        <div>
            <Header
                cartItems={cartItems}
            />

            <div className='checkoutContainer'>
                <h1>Shopping Cart</h1>
                <div>{listCartItems()}</div>
                <div className='subTotal'>Subtotal: ${(cartState / 100).toFixed(2)}</div>

                <div className='checkoutButtons'>
                    <Link to="/">
                        <button>Continue Shopping</button>
                    </Link>

                    {checkoutButton()}
                </div>

            </div>


        </div>
    )


}

export default Cart