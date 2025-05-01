import React from 'react';

const Privacy: React.FC = () => (
  <div className="max-w-3xl mx-auto py-16 px-4">
    <h1 className="text-4xl font-serif mb-6">Privacy Policy</h1>
    <h2 className="text-2xl font-semibold mt-8 mb-2">Website Privacy Policy</h2>
    <p className="mb-4">We value your privacy. D&D Design Center does not share, sell, or rent your personal information to third parties. Information collected through our website is used solely to provide and improve our services, respond to inquiries, and process orders. We use industry-standard security measures to protect your data. By using our website, you consent to our privacy practices. For questions, contact info@dnddesigncenter.com.</p>
    <h2 className="text-2xl font-semibold mt-8 mb-2">App Privacy Policy</h2>
    <p className="mb-2">This app is built exclusively for D&D Design Center’s internal use. It securely connects to Google Workspace to send and receive business-related emails via the Gmail API.</p>
    <ul className="list-disc pl-6 mb-4">
      <li>We collect names and email addresses of users (via Supabase Auth)</li>
      <li>Message content and metadata (only for business orders)</li>
      <li>Customer information as entered by staff</li>
    </ul>
    <p className="mb-4">We do not share, sell, or expose any data to third parties. All data is stored securely in Supabase and access is restricted to authorized staff only. The app reads and sends emails only on behalf of the connected business Gmail account, and does not modify, delete, or move any emails from the Gmail inbox unless explicitly triggered by the user.</p>
    <p>If you have any privacy-related concerns, please contact:<br />
      <span className="font-medium">📧 info@dnddesigncenter.com</span>
    </p>
  </div>
);

export default Privacy;
