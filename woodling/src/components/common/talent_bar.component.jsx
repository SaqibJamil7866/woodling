import React from 'react';

function TalentBar(props) {
    return (
        <div className="card">
            <p class="oniline-status-title gray bold">{props.title}</p>
            <div className="card-pics mb10 ml10">
                <img className="brad-40" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"  alt="authore pic"/>
                <img className="brad-40" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"  alt="authore pic"/>
                <img className="brad-40" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"  alt="authore pic"/>
            </div>
        </div>
    );
}

export default TalentBar;