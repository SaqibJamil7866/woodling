import React from 'react';
import { siteUrl } from '../../public/endpoins';

function TalentBar(props) {
    const {title, featuredTalents } = props;
    return (
        <div className="card">
            <p className="oniline-status-title gray bold">{title}</p>
            <div className="card-pics mb10 ml10">
                {featuredTalents && featuredTalents.map((talent)=>{
                    return <img className="brad-40" key={talent.id} src={siteUrl+""+talent.profile_thumb} alt="avatar" />
                })}
            </div>
        </div>
    );
}

export default TalentBar;