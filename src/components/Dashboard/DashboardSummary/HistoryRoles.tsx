import React from 'react';

const HistoryOfRoles: React.FC = () => {
  const roles = [
    {
      title: 'NodeJs Developer',
      company: 'Techwin labs Inc',
      location: 'Remote',
      duration: 'Dec 2023 – Mar 24',
      responsibilities: [
        'Wrote clean, efficient, and scalable code for internal tools.',
        'Collaborated with senior developers to integrate new features.',
      ],
      achievements: [
        'Played a key role in the migration of legacy systems to a modern cloud infrastructure.',
      ],
    },
  ];

  return (
    <div className="bg-[#FFFFFF] p-8 space-y-8">
      <h2 className="text-3xl font-extrabold text-gray-900">History of Roles</h2>
      {roles.map((role, index) => (
        <div key={index} className="bg-[#fae8ff] rounded-lg shadow-xl p-6">
          <h3 className="text-2xl font-semibold text-gray-800">{role.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{role.company} | {role.location}</p>
          <p className="text-sm text-gray-500 mt-1">{role.duration}</p>

          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-800">Responsibilities:</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              {role.responsibilities.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h4 className="text-lg font-medium text-gray-800">Key Achievements:</h4>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              {role.achievements.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryOfRoles;
