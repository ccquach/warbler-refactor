import React from 'react';

const CloseButton = ({ onClose }) => (
  <button type="button" className="close" onClick={onClose}>
    <span>&times;</span>
  </button>
);

export default CloseButton;
