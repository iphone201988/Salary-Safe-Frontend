// src/pages/TermsOfService.tsx

import React from "react";
import LegalPage from "../components/LegalPage";
const TermsOfService: React.FC = () => {
  return (
    <LegalPage title="Terms of Service">
      <h2 className="text-xl font-semibold mt-4">1. Introduction</h2>
      <p>
        Welcome to Salary-Safe. These Terms of Service ("Terms") govern your access to and use of our services,
        features, and website. By using Salary-Safe, you agree to these Terms. If you do not agree, please discontinue
        use.
      </p>

      <h2 className="text-xl font-semibold mt-4">2. User Conduct and Responsibilities</h2>
      <p>
        You agree to use Salary-Safe responsibly. You may not: provide false or misleading information, use bots or
        automated scripts to interact with the platform, harass or harm other users, or access another user’s account
        without permission.
      </p>

      <h2 className="text-xl font-semibold mt-4">3. Fees and Payment Terms</h2>
      <p>
        If Salary-Safe provides premium features or services, you agree to the applicable fees. Payments are
        non-refundable except where explicitly stated. You may cancel subscriptions in accordance with our policies.
      </p>

      <h2 className="text-xl font-semibold mt-4">4. Employment Disclaimer</h2>
      <p>
        Salary-Safe is a data-driven platform, not an employment agency. We do not guarantee job placements, interviews,
        or employment offers. The information provided is intended as guidance and not as a substitute for professional
        advice.
      </p>

      <h2 className="text-xl font-semibold mt-4">5. Data Accuracy and Limitation of Liability</h2>
      <p>
        Salary-Safe strives to provide accurate data, but we do not guarantee the accuracy, completeness, or
        reliability of salary and market data. Users should verify data independently. We are not responsible for any
        consequences resulting from the use of this information.
      </p>

      <h2 className="text-xl font-semibold mt-4">6. Termination and Suspension of Service</h2>
      <p>
        Salary-Safe may suspend or terminate your account at its discretion, including for inactivity, violation of
        these Terms, or misuse of the platform.
      </p>

      <h2 className="text-xl font-semibold mt-4">7. Intellectual Property</h2>
      <p>
        All materials, logos, text, and software on Salary-Safe are the property of Salary-Safe or its licensors. You
        may not use or distribute these materials without our permission.
      </p>

      <h2 className="text-xl font-semibold mt-4">8. Dispute Resolution and Arbitration</h2>
      <p>
        In the event of a dispute, we encourage you to contact us first to seek a resolution. If a resolution cannot be
        reached, disputes will be resolved through binding arbitration under the governing laws of our jurisdiction.
      </p>

      <h2 className="text-xl font-semibold mt-4">9. Indemnity</h2>
      <p>
        You agree to indemnify Salary-Safe against any legal claims, damages, or expenses arising from your use of the
        platform, including any breach of these Terms.
      </p>

      <h2 className="text-xl font-semibold mt-4">10. Changes to the Terms</h2>
      <p>
        Salary-Safe reserves the right to modify these Terms. We will notify users of significant changes. Continued use
        of the platform constitutes acceptance of revised Terms.
      </p>
    </LegalPage>
  );
};

export default TermsOfService;
