 // render size and color
 const SizeAndColor = (props) => {

    const {
        data
    } = props;

    if (data.size != "false" & data.color != "false") {
        return (
            <>
                <p><span className='ccSpan'>size:</span> {data.size}</p>
                <p><span className='ccSpan'>color:</span> {data.color}</p>
            </>
        )
    }

    if (data.size != "false") {
        return (
            <>
                <p><span className='ccSpan'>size:</span> {data.size}</p>
            </>
        )
    }
    if (data.color != "false") {
        return (
            <>
                <p><span className='ccSpan'>color:</span> {data.color}</p>

            </>
        )
    }

}

export default SizeAndColor