/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { ToastsStore } from 'react-toasts';
import InputRange from 'react-input-range';
import { SettingService } from '../../services/Setting'
import { showLoader, hideLoader } from '../../public/loader';
import 'react-input-range/lib/css/index.css';

const Filters = (props) => {
    const [filters, setFilters] = useState({skills: [], genders: []});
    const [formData, setFormData] = useState({gender: '', skill: ''});
    const [sliderValue, setSliderValue ] = useState({ min: 18, max: 35 });
    const sliderOnChange = (val) => {
        setSliderValue({min: val.min, max: val.max});
        console.log(val.min, val.max);
    }

    useEffect(() => {
        showLoader();
        Promise.all([SettingService.getSkills(), SettingService.getGenders()])
        .then((res)=>{
            if(res[0].status !== 'error'){
                setFilters({skills: res[0].data.data})
            }else { 
                ToastsStore.error(res[0].message); 
            }
            if(res[1].status !== 'error'){
                setFilters({genders: res[1].data.data})
            }else { 
                ToastsStore.error(res[1].message); 
            }
        })
        .catch((e)=>console.error("error: "+ e))
        .then(() => hideLoader());
    }, []);

    return(
        <div className='clr__white wh80 h480 mt30'>
            <div className='liked-talent-title p35'>
                <p className="oniline-status-title fs25"><b>Filters</b></p>
            </div>
            <div className='p35 d-flex flex-dir-col'>
                <label className='fs20 muli'>Skills</label>
                <select name="skill" id="skill" value={formData.skill} onChange={(val)=>{debugger; setFormData({skill: val})}} className="form-control border-none">
                    <option value="">Select</option>                    
                    {filters.skills && filters.skills.map((sk, index) => {
                        console.log('option: ', sk.name);
                        return <option key={index}>{sk.name}</option>
                    })}
                </select>

                <label className='fs20 muli mt10'>Age</label>
                <div>                    
                    <InputRange
                        value={sliderValue}
                        onChange={sliderOnChange}
                        maxValue={100}
                        minValue={1}
                    />
                </div>

                <label className='fs20 muli mt25'>Gender</label>
                <div className='d-flex space-between'>
                    <div>
                        <label className="containers">All/Any
                            <input type="radio" name="radio" />
                            <span className="checkmark" />
                        </label>
                        {filters.genders && filters.genders.map((gender) => {
                            return(
                                <label key={gender.id} className="containers">{gender.sex}
                                    <input type="radio" name="radio" />
                                    <span className="checkmark" />
                                </label>
                            )
                        })}
                    </div>
                </div>
                <button className="filter-btn mt20">Apply Filter</button>
            </div>
        </div>
    );
}
export default Filters