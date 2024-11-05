// src/components/LegalPage.tsx

import React from "react";

interface LegalPageProps {
  title: string;
  children: React.ReactNode;
}

const LegalPage: React.FC<LegalPageProps> = ({ title, children }) => {
  return (
    <div className="flex justify-center py-8 px-4 bg-gray-100 min-h-screen">
      <div className=" shadow-lg rounded-lg p-6 max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">{title}</h1>
        <div className="text-gray-700 space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default LegalPage;
