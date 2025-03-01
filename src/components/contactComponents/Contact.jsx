import { Header } from '../headerComponents/Header'
import { HeaderMobile } from '../headerComponents/HeaderMobile'
import { useState } from 'react'


function Contact(props) {

  const {

    cartItems,
    category,
    apiItems

  } = props;

  const [message, setMessage] = useState(null)

  //submit function

  const handleSubmit = async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());


    //send form data
    await fetch(`https://shoppingapi.fly.dev/users/contact`, {
      method: 'Post',
      body: JSON.stringify({
        email: data.email,
        subject: data.subject,
        message: data.message,

      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },

    })



      .then((response) => response.json())
      .then((data) => {


        if (data.Email == 'sent') {
          setMessage("We have recieved your message and will get back to you shortly.")
        }
        else {
          setMessage("Network problem try again later.")
        }
      })


      .catch((err) => {
        console.log(err.message);
      });


  }

  function RenderContent() {
    if (message == null) {
      return (
        <div className='contactContainer'>
          <h3>Contact Us</h3>
          <form onSubmit={handleSubmit}>
          <label>
              <p>Email</p>
              <input required className="titleInput" type="email" name="email" />
            </label>
            <label>
              <p>Subject</p>
              <input required className="titleInput" type="text" name="subject" />
            </label>
            <label>
              <p>Message</p>
              <textarea required className='contactText' type="text" name="message" />
            </label>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>

        </div>
      )
    }
    else {
      return (
        <h3 className='contactMessage'>{message}</h3>
      )
    }
  }


  return (
    <div>
      {window.innerWidth > 600 ? <Header cartItems={cartItems} apiItems={apiItems}
        category={category} /> : <HeaderMobile cartItems={cartItems}
          category={category} />}
      <div className='contactContainer'>
        <RenderContent />
      </div>

    </div>
  )

}

export default Contact;