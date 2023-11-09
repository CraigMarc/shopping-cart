import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//import TestApp from "./src/TestApp";
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from "react-router";
import Cart from "./src/Cart"
import mockItems from "./src/assets/data/mockCart.js"
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
/*
it("cart link takes to cart", () => {
    render(
       
        <BrowserRouter>
        <Routes>
          <Route path="/cart" element={<mockItems />} />
         
        </Routes>
      </BrowserRouter>,
     
     
    );
    
    })*/

it('should link to the products page', async () => {

    render(
        <BrowserRouter>
            <Cart cartItems={mockItems} />
        </BrowserRouter>
    );

    const shopLink = await screen.findByRole('button', { name: /continue shopping/i });

    expect(shopLink).toBeInTheDocument();


});


//user click not working ********

/*
it('links to a product page', async () => {

    render(
        <BrowserRouter>
            <Cart cartItems={mockItems} />
        </BrowserRouter>
    );

    const user = userEvent.setup();

    const links = screen.findByRole('button', { name: /continue shopping/i });
    await user.click(links)
    

    
    expect(
        screen.getByRole('heading', { level: 1, name: 'Our Products' }),
    ).toBeInTheDocument();
});*/

it('deletes product', async () => {

    render(
        <BrowserRouter>
            <Cart cartItems={mockItems} />
        </BrowserRouter>
    );

    const user = userEvent.setup();

    
    const delButton = screen.findAllByRole('button', { name: /delete/i });

    await user.click(delButton[0])
    
   expect(screen.getByText("Mens Casual Premium Slim Fit T-Shirts")).not.toBeInTheDocument();
   //expect(screen.getByText("Mens Casual Premium Slim Fit T-Shirts")).toBeInTheDocument();
   
});



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






