import { Header } from './Header'


function ProductPage(props) {

    const {
        
        cartItems,

    } = props;
    console.log(cartItems)


    return (
        <div>
            <Header
            />
            <p>product page</p>

        </div>
    )


}

export default ProductPage