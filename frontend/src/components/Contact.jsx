import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const messageRef = useRef();

  const handleClick = (e) => {
    e.preventDefault();

    // Get values from inputs
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const message = messageRef.current.value.trim();

    // Validate inputs (check if empty)
    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }

    // EmailJS params
    const templateParams = {
      user_name: name,
      user_email: email,
      message: message,
    };

    // Send email via EmailJS
    emailjs
      .send(
        "service_pqav7br", // Replace with your EmailJS Service ID
        "template_st4g577", // Replace with your EmailJS Template ID
        templateParams,
        "vSeLVdvY5H6wc1N5W" // Replace with your EmailJS Public Key
      )
      .then(
        (response) => {
          toast.success("Message sent successfully!");
          console.log("SUCCESS!", response.status, response.text);

          // Clear form after successful send
          nameRef.current.value = "";
          emailRef.current.value = "";
          messageRef.current.value = "";
        },
        (error) => {
          toast.error("Failed to send message. Please try again.");
          console.log("FAILED...", error);
        }
      );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Heading */}
      <h1 className="text-5xl font-extrabold text-yellow-400 mb-6 tracking-wide">Contact Us</h1>

      <p className="text-lg text-gray-300 max-w-2xl text-center mb-10 leading-relaxed">
        Have questions or want to get involved? We’d love to hear from you!  
        Reach out to us for donations, partnerships, or any inquiries.
      </p>

      {/* Contact Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full text-center">
        <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <p className="text-yellow-300 text-2xl font-semibold">📍 Location</p>
          <p className="text-gray-400 mt-2">Bangalore, India</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <p className="text-yellow-300 text-2xl font-semibold">📞 Phone</p>
          <p className="text-gray-400 mt-2">+91 9482024180</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition">
          <p className="text-yellow-300 text-2xl font-semibold">✉️ Email</p>
          <p className="text-gray-400 mt-2">leftoverlove@fooddonation.com</p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="mt-12 bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-3xl font-semibold text-yellow-400 text-center mb-6">Send us a message</h2>

        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            ref={nameRef}
            className="p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            ref={emailRef}
            className="p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <textarea
            placeholder="Your Message"
            rows="4"
            ref={messageRef}
            className="p-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          ></textarea>
          <button
            type="submit"
            onClick={handleClick}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-lg font-semibold text-lg transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
