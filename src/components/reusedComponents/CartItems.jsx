import SizeAndColor from './SizeAndColor'

// render cartItems


const CartItems = (props) => {

    const {
        data
    } = props;

    let url = `http://localhost:3000/${data.image}`

    return (
        <>
            <div className='cartCont1'>
                <p>{data.title}</p>
                <img className="checkoutImg" src={url}></img>
            </div>
            <div className='cartCont2'>
                <p>quantity: {data.quantity}</p>
                <SizeAndColor
                    data={data}
                />
                <p>${(data.price / 100).toFixed(2)}</p>
            </div>
        </>
    )

}

export default CartItems