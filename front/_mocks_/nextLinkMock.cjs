// eslint-disable-next-line @typescript-eslint/no-require-imports
const React = require('react');

const Link = ({ href, children, ...props }) => {
  return React.createElement('a', { href, ...props }, children);
};

module.exports = Link;