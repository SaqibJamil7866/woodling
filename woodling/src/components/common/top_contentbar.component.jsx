import React from 'react';
import { ReactComponent as CircleImageIcon } from '../../assets/circle-image.svg';
import { ReactComponent as CircleVideoIcon } from '../../assets/circle-video-icon.svg';
import { ReactComponent as ScriptIcon } from '../../assets/script.svg';
import { ReactComponent as EventIcon } from '../../assets/event.svg';
import { ReactComponent as CartIcon } from '../../assets/cart.svg';
function TopContentBar(props) {
    const { openImagePopup, openStatusUploadModal } = props;

    return (
        <div className="mt30 top-content-bar h40 col-md-10 ml18">
            <span>
                <span className="inline-block wd-58p pt-6 ">What are you up to?</span>
                <span>
                    <CircleImageIcon onClick={()=> openImagePopup()} height="35px" width="35px" className="mr10 mt3"/>
                    <CircleVideoIcon height="35px" width="35px" className="mr10 mt3"/>
                    <ScriptIcon onClick={() => openStatusUploadModal()} height="35px" width="35px" className="mr10 mt3 pointer"/>
                    <EventIcon height="35px" width="35px" className="mr10 mt3"/>
                    <CartIcon height="35px" width="35px" className="mr10 mt3"/>
                </span>
            </span>
        </div>
    );
}

export default TopContentBar;
