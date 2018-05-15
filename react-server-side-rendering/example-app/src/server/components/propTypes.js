import PropTypes from 'prop-types';

export const App = PropTypes.shape({
  name: PropTypes.string,
  publisher: PropTypes.string,
  price: PropTypes.string,
  img: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
  }),
  desc: PropTypes.string,
  link: PropTypes.string,
  tweet: PropTypes.string,
});

export const Apps = PropTypes.arrayOf(App);
