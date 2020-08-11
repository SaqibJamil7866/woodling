import React from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import CustomRenderingMultiSelectDropdown from './custom_rendering_multi_select.component';

const TagAndLoc = (props) => {
    const { tagPeople, handleChange, handleLocationSearch, isLocationLoading, itemRender, value, filterChange, dataItemKey, textField, filter, handleLocation, locations } = props;    
    return ( 
        <div>
            <div>
                <i className='fa fa-user tag-icon'>  Tag People</i>
                <div style={{width:'79%', display:'inline-block'}}>
                    <CustomRenderingMultiSelectDropdown
                        data={tagPeople} 
                        value={value}
                        filter={filter}
                        handleChange={handleChange}
                        filterChange={filterChange}
                        itemRender={itemRender}
                        dataItemKey={dataItemKey}
                        textField={textField}
                    />
                </div>
            </div>
            <div className='mt10'>
                <i className='fa fa-map-marker tag-icon padding-right-40'>  Location</i>
                <div style={{width:'79%', display:'inline-block'}}>
                <AsyncTypeahead
                    id="location_typehead"
                    labelKey="description"
                    isLoading={isLocationLoading}
                    placeholder="Search for a Location (type min 3 char)"
                    minLength={3}
                    onSearch={handleLocationSearch}
                    onChange={handleLocation}
                    options={locations}
                    className="form-control border-none bckgrnd-grey h45px box-shadow-none"
                />
                </div>
            </div>
        </div>
     );
}
 
export default TagAndLoc;