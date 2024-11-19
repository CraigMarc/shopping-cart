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


    // submit info for shipping price

    const handleSubmit = async e => {
        e.preventDefault();

        //send form data
        await fetch("http://localhost:3000/users/usps", {
            method: 'POST',
            //************ add weight and length later from db */
            body: JSON.stringify({
                originZIPCode: "22407",
                destinationZIPCode: zip,
                weight: 5,
                length: 3,
                width: 2,
                height: 1,
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
                console.log(data.totalBasePrice)
                setOrder({
                    lastName: lastName,
                    firstName: firstName,
                    address1: address1,
                    address2: address2,
                    email: email,
                    state: state,
                    zip: zip,
                    town: town,
                    shipping: data.totalBasePrice,
                    price: cartState,
                    items: cartItems

                })
                navigate('/summary')
            })


            .catch((err) => {
                console.log(err.message);
                /*
                                if (err.message.includes("Unauthorized")) {
                                    sessionStorage.removeItem("token");
                                    sessionStorage.removeItem("userName");
                                    navigate('/login')
                                }*/

            });


    }

    return (
        <div>
            <p>address</p>
            <form onSubmit={handleSubmit}>
                <div className="newAddressContainer">
                    <div>
                        <label>
                            First Name
                            <input type="text" required onChange={e => setFirstName(e.target.value)} />
                        </label>
                        <label>
                            Last Name
                            <input type="text" required onChange={e => setLastName(e.target.value)} />
                        </label>
                        <label>
                            Email
                            <input type="email" required onChange={e => setEmail(e.target.value)} />
                        </label>
                        <label>
                            Address Line 1
                            <input type="text" required onChange={e => setAddress1(e.target.value)} />
                        </label>
                        <label>
                            Address Line 2
                            <input type="text" onChange={e => setAddress2(e.target.value)} />
                        </label>
                        <label>
                            Town
                            <input type="text" required onChange={e => setTown(e.target.value)} />
                        </label>
                        <label>
                            State
                            <input type="text" required onChange={e => setState(e.target.value)} />
                        </label>
                        <label>
                            Zip Code
                            <input type="text" required onChange={e => setZip(e.target.value)} />
                        </label>
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