import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardLeft from './card-left';
import CardRight from './card-right';
import { Apps } from './propTypes';

class Card extends Component {
  static propTypes = {
    apps: Apps.isRequired,
    totalApps: PropTypes.number.isRequired,
  };

  render() {
    const { apps, totalApps } = this.props;

    const cards = apps.map((app, index) => (
      <div className="app-card" key={app.name}>
        <CardLeft img={app.img} appNumber={index + 1} totalApps={totalApps} />
        <CardRight name={app.name} app={app} />
      </div>
    ));

    return <div>{cards}</div>;
  }
}

export default Card;
