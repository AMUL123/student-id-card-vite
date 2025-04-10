// src/templates/TemplateTwo.jsx

import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const TemplateTwo = ({ student, onDownload }) => {
  const photoSrc = student.photo || "https://via.placeholder.com/100x100.png?text=Photo";

  // Create a simplified version of the student data for QR code
  const qrData = JSON.stringify({
    name: student.name,
    rollNumber: student.rollNumber,
    classDivision: student.classDivision,
    rackNumber: student.rackNumber,
    busRoute: student.busRoute,
    allergies: student.allergies
  });

  return (
    <div className="p-4 w-[300px] border-2 border-gray-700 rounded-lg bg-gray-100 shadow-md">
      <div className="text-center mb-2">
        <h2 className="text-xl font-bold text-gray-800">Unity School</h2>
        <p className="text-sm text-gray-600">Smart ID Card</p>
      </div>
      <div className="flex items-center gap-3 mb-3">
        <img
          src={photoSrc}
          alt="Student"
          className="w-20 h-20 object-cover rounded-md border"
        />
        <div className="text-sm">
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Roll:</strong> {student.rollNumber}</p>
          <p><strong>Class:</strong> {student.classDivision}</p>
        </div>
      </div>
      <div className="text-sm mb-2">
        <p><strong>Allergies:</strong> {student.allergies?.join(", ") || "None"}</p>
        <p><strong>Rack No:</strong> {student.rackNumber}</p>
        <p><strong>Bus Route:</strong> {student.busRoute}</p>
      </div>
      <div className="flex justify-between items-center">
        <QRCodeCanvas value={qrData} size={70} />
        <button
          onClick={onDownload}
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default TemplateTwo;
