import React, { useState }   from 'react'
import { faFacebook, faInstagram, faInstagramSquare, faLinkedin, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const Contact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handleMessageChange = (e) => {
      setMessage(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add your logic to handle the form submission here
      console.log('Name:', name);
      console.log('Email:', email);
      console.log('Message:', message);
      // You can add an API call or any other handling as needed
    };

  return (
    <section className="bg-gray-200 py-16 px-4  text-center">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center  ">
    <div>
      <h2 className="text-3xl font-bold mb-4">Contact Information</h2>
      <p className="text-lg mb-4">Feel free to reach out to us:</p>
      <p className="text-gray-600  ">Email: mouhamedlamotte.dev@gmail.com</p>
      <p className="text-gray-600 ">Phone: +221 77 093-42-13</p>
      <p className="text-gray-600 ">Address: Mariste, Dakar</p>
      <p className="mt-6">
        Need assistance?{" "}
        <a href="#" className="text-blue-500 hover:underline">
          Get in Touch
        </a>
      </p>
    </div>
      {/* Column for Input Fields */}
      <div className="text-start">
        <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              className="bg-transparent  w-full border border-slate-300  rounded-md py-2 px-3 focus:outline-none focus:border-lime-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="bg-transparent  w-full border border-slate-300  rounded-md py-2 px-3 focus:outline-none focus:border-lime-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-600">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={message}
              onChange={handleMessageChange}
              className="bg-transparent  w-full border border-slate-300  rounded-md py-2 px-3 focus:outline-none focus:border-lime-500"
              required
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="px-4 py-2 w-full bg-lime-500 font-bold text-white rounded-md hover:shadow-lg focus:outline-none"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Column for Contact Information */}
    </div>
  </section>
  )
}
