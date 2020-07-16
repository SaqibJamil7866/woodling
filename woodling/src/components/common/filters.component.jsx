import React from 'react';

const Filters = (props) => {
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
                    <input type='range' className='slider' />
                    <input type='range' className='slider' />
                </div>

                <label className='fs20 muli mt10'>Gender</label>
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