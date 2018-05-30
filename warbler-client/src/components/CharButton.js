import React from 'react';

const CharButton = ({ buttonType, buttonChar, buttonStyle, onClose }) => (
  <button
    type={buttonType}
    style={buttonStyle}
    className="close"
    onClick={onClose}
  >
    <span>{convertUnicode(buttonChar)}</span>
  </button>
);

function convertUnicode(input) {
  return input.replace(/\\u(\w\w\w\w)/g, function(a, b) {
    var charcode = parseInt(b, 16);
    return String.fromCharCode(charcode);
  });
}

export default CharButton;
