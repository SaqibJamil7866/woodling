/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import { ToastsStore } from 'react-toasts';
import TalentMdoel from './modal.component';
import { siteUrl } from '../../public/endpoins';
import { showLoader, hideLoader } from '../../public/loader';
import { TalentService } from '../../services/TalentService';

const StaredTalent = (props) => {
    const [modalData, setModalData] = useState({showModal: false, notes:''});

    const handleShowModel = (data) => {
        showLoader();
        TalentService.getStarredTalentNotes(data).then((res)=>{
            if(res.data.status !== 'error'){
                setModalData({showModal: true, talent: data, notes: res.data.starred_note.notes})
            }else{
                ToastsStore.error(res.message); 
            }
        })
        .catch((e)=> console.error("error: "+ e))
        .then(() => hideLoader());
    }

    const handleHideModel = () => {
        setModalData({showModal: false, notes: ''});
    }

    const { starredTalents, setCopyRef
        , copyCodeToClipboard, unselectStarTalent } = props;
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
                        setCopyRef={setCopyRef}
                        copyCodeToClipboard={copyCodeToClipboard}
                        unselectStarTalent={unselectStarTalent}
                    /> : null}
            </div>
        </>
    );
}
export default StaredTalent;