/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { ToastsStore } from 'react-toasts';
import InputRange from 'react-input-range';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { CastingCallService } from '../../services/CastingCallsService';
import { SettingService } from '../../services/Setting'
import { showLoader, hideLoader } from '../../public/loader';
import 'react-input-range/lib/css/index.css';

const CastingCallFilters = (props) => {
    const [skills, setSkills] = useState([]);
    const [genders, setGenders] = useState([]);
    const [locations, setLocations] = useState([]);
    const [productionTypes, setProductionType] = useState([]);
    const [formData, setFormData] = useState({gender: '', skill: '', production_type: '', location: ''});
    const [sliderValue, setSliderValue ] = useState({ min: 18, max: 35 });
    const sliderOnChange = (val) => {
        setSliderValue({min: val.min, max: val.max});
        console.log(val.min, val.max);
    }

    const handleLocationSearch = (keyword) =>{
        CastingCallService.getLocation(keyword)
        .then((res) => {
            setLocations(res.data.predictions);
        })
    }

    const handleLocation = (location) => {
        if(location && location.length > 0){
            setFormData({...formData, location: location[0].description});
            // this.setState({selectedLocation: location[0]}, () => {
            //     const {selectedLocation}= this.state;
            //     ActivityStreamService.getLocationDetailByPlaceId(selectedLocation.place_id)
            //     .then((response) => {
            //         const res= response.data.results[0];
            //         const address = selectedLocation.description.split(',');
            //         this.setState({city: address[address.length-2],country: address[address.length-1],lat: res.geometry.location.lat, lng: res.geometry.location.lng, formatted_address: res.formatted_address})
            //     })
            // })
        }
    }

    useEffect(() => {
        showLoader();
        Promise.all([SettingService.getSkills(), SettingService.getGenders(), CastingCallService.getProductionType()])
        .then((res)=>{
            if(res[0].status !== 'error'){
                setSkills(res[0].data.data)
            }else { 
                ToastsStore.error(res[0].message); 
            }
            if(res[1].status !== 'error'){
                setGenders(res[1].data.data);
            }else { 
                ToastsStore.error(res[1].message); 
            }
            if(res[2].status !== 'error'){
                setProductionType(res[2].data.data);
            }else { 
                ToastsStore.error(res[2].message); 
            }
        })
        .catch((e)=>console.error("error: "+ e))
        .then(() => hideLoader());
    }, []);

    return(
        <div className='clr__white wh80 h520'>
            <div className='liked-talent-title p20'>
                <p className="oniline-status-title fs25"><b>Filters</b></p>
            </div>
            <div className='p10 d-flex flex-dir-col'>
                <label htmlFor='location' className='grey mb0'>Location</label>
                <AsyncTypeahead
                    id="location_typehead"
                    labelKey="description"
                    placeholder="Search for a Location"
                    minLength={3}
                    onSearch={handleLocationSearch}
                    onChange={handleLocation}
                    options={locations}
                    className="form-control box-shadow-none border-none brder-l-r-t mb10"
                />

                <label className='fs18 bold muli'>Production Type</label>
                <select name="skill" id="skill" onChange={(e)=>{setFormData({...formData, production_type: e.target.value})}} className="form-control border-none">
                    <option value="">Select</option>
                    {productionTypes && productionTypes.map((obj, index) => {
                        return <option key={index} value={obj.id}>{obj.name}</option>
                    })}
                </select>

                <label className='fs18 bold muli'>Skills</label>
                <select name="skill" id="skill" onChange={(e)=>{setFormData({...formData, skill: e.target.value})}} className="form-control border-none">
                    <option value="">Select</option>
                    {skills && skills.map((sk, index) => {
                        return <option key={index} value={sk.id}>{sk.name}</option>
                    })}
                </select>

                <label className='fs18 bold muli'>Age</label>
                <div>                    
                    <InputRange
                        value={sliderValue}
                        onChange={sliderOnChange}
                        maxValue={100}
                        minValue={1}
                    />
                </div>

                <label className='fs18 bold muli mt25'>Gender</label>
                <div className='d-flex space-between'>
                    <div>
                        <label className="containers">All/Any
                            <input type="radio" name="radio" />
                            <span className="checkmark" />
                        </label>
                        {genders && genders.map((gender) => {
                            return(
                                <label key={gender.id} className="containers">{gender.sex}
                                    <input type="radio" name="radio" onClick={()=>{setFormData({...formData, gender: gender.id})}} />
                                    <span className="checkmark" />
                                </label>
                            )
                        })}
                    </div>
                </div>
                <button className="filter-btn mt5" onClick={()=>props.applyFilter(formData, sliderValue)}>Apply Filter</button>
            </div>
        </div>
    );
}
export default CastingCallFilters