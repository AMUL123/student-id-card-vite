import React from 'react';

const TemplateSwitcher = ({ template, setTemplate }) => {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">Template Style:</label>
      <select
        value={template}
        onChange={(e) => setTemplate(e.target.value)}
        className="w-full p-2 border rounded"
      >
        <option value="template1">Classic (Purple)</option>
        <option value="template2">Modern (Blue)</option>
      </select>
    </div>
  );
};

export default TemplateSwitcher;