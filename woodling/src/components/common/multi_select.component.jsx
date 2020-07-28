import React from 'react';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import { filterBy } from '@progress/kendo-data-query';
import '@progress/kendo-theme-default/dist/all.css';

class MultiSelectDropdown extends React.Component {
    // constructor(props){
    //     super(props)
    //     this.state = {
    //         data: props.data.slice(),
    //         value: props.value
    //     };
    // }


    // filterChange = (event) => {
    //     this.setState({
    //         data: filterBy(this.props.data.slice(), event.filter)
    //     });
    // }

    // // get this method to the parent component
    // handleChange = (event) => {
    //     this.setState({
    //         value: event.target.value
    //     });
    // }

    render() {
        // const { data, value } = this.state;
        const { textField, filter, dataItemKey, data, value, filterChange, handleChange } = this.props
        return (
            <MultiSelect
                data={data}
                value={value}
                onChange={handleChange}
                textField={textField}
                dataItemKey={dataItemKey}
                filterable={filter}
                onFilterChange={filterChange}
            />
        );
    }
}

export default MultiSelectDropdown;