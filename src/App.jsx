import React, { useState, useEffect } from 'react';
import StudentForm from './components/StudentForm';
import IDCard from './components/IDCard';
import TemplateSwitcher from './components/TemplateSwitcher';
import SavedCards from './components/SavedCards';
import './index.css';

const App = () => {
  const [studentData, setStudentData] = useState(null);
  const [template, setTemplate] = useState('template1');
  const [savedCards, setSavedCards] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('student_cards');
    if (saved) {
      setSavedCards(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('student_cards', JSON.stringify(savedCards));
  }, [savedCards]);

  const handleSave = (data) => {
    setStudentData(data);
    setSavedCards((prev) => [data, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 p-6">
    <h1 className="text-4xl font-extrabold text-center text-purple-700 mb-10 tracking-tight">
      🎓 Smart Student ID Generator
    </h1>
  
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {/* Student Form Card */}
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 ">
        <StudentForm onSubmit={handleSave} />
      </div>
  
      {/* Preview + Template Switcher */}
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10 space-y-6 flex flex-col items-center">
        <TemplateSwitcher template={template} setTemplate={setTemplate} />
        {studentData ? (
          <IDCard student={studentData} template={template} />
        ) : (
          <p className="text-gray-500 text-sm">Fill the form to generate a preview</p>
        )}
      </div>
    </div>
  
    {/* Saved Cards Section */}
    <div className="mt-12 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Saved ID Cards</h2>
      <SavedCards cards={savedCards} template={template} />
    </div>
  </div>
  );
};
export default App;