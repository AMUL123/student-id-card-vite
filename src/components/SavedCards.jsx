import React from 'react';
import IDCard from './IDCard';

const SavedCards = ({ cards, template }) => {
  if (!cards || cards.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-semibold text-purple-800 mb-2 text-center">📚 Saved ID Cards</h2>
      <div className="mx-auto my-8 px-4 max-w-7xl">
  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
    {cards.map((student, index) => (
      <IDCard key={index} student={student} template={template} />
    ))}
  </div>
</div>
    </div>
  );
};

export default SavedCards;