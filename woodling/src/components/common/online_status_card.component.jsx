import React from 'react';
import { ReactComponent as RightIcon } from '../../assets/right-arrow.svg';


function OnlineStatusCard(props) {
    return (
        <div className="card">
            <p className="oniline-status-title gray">Active in Circles <span className="inline-block float-right"><RightIcon /></span></p>
            <div className="card-pics mb10 ml10">
                <img className="brad-40" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"  alt="authore pic"/>
                <img className="brad-40" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"  alt="authore pic"/>
                <img className="brad-40" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"  alt="authore pic"/>
            </div>
        </div>
    );
}

export default OnlineStatusCard;