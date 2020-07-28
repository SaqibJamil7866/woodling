import React from 'react';
import MultiSelectDropdown from './multi_select.component';

const TagAndLoc = (props) => {
    const { data, filterChange, handleChange, value, textField, dataItemKey, filter } = props;
    return ( 
        <div>
            <i className='fa fa-user tag-icon'>Tag People</i>
            <input type="search" placeholder='tag' name="search" className='border-radius' />
            <MultiSelectDropdown 
                data={data} 
                value={value} 
                textField={textField} 
                dataItemKey={dataItemKey} 
                filter={filter}
                filterChange={filterChange}
                handleChange={handleChange}
            />
        </div>
     );
}
 
export default TagAndLoc;