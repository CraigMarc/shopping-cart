import { Header } from '../headerComponents/Header'

function Contact(props) {

    const {

        cartItems,
        category,
       
      } = props;

    return (
        <div>
            <Header
                cartItems={cartItems}
                category={category}
            />
            <div className='contactContainer'>
            <h3>Contact Us</h3>
            </div>
        </div>
    )
}

export default Contact;