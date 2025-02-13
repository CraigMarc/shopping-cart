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

    const [errorMess, setErrorMess] = useState(null);

    // submit info for shipping price

    const handleSubmit = async e => {
        e.preventDefault();

        let packageShip = packageTotal()

        let uuid = self.crypto.randomUUID();


        //send form data
        await fetch("http://localhost:3000/users/usps", {
            method: 'POST',

            body: JSON.stringify({
                originZIPCode: "22407",
                destinationZIPCode: zip,
                weight: packageShip.weight / 100,
                length: packageShip.length / 100,
                width: packageShip.width / 100,
                height: packageShip.height / 100,
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
                    orderId: uuid,
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
                setErrorMess(true)

            });


    }

    if (errorMess) return (
        <div className="netError">
            <h3>A network error was encountered try again later.</h3>
        </div>
    )


    return (
        <div>

            <form onSubmit={handleSubmit}>
                <div className="newAddressContainer">
                    <div>
                        <div className="addressPadding">
                            <label>First Name</label>
                            <input className="addressInput" type="text" required onChange={e => setFirstName(e.target.value)} />
                        </div>
                        <div className="addressPadding">
                            <label>Last Name</label>
                            <input className="addressInput"  type="text" required onChange={e => setLastName(e.target.value)} />
                        </div>
                        <div className="addressPadding">
                            <label>Email </label>
                            <input className="addressInput" type="email" required onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="addressPadding">
                            <label>Address Line 1</label>
                            <input className="addressInput" type="text" required onChange={e => setAddress1(e.target.value)} />
                        </div>
                        <div className="addressPadding">
                            <label>Address Line 2</label>
                            <input className="addressInput" type="text" onChange={e => setAddress2(e.target.value)} />
                        </div>
                        <div className="addressPadding">
                            <label>Town</label>
                            <input className="addressInput" type="text" required onChange={e => setTown(e.target.value)} />
                        </div>
                        <div className="addressPadding">
                        <label>State</label>
                        <select required onChange={(e) => setState(e.target.value)}>
                            <option default value="">---</option><option value="Alabama">Alabama</option><option value="Alaska">Alaska</option><option value="Arizona">Arizona</option><option value="Arkansas">Arkansas</option><option value="California">California</option><option value="Colorado">Colorado</option><option value="Connecticut">Connecticut</option><option value="Delaware">Delaware</option><option value="District of Columbia">District of Columbia</option><option value="Florida">Florida</option><option value="Georgia">Georgia</option><option value="Guam">Guam</option><option value="Hawaii">Hawaii</option><option value="Idaho">Idaho</option><option value="Illinois">Illinois</option><option value="Indiana">Indiana</option><option value="Iowa">Iowa</option><option value="Kansas">Kansas</option><option value="Kentucky">Kentucky</option><option value="Louisiana">Louisiana</option><option value="Maine">Maine</option><option value="Maryland">Maryland</option><option value="Massachusetts">Massachusetts</option><option value="Michigan">Michigan</option><option value="Minnesota">Minnesota</option><option value="Mississippi">Mississippi</option><option value="Missouri">Missouri</option><option value="Montana">Montana</option><option value="Nebraska">Nebraska</option><option value="Nevada">Nevada</option><option value="New Hampshire">New Hampshire</option><option value="New Jersey">New Jersey</option><option value="New Mexico">New Mexico</option><option value="New York">New York</option><option value="North Carolina">North Carolina</option><option value="North Dakota">North Dakota</option><option value="Northern Marianas Islands">Northern Marianas Islands</option><option value="Ohio">Ohio</option><option value="Oklahoma">Oklahoma</option><option value="Oregon">Oregon</option><option value="Pennsylvania">Pennsylvania</option><option value="Puerto Rico">Puerto Rico</option><option value="Rhode Island">Rhode Island</option><option value="South Carolina">South Carolina</option><option value="South Dakota">South Dakota</option><option value="Tennessee">Tennessee</option><option value="Texas">Texas</option><option value="Utah">Utah</option><option value="Vermont">Vermont</option><option value="Virginia">Virginia</option><option value="Virgin Islands">Virgin Islands</option><option value="Washington">Washington</option><option value="West Virginia">West Virginia</option><option value="Wisconsin">Wisconsin</option><option value="Wyoming">Wyoming
                            </option>
                        </select>
                        </div>
                        <div className="addressPadding">
                        <label>Zip Code</label>
                        <input className="addressInput" type="text" required onChange={e => setZip(e.target.value)} />
</div>
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
