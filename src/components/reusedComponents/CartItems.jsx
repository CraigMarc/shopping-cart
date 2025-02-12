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
                    <p className='salePercent'>save {data.sale_percent}%</p>
                    <p className='regPrice'>${priceDiv}</p>
                    <p className='price'>${salePrice}</p>
                </div>
            )
        }

    }

    let url = `http://localhost:3000/${data.image[0]}`

    return (
        <>
            <div className='cartCont1'>
                <p>{data.title}</p>
                <img className="checkoutImg" alt="no image available" src={url}></img>
            </div>
            <div className='cartCont2'>
                <p>quantity: {data.quantity}</p>
                <SizeAndColor
                    data={data}
                />
                <RenderSale/>
            </div>
        </>
    )

}

export default CartItems