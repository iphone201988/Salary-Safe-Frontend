// Import necessary modules and libraries
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import ProfileInfo from "./DashboardProfileSettings/ProfileInfo";
import PrimaryDetails from "./DashboardProfileSettings/PrimaryDetails";

type TeamMember = {
  name: string;
  email: string;
  role: string;
};

type DashboardProfileSettingData = {
  email: string;
  company_name: string;
  avatar: string | null;
  industry: string;
  company_size: string;
  headquarters_location: string;
  primary_contact_person: string;
  contact_phone_number: string;
  primary_hiring_goals: string[];
  preferred_job_locations: string[];
  roles_of_interest: string[];
  job_types: string[];
  dashboard_metrics: string;
  role_specific_customization: boolean;
  salary_benchmarking_preference: string;
  candidate_viewing_preferences: string;
  offer_optimization: string;
  enable_real_time_market_alerts: boolean;
  enable_custom_reporting: boolean;
  preferred_report_frequency: string | null;
  automated_updates: string;
  candidate_feedback_analysis: string;
  invite_team_member: TeamMember[];
  referral_source: string;
  referral_code: string;
  terms_accepted: boolean;
  id: string;
};

const DashboardProfileSetting: React.FC = () => {
  const [profileData, _setProfileData] = useState<DashboardProfileSettingData>({
    email: "adidas@gmail.com",
    company_name: "Pardeep",
    avatar: null,
    industry: "finance",
    company_size: "0-10",
    headquarters_location: "mohali,india",
    primary_contact_person: "88888888888",
    contact_phone_number: "65345645646",
    primary_hiring_goals: ["revenue growth", "profitability"],
    preferred_job_locations: ["onsite", "remote"],
    roles_of_interest: ["software_engineer", "data_scientist"],
    job_types: ["part_time", "contract", "internship"],
    dashboard_metrics: "candidateViews",
    role_specific_customization: true,
    salary_benchmarking_preference: "enableBenchmarking",
    candidate_viewing_preferences: "1",
    offer_optimization: "1",
    enable_real_time_market_alerts: true,
    enable_custom_reporting: true,
    preferred_report_frequency: null,
    automated_updates: "enableAutomatedUpdates",
    candidate_feedback_analysis: "enableFeedbackAnalysis",
    invite_team_member: [
      {
        name: "pardeep",
        email: "Pardeep@yopmail.com",
        role: "Viewer",
      },
    ],
    referral_source: "",
    referral_code: "asdasdas",
    terms_accepted: true,
    id: "fda2a06b-e5fa-46a7-b1c0-b5ce5152c265",
  });

  const [_editSection, _setEditSection] = useState<string | null>(null);

  // const handleEditClick = (section: string) => {
  //   setEditSection(section);
  // };

  // const handleSaveClick = ()  => {
  //   setEditSection(null);
  // };

  return (
    <div>
      <div className="container mx-auto p-2 bg-slate-400">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold text-white text-center mb-12">
            Dashboard Profile Settings
          </h1>
        </div>
      </div>
      <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
        {/* Profile Section */}
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between items-center">
            <ProfileInfo
              companyName={profileData.company_name}
              location={profileData.headquarters_location}
              email={profileData.email}
              phone={profileData.contact_phone_number}
              size={profileData.company_size}
            />
          </div>
          <div className="flex justify-between items-center">
            <PrimaryDetails
             hiringGoal={profileData.primary_hiring_goals}
             preferedjobLocation={profileData.preferred_job_locations}
             rolesOfInterest={profileData.roles_of_interest}
             JobTypes={profileData.job_types}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProfileSetting;
