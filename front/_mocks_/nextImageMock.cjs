// eslint-disable-next-line @typescript-eslint/no-require-imports
const React = require('react');

// Mock du composant Image
const Image = (props) => {
  return React.createElement('img', { ...props, alt: props.alt });
};

module.exports = Image;