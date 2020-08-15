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
        const { data } = this.state;
        const { textField, filter, dataItemKey, value, handleChange } = this.props;
        return (
            <MultiSelect
                data={data}
                value={value}
                onChange={handleChange}
                textField={textField}
                dataItemKey={dataItemKey}
                filterable={filter}
                onFilterChange={this.filterChange}
            />
        );
    }
}

export default MultiSelectDropdown;