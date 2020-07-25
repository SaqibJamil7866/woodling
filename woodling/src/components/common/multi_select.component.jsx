import React from 'react';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import { filterBy } from '@progress/kendo-data-query';
import '@progress/kendo-theme-default/dist/all.css';

class MultiSelectDropdown extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: props.data.slice()
        };
    }


    filterChange = (event) => {
        this.setState({
            data: filterBy(this.props.data.slice(), event.filter)
        });
    }

    render() {
        return (
            <MultiSelect
                data={this.state.data}
                filterable={this.props.filter}
                onFilterChange={this.filterChange}
            />
        );
    }
}

export default MultiSelectDropdown;