import React from 'react';
import MultiSelectDropdown from './multi_select.component';

const TagAndLoc = (props) => {
    const { tagPeople, filterChange, handleChange, value, textField, dataItemKey, filter } = props;
    return ( 
        <div>
            <i className='fa fa-user tag-icon'>Tag People</i>
            <div style={{width:'79%', display:'inline-block'}}>
                <MultiSelectDropdown 
                    data={tagPeople} 
                    value={value} 
                    textField={textField} 
                    dataItemKey={dataItemKey} 
                    filter={filter}
                    filterChange={filterChange}
                    handleChange={handleChange}
                />
            </div>
        </div>
     );
}
 
export default TagAndLoc;