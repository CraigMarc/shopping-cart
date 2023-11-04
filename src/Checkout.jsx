import { Header } from './Header'
import { useLocation } from 'react-router-dom';

function Checkout(props) {

    const {

       
        cartItems
    
      } = props;


    return (
        <div>
            <Header
                cartItems={cartItems}
            />
            <h2>Not a real store</h2>


        </div>
    )

}

export default Checkout
