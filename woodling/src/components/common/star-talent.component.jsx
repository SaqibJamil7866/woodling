/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import TalentMdoel from './modal.component';
import { siteUrl } from '../../public/endpoins';

const StaredTalent = (props) => {

    const { starredTalents, unstarTalent, saveNotes, handleShowModel, handleHideModel, modalData } = props;
    return(
        <>
            <div className='clr__white wh80 scrolling'>
                <div className='liked-talent-title'>
                    <p className="oniline-status-title"><b>Talent You've Shared</b></p>
                </div>
                {starredTalents && starredTalents.map((like)=>{
                    return(
                        <> 
                        <div className='d-flex space-between mt10 border-bottom'>
                            <div className='d-flex ml15'>
                                <img className='border-radius60 h60' src={siteUrl+""+like.profile_thumb} alt="avatar" />
                            <div className='ml10'>
                                <p className='m0 mt10'><b>{like.full_name}</b></p>
                                <p className='clr-grey fs11'><b>@{like.username}</b></p>
                            </div>
                            </div>
                            <div className='d-flex align-item mr15'>
                                <i className='fa fa-star mr18 fs20 clr__red' />                           
                                <button onClick={() => handleShowModel(like)} className="notes-btn"><b>Notes</b></button>
                            </div>
                        </div>
                        </>
                    )
                })}
                { ((starredTalents && starredTalents.length === 0) || !starredTalents) ? `You didn't star any talent`: '' }
            </div>
            <div>
                {modalData.showModal ?
                    <TalentMdoel
                        modalData={modalData}
                        hideModel={handleHideModel}
                        likedPeople={starredTalents}
                        saveNotes={saveNotes}
                        unstarTalent={unstarTalent}
                    /> : null}
            </div>
        </>
    );
}
export default StaredTalent;