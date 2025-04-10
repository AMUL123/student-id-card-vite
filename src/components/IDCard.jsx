// src/components/IDCard.jsx

import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import * as htmlToImage from 'html-to-image';
import TemplateOne from '../templates/TemplateOne';
import TemplateTwo from '../templates/TemplateTwo';

const IDCard = ({ student, template }) => {
  const cardRef = useRef(null);

  const handleDownload = async () => {
    const node = cardRef.current;
    if (!node) return;
    const dataUrl = await htmlToImage.toPng(node);
    const link = document.createElement('a');
    link.download = `${student.name.replace(/\s/g, '_')}_ID.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div ref={cardRef}>
      {template === 'template1' ? (
        <TemplateOne student={student} onDownload={handleDownload} />
      ) : (
        <TemplateTwo student={student} onDownload={handleDownload} />
      )}
    </div>
  );
};

export default IDCard;
