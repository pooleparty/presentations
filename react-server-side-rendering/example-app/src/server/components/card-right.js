import React, { Component } from 'react';
import PropTypes from 'prop-types';
import tws from './tweet';
import Title from './title';
import { App } from './propTypes';

class CardRight extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    app: App.isRequired,
  };

  render() {
    const { name, app } = this.props;
    return (
      <div className="col-right">
        <div className="app-meta">
          <Title name={name} publisher={app.publisher} />
          <span className="app-lic">{app.price}</span>
        </div>
        <div className="app-intro" dangerouslySetInnerHTML={{ __html: app.desc }} />
        <hr />
        <div className="app-link">
          <a className="btn" href={app.link} target="_blank">
            Get App
          </a>
          <a
            href="#/"
            className="btn btn-twitter"
            title="Share on Twitter"
            rel="nofollow"
            onClick={(e) => {
              tws(app.tweet);
              e.preventDefault();
            }}
          >
            <i className="icon icon-inline icon-twitter-light " />
            Tweet
          </a>
        </div>
      </div>
    );
  }
}

export default CardRight;
