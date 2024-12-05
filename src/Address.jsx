import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

const Address = (props) => {

    const navigate = useNavigate();

    const {

        order,
        setOrder,
        cartState,
        cartItems


    } = props;


    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [address1, setAddress1] = useState()
    const [address2, setAddress2] = useState()
    const [state, setState] = useState()
    const [zip, setZip] = useState()
    const [town, setTown] = useState()


    const packageTotal = () => {

        let totalLength = 0
        let totalWidth = 0
        let totalHeight = 0
        let totalWeight = 0


        for (let i = 0; i < cartItems.length; i++) {
            let quant = Number(cartItems[i].quantity)

            if (totalLength < cartItems[i].length) {
                totalLength = cartItems[i].length
            }

            if (totalWidth < cartItems[i].width) {
                totalWidth = cartItems[i].width
            }

            totalHeight = totalHeight + cartItems[i].height * quant
            totalWeight = totalWeight + cartItems[i].weight * quant

        }
        return { length: totalLength, width: totalWidth, height: totalHeight, weight: totalWeight }

    }


    // submit info for shipping price

    const handleSubmit = async e => {
        e.preventDefault();

        let packageShip = packageTotal()


        //send form data
        await fetch("http://localhost:3000/users/usps", {
            method: 'POST',
            
            body: JSON.stringify({
                originZIPCode: "22407",
                destinationZIPCode: zip,
                weight: packageShip.weight / 100,
                length: packageShip.length / 100,
                width: packageShip.width /100,
                height: packageShip.height /100,
                mailClass: "USPS_GROUND_ADVANTAGE",
                processingCategory: "NON_MACHINABLE",
                rateIndicator: "SP",
                destinationEntryFacilityType: "NONE",
                priceType: "COMMERCIAL",

            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },

        })



            .then((response) => response.json())
            .then((data) => {
             
                setOrder({
                    lastName: lastName,
                    firstName: firstName,
                    address1: address1,
                    address2: address2,
                    email: email,
                    state: state,
                    zip: zip,
                    town: town,
                    shipping: Math.round(data.totalBasePrice * 100),
                    price: cartState,
                    items: cartItems

                })
               navigate('/summary')
            })


            .catch((err) => {
                console.log(err.message);
               

            });


    }


    return (
        <div>

            <form onSubmit={handleSubmit}>
                <div className="newAddressContainer">
                    <div>
                        <label>First Name</label>
                        <input type="text" required onChange={e => setFirstName(e.target.value)} />

                        <label>Last Name</label>
                        <input type="text" required onChange={e => setLastName(e.target.value)} />

                        <label>Email </label>
                        <input type="email" required onChange={e => setEmail(e.target.value)} />

                        <label>Address Line 1</label>
                        <input type="text" required onChange={e => setAddress1(e.target.value)} />

                        <label>Address Line 2</label>
                        <input type="text" onChange={e => setAddress2(e.target.value)} />

                        <label>Town</label>
                        <input type="text" required onChange={e => setTown(e.target.value)} />

                        <label>State</label>

                        <input type="text" required onChange={e => setState(e.target.value)} />

                        <label>Zip Code</label>
                        <input type="text" required onChange={e => setZip(e.target.value)} />

                    </div>
                    <div className="submitAddress">
                        <input type="submit" />

                    </div>
                </div>
            </form>
        </div>
    );
};

export default Address;