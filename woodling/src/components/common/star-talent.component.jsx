import React from 'react';
import TalentMdoel from './modal.component';

const StaredTalent = (props) => {
    return(
        <>
            <div className='clr__white wh80 scrolling'>
                <div className='liked-talent-title'>
                    <p class="oniline-status-title"><b>Talent You've Shared</b></p>
                </div>
                {props.likedPeople.map((like)=>{
                    return<> 
                    <div className='d-flex space-between mt10 border-bottom'>
                        <div className='d-flex ml15'>
                            <img className='border-radius60 h60' src={like.img} alt=""/>
                        <div className='ml10'>
                            <p className='m0 mt10'><b>{like.name}</b></p>
                            <p className='clr-grey fs11'><b>{like.username}</b></p>
                        </div>
                        </div>
                        <div className='d-flex align-item mr15'>
                            <i className='fa fa-star mr18 fs20 clr__red'></i>
                            <button onClick={() => props.handleShowModel(like)} className="notes-btn"><b>Notes</b></button>
                        </div>
                    </div>
                    </>;
                })}
            </div>
            <div>
               {props.showModel ?  
                <TalentMdoel 
                        showModel={props.showModel}
                        hideModel={props.handleHideModel}
                        likedPeople={props.likedPeople}
                        notes={props.notes}
                        openDropdown={props.openDropdown}
                        toggleOpen={props.toggleOpen}
                        toggleClose={props.toggleClose}
                    /> : null}
            </div>
        </>
    );
}
export default StaredTalent;