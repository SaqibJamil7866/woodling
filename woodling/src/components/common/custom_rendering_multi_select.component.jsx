import React from 'react';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
import { filterBy } from '@progress/kendo-data-query';
import '@progress/kendo-theme-default/dist/all.css';

class CustomRenderingMultiSelectDropdown extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: props.data.slice()
        };
    }

    render() {
        const { data } = this.state;
        const { filter, value, dataItemKey, textField, itemRender, handleChange, filterChange } = this.props;
        return (
            <MultiSelect
                data={data}
                value={value}
                itemRender={itemRender}
                onChange={handleChange}
                filterable={filter}
                onFilterChange={filterChange}
                dataItemKey={dataItemKey}
                textField={textField}
            />
        );
    }
}

export default CustomRenderingMultiSelectDropdown;