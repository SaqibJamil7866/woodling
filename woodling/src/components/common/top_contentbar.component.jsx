import React from 'react';
import { ReactComponent as CircleImageIcon } from '../../assets/circle-image.svg';
import { ReactComponent as CircleVideoIcon } from '../../assets/circle-video-icon.svg';
import { ReactComponent as ScriptIcon } from '../../assets/script.svg';
import { ReactComponent as EventIcon } from '../../assets/event.svg';
import { ReactComponent as CartIcon } from '../../assets/cart.svg';

function TopContentBar(props) {
    const { openStatusUploadModal, openPictureUploadModal, openVideoUploadModal, openScriptModal, openEventModal, openProductModal } = props;
    // end 
    return (
        <div className="mt30 top-content-bar h40 col-md-10 ml18">
            <span>
                <span onClick={() => openStatusUploadModal()} className="inline-block wd-58p pt-6 ">What are you up to?</span>
                <span>
                    <CircleImageIcon onClick={()=> openPictureUploadModal()} height="35px" width="35px" className="mr10 mt3 pointer"/>
                    <CircleVideoIcon onClick={() => openVideoUploadModal()} height="35px" width="35px" className="mr10 mt3 pointer"/>
                    <ScriptIcon onClick={() => openScriptModal()} height="35px" width="35px" className="mr10 mt3 pointer"/>
                    <EventIcon onClick={() => openEventModal()} height="35px" width="35px" className="mr10 mt3 pointer" />
                    <CartIcon onClick={() =>openProductModal()} height="35px" width="35px" className="mr10 mt3 pointer" />
                </span>
            </span>
        </div>
    );
}

export default TopContentBar;
