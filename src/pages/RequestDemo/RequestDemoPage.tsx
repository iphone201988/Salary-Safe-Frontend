import React, { useState } from 'react';
import Header from '../../components/Home/Header';
import Footer from '../../components/Home/Footer';

const RequestDemoPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    message: '',
  });
  
  const [errors, setErrors] = useState({
    email: '',
    phone: '',
  });
  
  const [submitted, setSubmitted] = useState(false);

  // Regex for validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Real-time validation
    if (name === 'email') {
      setErrors({ ...errors, email: emailRegex.test(value) ? '' : 'Invalid email address' });
    }
    if (name === 'phone') {
      setErrors({ ...errors, phone: phoneRegex.test(value) ? '' : 'Invalid phone number' });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!errors.email && !errors.phone && formData.fullName && formData.companyName) {
      setSubmitted(true);
    }
  };

  return (
    <>
{/* header */}
<Header />
<main className='mt-10'>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Request a Demo</h2>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-lg font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#019529] focus:outline-none"
                required
              />
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-lg font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#019529] focus:outline-none"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#019529] focus:outline-none"
                required
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#019529] focus:outline-none"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>

            {/* Message (Optional) */}
            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message (optional)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#019529] focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-[#019529] text-white py-3 rounded-md hover:bg-[#017a22] transition duration-300"
              >
                Request a Demo
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#019529] mb-4">Thank you!</h3>
            <p>Your demo request has been submitted successfully. We will contact you shortly.</p>
          </div>
        )}
      </div>
    </div>
    </main>
    <Footer/>
    </>
  );
};

export default RequestDemoPage;
