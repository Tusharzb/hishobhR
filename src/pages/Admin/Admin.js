import React, { Component } from 'react';
import './Admin.style.scss';
import Select from 'react-select';
import { getCategories, deleteCategory, addCategory } from '../../services/base';
import { CategoryColumns } from '../../Utils/Utils';
import Table from '../../components/Table/Table';
import { CircleLoader } from '../../components/Loader/Loader';
const DEFAULT_CLASSNAME = "admin"

const ActionRow = (props) => {
    return (
        <button onClick={() => props.deleteCategory()} className="waves-effect waves-light btn red lighten-2">Delete</button>
    )
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
        const { newCategory, categories, showCategory, isLoading } = this.state;
        return (
            <div className={DEFAULT_CLASSNAME}>
                <div className={`${DEFAULT_CLASSNAME}-category`}>
                    {/* <Select
                        className="single-select"
                        classNamePrefix="select"
                        onChange={this.onCategorySelect}
                        options={this.optionGenerator(categories)}
                        placeholder="Search a Category"
                    /> */}
                    <input className="inputCategory" placeholder="add category" onChange={(e) => this.handelInput(e.target.value)} value={newCategory} />
                    <button className={`footer waves-effect waves-light btn`} onClick={this.submit}>Add</button>
                    {this.renderTable(showCategory)}
                </div>

            </div>
        );
    }
}

export default Admin;