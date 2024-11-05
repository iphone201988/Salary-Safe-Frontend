// src/pages/PrivacyPolicy.tsx

import React from "react";
import LegalPage from "../components/LegalPage";

const PrivacyPolicy: React.FC = () => {
  return (
    <LegalPage title="Privacy Policy">
      <h2 className="text-xl font-semibold mt-4">1. Data Collection and Use</h2>
      <p>
        Salary-Safe collects personal information to provide our services, including your name, contact details,
        employment history, salary expectations, and job preferences. We use this data for matching, salary
        benchmarking, and service improvement.
      </p>

      <h2 className="text-xl font-semibold mt-4">2. Data Retention Policy</h2>
      <p>
        We retain your personal data for as long as you have an active account. When you close your account, we either
        delete or anonymize your data, unless it is required for legal or regulatory purposes.
      </p>

      <h2 className="text-xl font-semibold mt-4">3. Data Transfer</h2>
      <p>
        Your data may be transferred to servers outside your country. We comply with relevant data protection laws,
        including the GDPR for users in the European Union, and ensure appropriate safeguards for cross-border data
        transfers.
      </p>

      <h2 className="text-xl font-semibold mt-4">4. Cookies and Tracking Technologies</h2>
      <p>
        Salary-Safe uses cookies to improve user experience and for analytics purposes. Users can manage cookie settings
        in their browser.
      </p>

      <h2 className="text-xl font-semibold mt-4">5. Automated Decision-Making and Profiling</h2>
      <p>
        Salary-Safe utilizes AI-driven tools to recommend salary ranges and job matches. If you wish to opt-out of
        automated decision-making, please contact us to discuss options for human intervention.
      </p>

      <h2 className="text-xl font-semibold mt-4">6. User Consent and Withdrawal of Consent</h2>
      <p>
        By signing up, you consent to our use of your personal information as described. You may withdraw your consent
        or update your preferences in your account settings or by contacting us directly.
      </p>

      <h2 className="text-xl font-semibold mt-4">7. Right to Erasure (Right to be Forgotten)</h2>
      <p>
        You have the right to request deletion of your data, also known as the right to be forgotten. If you would like
        to delete your account and associated data, contact our support team.
      </p>

      <h2 className="text-xl font-semibold mt-4">8. Third-Party Links</h2>
      <p>
        Salary-Safe may contain links to third-party websites. We are not responsible for the privacy practices or
        content of these external sites. We encourage users to read third-party privacy policies.
      </p>

      <h2 className="text-xl font-semibold mt-4">9. Children's Privacy</h2>
      <p>
        Salary-Safe is intended for users aged 18 and over. We do not knowingly collect data from children under 18.
      </p>

      <h2 className="text-xl font-semibold mt-4">10. Security Measures</h2>
      <p>
        We implement security measures to protect your data. However, we cannot guarantee complete security. In the
        event of a data breach, affected users and relevant authorities will be notified in compliance with applicable
        laws.
      </p>

      <h2 className="text-xl font-semibold mt-4">11. Data Breach Notification</h2>
      <p>
        If Salary-Safe experiences a data breach that compromises user data, we will promptly notify affected users and
        the appropriate regulatory bodies in accordance with relevant laws.
      </p>

      <h2 className="text-xl font-semibold mt-4">12. Updates to Privacy Policy</h2>
      <p>
        Salary-Safe may update this Privacy Policy periodically. We will notify you of any significant changes and,
        where necessary, seek additional consent.
      </p>
    </LegalPage>
  );
};

export default PrivacyPolicy;
