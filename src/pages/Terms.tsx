import React from 'react';

const Terms: React.FC = () => (
  <div className="max-w-3xl mx-auto py-16 px-4">
    <h1 className="text-4xl font-serif mb-6">Terms of Service</h1>
    <h2 className="text-2xl font-semibold mt-8 mb-2">Website Terms of Service</h2>
    <p className="mb-4">By accessing and using the D&D Design Center website, you agree to comply with all applicable laws and regulations. All content is provided for informational purposes only. We reserve the right to update or modify these terms at any time. Unauthorized use of this website may result in legal action. For questions, contact info@dnddesigncenter.com.</p>
    <h2 className="text-2xl font-semibold mt-8 mb-2">App Terms of Service</h2>
    <p className="mb-2">This internal business application is provided to D&D Design Center staff for managing customer orders, sending invoices, and handling email communication.</p>
    <ul className="list-disc pl-6 mb-4">
      <li>Use the platform only for business-related communication</li>
      <li>Respect customer privacy and data</li>
      <li>Never use the Gmail integration for spam or bulk messaging</li>
    </ul>
    <p className="mb-4">D&D Design Center reserves the right to monitor system usage for performance and security, revoke access at any time in case of misuse, and update these terms as needed. This app is not available to the general public and is operated solely for internal business operations.</p>
  </div>
);

export default Terms;
