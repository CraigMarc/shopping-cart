import { Header } from '../headerComponents/Header'
import { Footer } from '../footerComponents/Footer'
import { HeaderMobile } from '../headerComponents/HeaderMobile'
import CartItems from '../reusedComponents/CartItems'
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";


function Cart(props) {

    const {

        cartItems,
        setCartItems,
        cartState,
        setCartState,
        apiItems,
        category


    } = props;

    // scroll to top of page 

    useEffect(() => {
        window.scrollTo(0, 0)
      }, []);

    const showButton = useRef([true])
    const updateQuantArr = useRef([])
    const updateQuantArr2 = useRef([])


    const handleDelete = (event, iter) => {

        let newArr = structuredClone(cartItems)
        newArr.splice(iter, 1)

        setCartItems(newArr);

    }

    // total items in the cart

    function grandTotal(cartItems) {

        let cartTotal = 0
        for (let i = 0; i < cartItems.length; i++) {

            if (cartItems[i].sale_percent == null) {
                cartTotal = cartTotal + (cartItems[i].price * cartItems[i].quantity)
            }
            else {

                cartTotal = cartTotal + ((cartItems[i].price - (cartItems[i].price * (cartItems[i].sale_percent / 100))) * cartItems[i].quantity)
            }
        }

        return cartTotal
    }


    // update cartstate when cart array changes

    useEffect(() => {
        setCartState(grandTotal(cartItems))
    }, [cartItems]);


    // render list of cart items

    const listCartItems = () => {
        if (cartItems.length == 0) {
            return (
                <div className='checkoutContainer'>

                    <h1>cart is empty</h1>
                </div>
            )
        }
        else {
            return (
                <div>
                    {cartItems.map((data, iter) => {

                        return (
                            <div className='cart2' key={data.id}>
                                <div className='cartCont'>
                                    <CartItems
                                        data={data}
                                    />
                                    {renderMessage(data, iter)}
                                    <div className="deleteButtonContainer">
                                        <button className="delete" value={data.id} onClick={(e) => handleDelete(e, iter)}>delete</button>

                                    </div>
                                </div>


                            </div>

                        )

                    })}
                </div>
            )
        }
    }

    // render quantity update

    // update cartitems state to new quantities

    function updateCart() {

        const updateArray = structuredClone(cartItems)

        for (let i = 0; i < cartItems.length; i++) {
            updateArray[i].quantity = updateQuantArr2.current[i]
        }

        setCartItems(updateArray)
    }


    // render quantity inputs and show message if out of stock or over stock

    function renderMessage(data, iter) {

        updateQuantArr.current[iter] = cartItems[iter].quantity

        // update quantities in array when changed by user

        function updateArray(e) {

            updateQuantArr.current[e.target.id] = e.target.value
            for (let i = 0; i < updateQuantArr.current.length; i++) {
                if (i == e.target.id) {
                    updateQuantArr2.current[i] = e.target.value
                }
                else {
                    updateQuantArr2.current[i] = updateQuantArr.current[i]
                }
            }

            updateCart()
        }


        let productArray = apiItems.filter(function (obj) {
            return obj._id == data.id
        }

        );

        let dataBaseQuantity = productArray[0].colorArray[cartItems[iter].colorIter].sizeArray[cartItems[iter].sizeIter].quantity

        // if item is over inventory  ******


        if (updateQuantArr.current[iter] > dataBaseQuantity && dataBaseQuantity != 0 && dataBaseQuantity > 0) {
            showButton.current[iter] = false
            return (

                <form id="edForm">
                    <label>
                        Quantity { }
                        <input
                            onChange={updateArray}
                            className='quantity'
                            id={iter}
                            type="number"
                            name="quantity"
                            min="1"
                            value={data.quantity}
                        />
                    </label>

                    <h3>There are only {dataBaseQuantity} left in inventory</h3>

                </form>

            )
        }

        // if item is out of stock delete oos item (only should happen if goes oos during checkout)


        if (dataBaseQuantity <= 0) {
            showButton.current[iter] = false

            const filterOOS = cartItems.filter((item) => item.id != data.id);
            setCartItems(filterOOS)

            // should not render
            return (

                <h2>This item is currently out of stock</h2>
            )

        }

        // quantity is ok

        else {

            showButton.current[iter] = true
            return (

                <form id="edForm">
                    <label>
                        Quantity { }
                        <input
                            onChange={updateArray}
                            className='quantity'
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


    // render checkout button if not out or over stock

    function checkoutButton() {

        if (showButton.current.includes(false) || cartItems.length == 0) {
            return (
                <p></p>
            )
        }
        else {

            return (
                <Link to="/address">
                    <button type="button">
                        Check Out
                    </button>
                </Link>
            )

        }
    }



    return (
        <div>
            {window.innerWidth > 600 ? <Header cartItems={cartItems}
                category={category} /> : <HeaderMobile cartItems={cartItems}
                    category={category} />}

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
                <div className='cartFooter'>
                    <Footer />
                </div>
            </div>


        </div>
    )


}

export default Cart