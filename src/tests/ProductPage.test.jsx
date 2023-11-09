import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//import TestApp from "./src/TestApp";
import { describe, it, expect } from 'vitest';
import ProductPage from "../ProductPage"
import mockItems from "../assets/data/mockCart.js"
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
import data from "../assets/data/data.json"
import { MemoryRouter } from "react-router-dom";

//set the uselocation
/*
vi.mock("react-router-dom", () => ({
    ...vi.importActual("react-router-dom"),
    useLocation: () => ({
      state: "1"
    })
  }));

//test1
it('links to home page', async () => {
   
    render(
        <BrowserRouter >
            <ProductPage 
            cartItems={mockItems} />
             <Routes>
          
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
          
        </BrowserRouter>
    );

    const user = userEvent.setup();

    const links = screen.getByRole('button', { name: /continue shopping/i });
    await user.click(links)

})*/
