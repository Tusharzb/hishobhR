import React, { Component } from 'react';
import Table from '../../components/Table/Table';
import { addCategory, deleteCategory, getCategories } from '../../services/base';
import { CategoryColumns } from '../../Utils/Utils';
import './Admin.style.scss';
import PropTypes from 'prop-types';
import Select from 'react-select';



const DEFAULT_CLASSNAME = "admin"

const ActionRow = (props) => {
    return (
        <button onClick={() => props.deleteCategory()} className="waves-effect waves-light btn red lighten-2">Delete</button>
    )
}

const ColorOptions = [
    { label: <div style={{ backgroundColor: "#e88b8b", width: "30px", height: "30px" }}></div>, value: "#e88b8b" },
    { label: <div style={{ backgroundColor: "#81d69f", width: "30px", height: "30px" }}></div>, value: "#81d69f" },
    { label: <div style={{ backgroundColor: "#74c3c3", width: "30px", height: "30px" }}></div>, value: "#74c3c3" },
    { label: <div style={{ backgroundColor: "#6a8ab9", width: "30px", height: "30px" }}></div>, value: "#6a8ab9" },
    { label: <div style={{ backgroundColor: "#766ab9", width: "30px", height: "30px" }}></div>, value: "#766ab9" },
    { label: <div style={{ backgroundColor: "#9b6ab9", width: "30px", height: "30px" }}></div>, value: "#9b6ab9" },
    { label: <div style={{ backgroundColor: "#b96a99", width: "30px", height: "30px" }}></div>, value: "#b96a99" },
    { label: <div style={{ backgroundColor: "#b9846a", width: "30px", height: "30px" }}></div>, value: "#b9846a" },
    { label: <div style={{ backgroundColor: "#b9ac6a", width: "30px", height: "30px" }}></div>, value: "#b9ac6a" },
    { label: <div style={{ backgroundColor: "#adb96a", width: "30px", height: "30px" }}></div>, value: "#adb96a" },
    { label: <div style={{ backgroundColor: "#8cb96a", width: "30px", height: "30px" }}></div>, value: "#8cb96a" },
]


ActionRow.PropTypes = {
    deleteCategory: PropTypes.func
}

class Admin extends Component {

    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            isLoading: true,
            newCategory: "",
            showCategory: false,
        }
    }

    componentDidMount() {
        this.loadData();
    }

    handelInput = (text) => {
        this.setState({ newCategory: text })
    }

    deleteCategory = async (id) => {
        try {
            await deleteCategory(id);
            this.loadData();
        } catch (err) {
            console.log(err)
        }
    }

    loadData = async () => {
        const respsonse = await getCategories();
        const categories = respsonse.data ? respsonse.data : [];
        categories && categories.forEach(element => {
            element.action = <ActionRow deleteCategory={() => this.deleteCategory(element._id)} />;
        })
        this.setState({ categories, isLoading: false })
    }

    optionGenerator = (array) => {
        return array.map(item => ({ value: item.name, label: item.name }))
    }


    submit = async () => {
        const { newCategory } = this.state
        try {
            await addCategory({ name: newCategory });
            this.loadData();
            this.setState({ newCategory: "" });
        } catch (er) {

        }
    }

    showCategory = (value) => {
        this.setState({ showCategory: value });
    }

    renderTable = (showCategory) => {
        const { categories } = this.state;
        return (
            showCategory ?
                (<React.Fragment>
                    < Table responsive columns={CategoryColumns} rows={categories} />
                    <a className="link" onClick={() => this.showCategory(false)}>hide all</a>
                </React.Fragment >) :
                <a className="link" onClick={() => this.showCategory(true)}>Show all</a>)
    }


    render() {
        const { newCategory, showCategory } = this.state;
        return (
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}-category`}>
                    <input className="inputCategory" placeholder="add category" onChange={(e) => this.handelInput(e.target.value)} value={newCategory} />
                    <Select options={ColorOptions} className="color-picker" classNamePrefix="picker" required />
                    <button className={`footer waves-effect waves-light btn`} onClick={this.submit}>Add</button>
                    {this.renderTable(showCategory)}
                </div>

            </div>
        );
    }
}


export default Admin;
