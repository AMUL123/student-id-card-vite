import React, { useState } from 'react';

const defaultFormState = {
  name: '',
  rollNumber: '',
  classDivision: '',
  allergies: [],
  rackNumber: '',
  busRoute: '',
  photo: null,
};

const allergyOptions = ['Peanuts', 'Gluten', 'Lactose', 'Pollen'];
const busRoutes = ['Route 1', 'Route 2', 'Route 3', 'Route 4'];

const FIELD_LIMITS = {
  NAME: 50,
  ROLL: 20,
  CLASS: 20,
  RACK: 10,
  BUS: 20,
};

const StudentForm = ({ onSubmit }) => {
  const [form, setForm] = useState(defaultFormState);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (e) => {
    const options = [...e.target.options];
    const selected = options.filter((opt) => opt.selected).map((opt) => opt.value);
    setForm((prev) => ({ ...prev, allergies: selected }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Please upload an image smaller than 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          photo: reader.result,
        }));
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const qrData = {
      name: form.name.substring(0, FIELD_LIMITS.NAME),
      roll: form.rollNumber.substring(0, FIELD_LIMITS.ROLL),
      class: form.classDivision.substring(0, FIELD_LIMITS.CLASS),
      allergies: form.allergies,
      rack: form.rackNumber.substring(0, FIELD_LIMITS.RACK),
      bus: form.busRoute.substring(0, FIELD_LIMITS.BUS),
    };

    onSubmit({ ...form, qrData });
    setForm(defaultFormState);
    setPreviewUrl(null);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-2xl shadow-xl space-y-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">Student ID Form</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Student Name</label>
          <input
            name="name"
            type="text"
            placeholder="e.g., John Doe"
            value={form.name}
            onChange={handleChange}
            required
            maxLength={FIELD_LIMITS.NAME}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Roll Number</label>
          <input
            name="rollNumber"
            type="text"
            placeholder="e.g., 12345"
            value={form.rollNumber}
            onChange={handleChange}
            required
            maxLength={FIELD_LIMITS.ROLL}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Class & Division</label>
          <select
            name="classDivision"
            value={form.classDivision}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          >
            <option value="">Select Class & Division</option>
            <option value="10-A">10 - A</option>
            <option value="10-B">10 - B</option>
            <option value="11-A">11 - A</option>
            <option value="11-B">11 - B</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Rack Number</label>
          <input
            name="rackNumber"
            type="text"
            placeholder="e.g., R12"
            value={form.rackNumber}
            onChange={handleChange}
            required
            maxLength={FIELD_LIMITS.RACK}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Bus Route</label>
          <select
            name="busRoute"
            value={form.busRoute}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          >
            <option value="">Select Bus Route</option>
            {busRoutes.map((route) => (
              <option key={route} value={route}>{route}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Allergies</label>
          <select
            multiple
            value={form.allergies}
            onChange={handleMultiSelect}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          >
            {allergyOptions.map((allergy) => (
              <option key={allergy} value={allergy}>{allergy}</option>
            ))}
          </select>
          <small className="text-gray-500 text-sm">Hold CTRL or ⌘ to select multiple</small>
        </div>
      </div>

      {/* Photo Upload */}
      <div className="mt-4">
        <label className="block mb-1 font-medium text-gray-700">Upload Student Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="w-full text-sm text-gray-700"
          required
        />
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Preview"
            className="mt-4 w-32 h-32 object-cover rounded-lg shadow border"
          />
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg"
      >
        Generate ID Card
      </button>
    </form></div>
  );
};

export default StudentForm;
