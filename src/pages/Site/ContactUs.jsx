import React, { useState } from "react";
import PageHeading from "../../components/Shared/Utilities/PageHeading";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here (e.g., send to backend)
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="section-layout">
      <title>Contact Us | Pathway</title>
      <PageHeading
        heading={"Contact Us"}
        text={"We’re here to guide you every step of your journey"}
      />
      <main className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Contact Form */}
          <section className="card transform transition duration-300 hover:scale-105">
            <h2 className="border-primary mb-4 border-b-2 pb-2 text-2xl font-bold">
              Get in Touch
            </h2>
            <p className="mb-6">
              Have questions or need assistance? Fill out the form below, and
              our dedicated team will respond within 24 hours. Your journey to
              finding the perfect match starts here!
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  required
                />
              </div>
              <button type="submit" className="btn-secondary">
                Send Message
              </button>
            </form>
          </section>

          {/* Contact Information */}
          <section className="card transform transition duration-300 hover:scale-105">
            <h2 className="border-success mb-4 border-b-2 pb-2 text-2xl font-bold">
              Contact Information
            </h2>
            <p className="mb-6">
              We’re always here to assist you, whether you have questions about
              profiles, need help with your account, or just want to share
              feedback. Reach out to us through any of the methods below, and
              let’s make your journey to love smoother!
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <FiMail className="text-primary mr-4 text-2xl" />
                <div>
                  <h3 className="text-lg">Email</h3>
                  <p>
                    <a
                      href="mailto:support@pathway.com"
                      className="hover:underline"
                    >
                      support@pathway.com
                    </a>
                  </p>
                  <p className="text-sm">Expect a reply within 24 hours.</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiPhone className="text-primary mr-4 text-2xl" />
                <div>
                  <h3 className="text-lg">Phone</h3>
                  <p>
                    <a href="tel:+15551234567" className="hover:underline">
                      +1 (555) 123-4567
                    </a>
                  </p>
                  <p className="text-sm">Available Mon-Fri, 9 AM - 5 PM EST.</p>
                </div>
              </div>
              <div className="flex items-start">
                <FiMapPin className="text-primary mr-4 text-2xl" />
                <div>
                  <h3 className="text-lg">Address</h3>
                  <p>123 Pathway Lane, Suite 100, Love City, LC 12345</p>
                  <p className="text-sm">Visit us by appointment only.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
