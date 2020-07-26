import React, { Component } from "react";
import Shimmer from "react-shimmer-effect";

import Card from "../../components/card/Card";

import { getTrackers } from "../../services/base";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackers: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    try {
      const response = await getTrackers("5f12bf65af7273065c1a0700");
      console.log(response);
      const trackers = response.data || [];
      if (trackers.data.length > 0) {
        this.setState({ trackers: trackers.data });
      }
      this.setState({ isLoading: false });
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { isLoading, trackers } = this.state;
    console.log(isLoading);
    return (
      <div>
        {isLoading ? (
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        ) : trackers && trackers.length > 0 ? (
          <div className="tracker-card-wrapper">
            <Card />
          </div>
        ) : (
          <div>Create New Tracker</div>
        )}
      </div>
    );
  }
}
