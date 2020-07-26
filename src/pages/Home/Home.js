import React, { Component } from "react";

import Card from "../../components/Card/Card";

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

  GoTo = (id) => {
    const { location,history }= this.props;
    history.push(`${location.pathname}/${id}`);
  }

  render() {
    const { isLoading, trackers } = this.state;
    console.log(isLoading);
    console.log("props",this.props)
    return (
      <div>
        {isLoading ? (
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        ) : trackers && trackers.length > 0 ? (
          <div className="row">
            {trackers.map(item => (
              <div key={item._id} className="col s4">
                <Card  title={item.name} id={item._id} content={item.description} action1={{ label: "Select", action: this.GoTo }} />
              </div>
            ))}
          </div>
        ) : (
              <div>Create New Tracker</div>
            )}
      </div>
    );
  }
}
