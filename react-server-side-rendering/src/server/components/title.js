import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Title extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
  };

  render() {
    const { name, publisher } = this.props;

    if (publisher) {
      return (
        <h3>
          {name}
          <span className="connector">by </span>
          <span className="publisher">{publisher}</span>{' '}
        </h3>
      );
    }
    return <h3>{name}</h3>;
  }
}

export default Title;
