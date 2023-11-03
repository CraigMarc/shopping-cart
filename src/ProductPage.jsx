import { Header } from './Header'
import { useLocation } from 'react-router-dom'

function ProductPage(props) {

    const {
        
        apiItems,
        setApiItems
    
    } = props;
    console.log(apiItems)

    const location = useLocation()
    console.log(location.state)
    let arrayNumber = location.state

    return (
        <div>
            <Header
            />
            <h2>{apiItems[arrayNumber - 1].title}</h2>
            <img className="img" src={apiItems[arrayNumber - 1].image}></img>
            <p>{apiItems[arrayNumber - 1].description}</p>
            <p>${apiItems[arrayNumber - 1].price}</p>
        </div>
    )


}

export default ProductPage