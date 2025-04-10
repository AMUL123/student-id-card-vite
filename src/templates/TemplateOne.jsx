// src/templates/TemplateOne.jsx

import React from "react";
import { QRCodeCanvas } from "qrcode.react";

const TemplateOne = ({ student, onDownload }) => {
  const photoSrc = student.photo || "https://via.placeholder.com/100x100.png?text=Photo";

  return (
    <div className="p-4 w-[300px] border rounded shadow bg-white">
      <h2 className="text-center font-bold text-lg mb-2">Student ID Card</h2>
      <div className="flex flex-col items-center">
        <img
          src={photoSrc}
          alt="Student"
          className="w-24 h-24 object-cover rounded-full border mb-2"
        />
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Roll No:</strong> {student.rollNumber}</p>
        <p><strong>Class & Div:</strong> {student.classDivision}</p>
        <p><strong>Allergies:</strong> {student.allergies?.join(", ") || "None"}</p>
        <p><strong>Rack No:</strong> {student.rackNumber}</p>
        <p><strong>Bus Route:</strong> {student.busRoute}</p>

        {/* Principal's Signature Section */}
        <div className="my-2">
          <div className="border-t-2 border-gray-500 w-24 mt-1" />
          <p className="text-xs text-gray-600 mt-1">Principal's Signature</p>
        </div>

        <div className="my-2">
          <QRCodeCanvas
            value={JSON.stringify({
              name: student.name,
              rollNumber: student.rollNumber,
              classDivision: student.classDivision,
              busRoute: student.busRoute,
            })}
            size={80}
          />
        </div>
        <button
          onClick={onDownload}
          className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download PNG
        </button>
      </div>
    </div>
  );
};

export default TemplateOne;
