import React, { Component } from "react";
import moment from 'moment';

import Card from "../../components/Card/Card";

import { getTrackers, createTracker } from "../../services/base";

import './Home.style.scss';
export default class Home extends Component {
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
      console.log(response);
      console.log("we are here!");
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
    const { location, history } = this.props;
    history.push(`${location.pathname}/${id}`);
  }

  submit = async () => {
    try {
      const { title, description } = this.state;
      if (title && description) {
        await createTracker({ name: title, description: description })
        console.log(title, description)
        this.loadData();
      }
    }catch(err){
      console.log(err);
    }
  }

  getDateOnly = (date) => {
    return moment(date).format("DD-MM-YYYY");
  }

  render() {
    const { isLoading, trackers } = this.state;
    console.log(isLoading);
    console.log("props", this.props)
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
