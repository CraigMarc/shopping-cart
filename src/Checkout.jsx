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
            <div className='finalContainer'>
            <h2>Not a real store so didn't make the checkout functional</h2>
            </div>

        </div>
    )

}

export default Checkout
