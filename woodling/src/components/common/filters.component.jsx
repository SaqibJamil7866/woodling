/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const Filters = (props) => {
    const [sliderValue, setSliderValue ] = useState({ min: 18, max: 35 });
    const sliderOnChange = (val) => {
        setSliderValue({min: val.min, max: val.max});
        console.log(val.min, val.max);
    }
    return(
        <div className='clr__white wh80 h480 mt30'>
            <div className='liked-talent-title p35'>
                <p className="oniline-status-title fs25"><b>Filters</b></p>
            </div>
            <div className='p35 d-flex flex-dir-col'>
                <label className='fs20 muli'>Skills</label>
                <select name="gender" id="inputState" className="form-control border-none" placeholder='Gender'>
                    <option value=''>Any</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
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
                            <span className="checkmark"></span>
                        </label>
                        <label className="containers">Female
                            <input type="radio" name="radio" />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                    <div>
                        <label htmlFor='radio' className="containers">Male
                            <input type="radio" name="radio" id='radio' />
                            <span className="checkmark" />
                        </label>
                        <label className="containers">Rather Not Say
                            <input type="radio" name="radio" />
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                <button href="" className="filter-btn mt20">Apply Filter</button>
            </div>
        </div>
    );
}
export default Filters