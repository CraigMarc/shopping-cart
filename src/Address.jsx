import { useState, useEffect } from "react";

const Address = () => {

    const [address1, setAddress1] = useState()
    const [address2, setAddress2] = useState()
    const [state, setState] = useState()
    const [zip, setZip] = useState()
    const [town, setTown] = useState()
    const [token, setToken] = useState()
    const [loading, setLoading] = useState()

    // get token


    const fetchInfo = async () => {
        //setLoading(true)

        try {
         
                const res = await fetch("https://api.usps.com/oauth2/v3/token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    // body: '{\r\n\t\t"client_id": "{{CLIENT_ID}}",\r\n\t\t"client_secret": "{{CLIENT_SECRET}}",\r\n\t\t"grant_type": "client_credentials"\r\n\t\t}',
                    body: JSON.stringify({
                       
                        
                    }),
                    mode: 'no-cors',
                });

            const tokenData = await res.json();

            setToken(tokenData)

        }


        catch (error) {
            console.error("There has been a problem with your fetch operation:", error);
            //add error message to dom
            //setError("true")

        }
        setLoading(false)

    }


    useEffect(() => {
        fetchInfo();
    }, [])

    console.log(token)

    // submit info for shipping price

    const handleSubmit = async e => {
        e.preventDefault();

        //send form data
        await fetch("https://api.usps.com/prices/v3/base-rates/search", {
            method: 'POST',
            body: JSON.stringify({
                originZIPCode: "22407",
                destinationZIPCode: "63118",
                weight: 5,
                length: 3,
                width: 2,
                height: 1,
                mailClass: "USPS_GROUND_ADVANTAGE",
                processingCategory: "MACHINABLE",
                rateIndicator: "SP",
                destinationEntryFacilityType: "NONE",
                priceType: "COMMERCIAL",
                mailingDate: "2021-07-01"
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