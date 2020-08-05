import React from 'react';
import MultiSelectDropdown from './multi_select.component';

const TagAndLoc = (props) => {
    const { tagPeople, filterChange, handleChange, value, textField, dataItemKey, filter, formatted_address, handleLocation, locations } = props;
    return ( 
        <div>
            <div>
                <i className='fa fa-user tag-icon'>  Tag People</i>
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
            <div className='mt10'>
                <i className='fa fa-map-marker tag-icon padding-right-40'>  Location</i>
                <div style={{width:'79%', display:'inline-block'}}>
                <input 
                    type="text" 
                    value={formatted_address}
                    onChange={handleLocation}
                    name='formatted_address' 
                    className="form-control border-none bckgrnd-grey h45px box-shadow-none"
                    placeholder="Type here..." />
                </div>
            </div>
        </div>
     );
}
 
export default TagAndLoc;