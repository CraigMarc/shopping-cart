import { Link } from "react-router-dom";

const OutOfStock = (props) => {

  const {

    oosRef,
    order


  } = props;


  function renderMessage() {

    return (
      <div>
        {oosRef.current.map((index, iter) => {

          if (index.quantity > 0) {

            return (

              <div key={iter}>
                <p>There are only {index.quantity} {index.title}s left in stock</p>
              </div>

            )
          }

          if (index.quantity == 0) {

            return (

              <div key={iter}>
                <p>{index.title} is out of stock</p>
              </div>

            )
          }

        })}
      </div>
    )

  }


  // program for multiple out of stocks and say out of stock if quantity is zero ****
  return (
    <div>
      {renderMessage()}

      <Link to="/cart">
        <button>Revise your order</button>
      </Link>

    </div>

  );
};

export default OutOfStock;