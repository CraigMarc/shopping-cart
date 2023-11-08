import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//import TestApp from "./src/TestApp";
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from "react-router";
import Shop from "./src/Shop"

/*
it("cart link takes to cart", () => {
    render(
       
        <Shop />
     
     
    );
  
    const shopNowLink = screen.getByRole("link", { name: /cart/i });
    expect(shopNowLink).toHaveAttribute("href", "/cart");
  });*/