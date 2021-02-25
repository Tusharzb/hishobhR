import React, { useEffect } from 'react'
import { Control } from 'react-redux-form';
import PropTypes from 'prop-types';


function ReduxFields(props) {
    const { field } = props;
    let instances = "";
    useEffect(() => {
        instances = M.FormSelect.init(document.querySelectorAll('select'), {});
    }, [])

    const renderFields = () => {
        if (field.type === "select") {
            return (
                <div>
                    <label key={props.id}>{field.label}</label>
                    <Control.select model={`.${field.name}`} required={field.required}>
                        {
                            field.options.map((item, index) => (
                                <option key={index} value={item.value}>{item.label}</option>
                            ))
                        }
                    </Control.select>
                </div>
            )
        } else {
            return (
                <React.Fragment >
                    <label >{field.label}</label>
                    <Control key={props.id} type={field.type} model={`.${field.name}`} required={field.required} />
                </React.Fragment>
            )
        }
    }

    return (
        <div>
            {renderFields()}
        </div>
    )
}


ReduxFields.PropTypes = {
    data: PropTypes.array,
    className: PropTypes.string
}

export default ReduxFields;
