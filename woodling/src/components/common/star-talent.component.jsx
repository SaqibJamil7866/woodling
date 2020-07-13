import React from 'react';

const StaredTalent = (props) => {
    return(
        <div className='clr__white wh80 scrolling'>
            <div className='liked-talent-title'>
                <p class="oniline-status-title"><b>Talent You've Shared</b></p>
            </div>
            {props.likedPeople.map((like)=>{
                return<> 
                <div className='d-flex space-between mt10 border-bottom'>
                    <div className='d-flex ml15'>
                        <img className='border-radius60 h60' src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt=""/>
                    <div className='ml10'>
                        <p className='m0 mt10'><b>ALi KHAn</b></p>
                        <p className='clr-grey fs11'><b>@ALiKhan</b></p>
                    </div>
                    </div>
                    <div className='d-flex align-item mr15'>
                        <i className='fa fa-star mr18 fs20 clr__red'></i>
                        <button href="" className="notes-btn"><b>Notes</b></button>
                    </div>
                </div>
                </>;
            })}
        </div>
    );
}
export default StaredTalent;