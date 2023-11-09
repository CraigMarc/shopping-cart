import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//import TestApp from "./src/TestApp";
import { describe, it, expect } from 'vitest';
import Shop from "../Shop"
import data from "../assets/data/data.json"

import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

//test1
it('links to a product page', async () => {
   
    render(
        <BrowserRouter >
            <Shop
            apiItems={data} />
             <Routes>
          
          <Route path="/product" element={<h1>Product</h1>} />
        </Routes>
          
        </BrowserRouter>
    );

    const user = userEvent.setup();

    const links = screen.getByText('Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops');
   
    await user.click(links)
    
    
    
   expect(
        screen.getByRole('heading', { level: 1, name: 'Product' }),
    ).toBeInTheDocument();
});

// test 2

it("renders home page", () => {
    // since screen does not have the container property, we'll destructure render to obtain a container for this test
    const { container } = render(
        <BrowserRouter >
        <Shop
        apiItems={data}
        
        />
       
      
    </BrowserRouter>
    );
    expect(container).toMatchSnapshot();
  });

  


