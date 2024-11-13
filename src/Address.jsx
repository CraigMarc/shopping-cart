import { useState, useEffect } from "react";

const Address = () => {

    const [address1, setAddress1] = useState()
    const [address2, setAddress2] = useState()
    const [state, setState] = useState()
    const [zip, setZip] = useState()
    const [town, setTown] = useState()
    const [token, setToken] = useState()
    const [loading, setLoading] = useState()

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
                console.log(data)

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