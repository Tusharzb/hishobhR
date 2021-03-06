import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import Card from "../../Components/Card/Card";

import { getTrackers, createTracker } from "../../Services/base";

import './Home.style.scss';
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trackers: [],
      isLoading: true,
      title: '',
      description: '',
    };
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    this.setState({ isLoading: true });
    try {
      const userId = "5f12bf65af7273065c1a0700";
      const response = await getTrackers(userId);
      const trackers = response.data || [];
      console.log({ trackers });
      if (trackers.length > 0) {
        this.setState({ trackers: trackers });
      }
      this.setState({ isLoading: false });
    } catch (err) {
      console.log(err);
    }
  };

  GoTo = (id) => {
    const { trackers } = this.state;
    const { location, history } = this.props;
    const selectedIndex = trackers.find(item => item._id === id);
    localStorage.setItem('activeTracker', JSON.stringify(selectedIndex));
    history.push({ pathname: `${location.pathname}/${id}`, state: { tracker: selectedIndex, isHistory: false } });
  }

  submit = async () => {
    try {
      const { title, description } = this.state;
      if (title && description) {
        await createTracker({ name: title, description: description })
        console.log(title, description)
        this.loadData();
      }
    } catch (err) {
      console.log(err);
    }
  }

  getDateOnly = (date) => {
    return moment(date).format("DD-MM-YYYY");
  }

  render() {
    const { isLoading, trackers } = this.state;
    return (
      <div>
        <div className="form-wrapper">
          <h4>Create a Tracker</h4>
          <div className="row">
            <div className="input-field col s12 m4">
              <input value={this.state.title} placeholder="Title" type="text" onChange={(e) => this.setState({ title: e.target.value })} className="validate" />
            </div>
            <div className="input-field col s12 m6">
              <input placeholder="description" value={this.state.description} onChange={(e) => this.setState({ description: e.target.value })} type="text" className="validate" />
            </div>
            <div className="footer col s12 m2">
              <button className="waves-effect waves-light btn" onClick={this.submit}>Create</button>
            </div>
          </div>
        </div>
        <section className="body-wrapper">
          <h4>Trackers</h4>
          {
            isLoading ? (
              <div className="progress" >
                <div className="indeterminate"></div>
              </div>
            ) : trackers && trackers.length > 0 ? (
              <div className="row">
                {trackers.map(item => (
                  <div key={item._id} className="col s12 m4">
                    <Card createdOn={this.getDateOnly(item.createdOn)} title={item.name} id={item._id} content={item.description} action1={{ label: "Select", action: this.GoTo }} />
                  </div>
                ))}
              </div>
            ) : (
                  <div>Create New Tracker</div>
                )
          }
        </section>
      </div >
    );
  }
}

Home.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
}

export default Home;
