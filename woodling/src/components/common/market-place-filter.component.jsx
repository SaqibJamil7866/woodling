import React, { useState, useEffect } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { CastingCallService } from '../../services/CastingCallsService'; 
import { ActivityStreamService } from '../../services/ActivityStreamService';
import 'react-input-range/lib/css/index.css';

const MarketPlaceFilter = (props) => {

    const [filter, setFilters] = useState({form: {}, productTypes: [], locations: []});

    useEffect(function(){
        ActivityStreamService.getProductType()
        .then((res) => {
            setFilters({...filter, productTypes: res.data.data});
        }).catch((e) => console.log(e))
    },[]);

    const handleLocationSearch = (keyword) =>{
        CastingCallService.getLocation(keyword)
        .then((res) => {
            setFilters({...filter, locations: res.data.predictions});
        })
    }

    const handleLocation = (location) => {
        if(location && location.length > 0){
            const tempform = filter.form;
            setFilters({...filter, form:{...tempform, location: location[0].description}});
        }
    }

    const handleChange = (e) => {
        const tempform = filter.form;
        setFilters({...filter, form:{ ...tempform, [e.currentTarget.name]: e.currentTarget.value}});
    }

    return ( 
        <div className='clr__white wh80 h590 mt30'>
            <div className='liked-talent-title p35'>
                <p className="oniline-status-title fs25"><b>Filters</b></p>
            </div>
            <div className='p35 d-flex flex-dir-col'>
                <label className='fs20 muli'>Type</label>
                <select name="type" className="form-control border-none" onChange={handleChange}>
                    <option value=''>All</option>
                    {filter.productTypes && filter.productTypes.map((type)=>{
                        return <option value={type.id}>{type.name}</option>
                    })}
                </select>

                <label className='fs20 muli'>Sub-Category</label>
                <select name="sub_category" id="inputState" className="form-control border-none" onChange={handleChange}>
                    <option value=''>All</option>
                    <option value='popular'>Popular</option>
                    <option value='feature'>Feature</option>
                    <option value='latest'>Latest</option>
                </select>

                <label className='fs20 muli mt25'>Category</label>
                <div className='d-flex space-between'>
                    <div>
                        <label className="containers">All/Any
                            <input type="radio" onClick={handleChange} value="" name="category" />
                            <span className="checkmark" />
                        </label>
                        <label className="containers">For Sale
                            <input type="radio" onClick={handleChange} value="sale" name="category" />
                            <span className="checkmark" />
                        </label>
                    </div>
                    <div>
                        <label className="containers">For Rent
                            <input type="radio" onClick={handleChange} value="rent" name="category" />
                            <span className="checkmark" />
                        </label>
                        <label className="containers">Services
                            <input type="radio" onClick={handleChange} value="service" name="category" />
                            <span className="checkmark" />
                        </label>
                    </div>
                </div>

                <label htmlFor='location' className='grey mb0'>Location</label>
                <AsyncTypeahead
                    id="location_typehead"
                    labelKey="description"
                    placeholder="Search for a Location"
                    minLength={3}
                    onSearch={handleLocationSearch}
                    onChange={handleLocation}
                    options={filter.locations}
                    className="form-control box-shadow-none border-none brder-l-r-t mb10"
                />

                <label className='fs20 muli'>Price Range</label>
                <div>
                    <input type="number" min="0" max="99999999" onChange={handleChange} name="min_price" placeholder="0" />
                    <input type="number" className="ml5" min="0" max="99999999" onChange={handleChange} name="max_price" placeholder="99999999" />
                </div>
                <button className="filter-btn mt20" onClick={()=>props.searchMarketPlace(filter)}>Apply Filter</button>
            </div>
        </div>
     );
}
 
export default MarketPlaceFilter;