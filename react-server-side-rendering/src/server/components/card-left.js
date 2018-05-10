import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CardLeft extends Component {
  static propTypes = {
    appNumber: PropTypes.number.isRequired,
    totalApps: PropTypes.number.isRequired,
    img: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }).isRequired,
  };

  numbersLeadingZero({ appNumber, className }) {
    let count = 0;
    if (appNumber < 10) {
      count = `0${appNumber}`.slice(-2);
    } else {
      count = appNumber;
    }
    return <span className={className}>{count}</span>;
  }

  render() {
    const { appNumber, totalApps, img } = this.props;
    return (
      <div className="col-left">
        <div className="app-no">
          <this.numbersLeadingZero appNumber={appNumber} className="current" />
          <span className="connector">of </span>
          <br />
          <this.numbersLeadingZero appNumber={totalApps} className="total" />
        </div>

        <img className="app-icon" src={img.src} alt={img.alt} height="120" width="120" />
      </div>
    );
  }
}

export default CardLeft;
