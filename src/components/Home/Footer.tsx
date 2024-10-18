import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1B1035] text-[#F5EDEF] py-8">
      <div className="container mx-auto px-6">
        <ul className="flex justify-center space-x-6 mb-4">
          <li><Link to="/about" className="hover:text-[#019529]">About Us</Link></li>
          <li><Link to="/features" className="hover:text-[#019529]">Features</Link></li>
          <li><Link to="/request-demo" className="hover:text-[#019529]">Contact Us</Link></li>
          <li><Link to="/privacy" className="hover:text-[#019529]">Privacy Policy</Link></li>
          <li><Link to="/terms" className="hover:text-[#019529]">Terms of Service</Link></li>
        </ul>
        <p className="text-center">&copy; 2024 Salary-Safe</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#linkedin" className="hover:text-[#019529]">LinkedIn</a> {/* Keep external links with anchor tags */}
          <a href="#twitter" className="hover:text-[#019529]">Twitter</a>  {/* External link */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

