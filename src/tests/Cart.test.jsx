import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//import TestApp from "./src/TestApp";
import { describe, it, expect } from 'vitest';
import Cart from "../Cart"
import mockItems from "../assets/data/mockCart.js"
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';


const emptyCart = []


//test1

it('should have link to the products page', async () => {

    
       

    render(
        <BrowserRouter>
            <Cart cartItems={mockItems} />
        </BrowserRouter>
    );

    const shopLink = await screen.findByRole('button', { name: /continue shopping/i });

    expect(shopLink).toBeInTheDocument();
    

});

//test2
it('links to a product page', async () => {
   
    render(
        <BrowserRouter >
            <Cart 
            cartItems={mockItems} />
             <Routes>
          
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
          
        </BrowserRouter>
    );

    const user = userEvent.setup();

    const links = screen.getByRole('button', { name: /continue shopping/i });
    await user.click(links)
    
    
    
   expect(
        screen.getByRole('heading', { level: 1, name: 'Home' }),
    ).toBeInTheDocument();
});

// test 3

it('links to a checkout page', async () => {
   
    render(
        <BrowserRouter >
            <Cart 
            cartItems={mockItems} />
             <Routes>
          
          <Route path="/checkout" element={<h1>Checkout</h1>} />
        </Routes>
          
        </BrowserRouter>
    );

    const user = userEvent.setup();

    const links = screen.getByRole('button', { name: /check out/i });
    await user.click(links)
    
    
    
   expect(
        screen.getByRole('heading', { level: 1, name: 'Checkout' }),
    ).toBeInTheDocument();
});


//test 4

/*
it('deletes product', async () => {

    render(
        <BrowserRouter>
            <Cart 
            cartItems={mockItems}
            
            />
        </BrowserRouter>
    );

    const user = userEvent.setup();

    
    const delButton = screen.findAllByRole('button', { name: /delete/i });

    await user.click(delButton[0])
    
   expect(screen.getByText("Mens Casual Premium Slim Fit T-Shirts")).not.toBeInTheDocument();
   //expect(screen.getByText("Mens Casual Premium Slim Fit T-Shirts")).toBeInTheDocument();
   
});

*/

//test 5
it('should provide the correct subtotal', async () => {

    render(
        <BrowserRouter>
            <Cart cartItems={mockItems} />
        </BrowserRouter>
    );

    const subtotal = screen.getByText("Subtotal: $134.28"
);

    expect(subtotal).toBeInTheDocument();


});

//test 6

it('test empty cart', async () => {

    render(
        <BrowserRouter>
            <Cart cartItems={emptyCart} />
        </BrowserRouter>
    );

    const subtotal = screen.getByText("cart is empty")
   


    expect(subtotal).toBeInTheDocument();


});

// test 7

it('right number in cart', async () => {

    render(
        <BrowserRouter>
            <Cart cartItems={mockItems} />
        </BrowserRouter>
    );

    const cartNumber = screen.getByTestId("cartNumber")
   


    expect(cartNumber).toContain(/3/i);

    })

