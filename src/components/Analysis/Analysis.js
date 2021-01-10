import React, { Component } from 'react';
import './Analysis.style.scss';
import Select from 'react-select';
import { categories } from '../../Utils/Utils';
import { connect } from 'react-redux';
import { Control, Form, actions } from 'react-redux-form';

class AnalysisImp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: {}
        }
    }

    optionGenerator = (array) => {
        return array.map(item => ({ value: item, label: item }))
    }

    onCategorySelect = (option) => {
        const { formChange } = this.props;
        const { filter } = this.state;
        if (option) {
            this.setState({ filter: { ...filter, "category": option.value } });
            formChange("filter.category", option.value);
        } else {
            formChange("filter.category", undefined);
        }

    }

    validate = (value) => {
        if (value === "") {
            return undefined;
        } else {
            return value
        }
    }

    reset = (e) => {
        e.preventDefault()  
        this.props.formReset();
    }


    render() {
        return (
            <Form model="filter">
                <div className="row" >
                    <div className="input-field col s12 m4">
                        <Control.text parser={this.validate} model=".reason" placeholder="reason" type="text" className="validate" />
                    </div>
                    <div className="input-field col s12 m3">
                        <Select
                            className="single-select"
                            classNamePrefix="select"
                            onChange={this.onCategorySelect}
                            options={this.optionGenerator(categories)}
                            placeholder="Select Category"
                            isClearable
                        />
                    </div>
                    <div className="input-field col s12 m2">
                        <Control.text parser={this.validate} model=".withdraw" placeholder="withdraw" type="Number" className="validate" />
                    </div>
                    <div className="input-field col s12 m2">
                        <Control.text parser={this.validate} model=".deposite" placeholder="deposite" type="Number" className="validate" />
                    </div>
                    <div className="col s12 m1">
                        <button onClick={this.reset} className={`footer waves-effect waves-light btn`} type="submit">Reset</button>
                    </div>
                </div>
            </Form>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        formChange: (type, data) => dispatch(actions.change(type, data)),
        formReset: () => dispatch(actions.change("filter", {}))
    }
}

export default connect(null, mapDispatchToProps)(AnalysisImp);
