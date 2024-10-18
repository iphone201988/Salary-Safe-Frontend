import React from 'react';

const testimonials = [
  { name: 'HR Leader', feedback: 'Salary-Safe helped us achieve pay equity.' },
  { name: 'Company ABC', feedback: 'Their insights are incredibly valuable.' }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-3xl font-bold mb-6">What People Say</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="p-6 bg-gray-100 rounded-lg shadow-lg">
            <p className="italic mb-4">"{testimonial.feedback}"</p>
            <h4 className="font-bold">- {testimonial.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
