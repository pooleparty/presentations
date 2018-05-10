import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import { Apps } from './propTypes';

class App extends Component {
  static propTypes = {
    apps: Apps,
  };

  static defaultProps = {
    apps: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      isFetching: false,
      apps: this.props.apps || [],
    };
  }

  componentDidMount() {
    this.fetchAppsIfNeeded();
  }

  fetchAppsIfNeeded = () => {
    const { apps } = this.state;
    if (apps.length === 0) {
      console.log('Need to fetch apps');
      if (!this.state.isFetching) {
        this.fetchApps();
      }
    } else {
      console.log('No need to fetch apps');
    }
  };

  fetchApps = () => {
    this.setState({ isFetching: true }, () => {
      fetch('public/data/data.json')
        .then(response => response.json())
        .then((apps) => {
          this.setState({ isFetching: false, apps });
        });
    });
  };

  render() {
    const { isFetching, apps } = this.state;
    const totalApps = apps.length;

    return (
      <div>
        {isFetching && apps.length === 0 && <h2>Loading...</h2>}
        {!isFetching && apps.length === 0 && <h2>Empty.</h2>}
        <Card apps={apps} totalApps={totalApps} />
      </div>
    );
  }
}

export default App;
