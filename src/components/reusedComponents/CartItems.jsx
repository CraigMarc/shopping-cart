import SizeAndColor from './SizeAndColor'

// render cartItems


const CartItems = (props) => {

    const {
        data
    } = props;


    // render sale price 

    function RenderSale() {


        let priceDiv = (data.price / 100).toFixed(2)
        let salePrice = (priceDiv - (priceDiv * (data.sale_percent / 100))).toFixed(2)

        if (data.sale_percent == null) {
            return (
                <p className="price">${priceDiv}</p>
            )
        }

        else {
            return (
                <div>
                    <p className='salePercent'>you save {data.sale_percent}%</p>
                    <p className='regPrice'>${priceDiv}</p>
                    <p className='price'>${salePrice}</p>
                </div>
            )
        }

    }

    let url = `https://shoppingapi.fly.dev/${data.image[0]}`

    return (
        <>
            <div className='cartCont1'>
                <div>
                <h3>{data.title}</h3>
                <div className='ccText'>
                <p><span className='ccSpan'>quantity:</span> {data.quantity}</p>
                
                <SizeAndColor
                    data={data}
                />
                 <RenderSale/>
                </div>
                </div>
                <div className='cartImageContainer'>
                <img className="checkoutImg" alt="no image available" src={url}></img>
                
                </div>
            </div>
           
        </>
    )

}

export default CartItems