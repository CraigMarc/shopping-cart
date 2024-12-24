 // render size and color
 const SizeAndColor = (props) => {

    const {
        data
    } = props;

    if (data.size != "false" & data.size != "false") {
        return (
            <>
                <p>size: {data.size}</p>
                <p>color: {data.color}</p>
            </>
        )
    }

    if (data.size != "false") {
        return (
            <>
                <p>size: {data.size}</p>
            </>
        )
    }
    if (data.color != "false") {
        return (
            <>
                <p>color: {data.color}</p>

            </>
        )
    }

}

export default SizeAndColor