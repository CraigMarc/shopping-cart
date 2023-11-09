import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
//import TestApp from "./src/TestApp";
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from "react-router";
import Header from "../Header"
import mockItems from "../assets/data/mockCart.js"
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';



/*

it('displays the correct amount of items in the cart ', () => {
    const mockCart = [{ id: '00', title: 'Zero' }];
    render(
     
          <Header cartItems={mockItems} />
         
       
    );

    //expect(screen.getByTestId('cart-badge')).toHaveTextContent('1');
  });
  */