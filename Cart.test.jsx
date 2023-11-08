import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//import TestApp from "./src/TestApp";
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from "react-router";
import Cart from "./src/Cart"
import data from "./src/assets/data/data.json"
const cartItems = data

it("cart link takes to cart", () => {
    render(
       
        <Cart
        cartItems={cartItems}
        />
     
     
    );
  
    const shopNowLink = screen.getByRole("link", { name: /cart/i });
    expect(shopNowLink).toHaveAttribute("href", "/cart");
  });