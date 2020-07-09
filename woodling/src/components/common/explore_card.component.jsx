import React from 'react';
import { ReactComponent as RightIcon } from '../../assets/right-arrow.svg';

function ExploreCard(props) {
    return (
        <div className="card">
            <p class="oniline-status-title gray">EXPLORE | Get Connected <span className="inline-block float-right"><RightIcon /></span></p>
            <hr className="mt0"/>
            <p class="title">CEO & Founder, Example</p>
            <p>Harvard University</p>
            <a href="#"><i className="fa fa-dribbble"></i></a>
            <a href="#"><i className="fa fa-twitter"></i></a>

        </div>
    );
}

export default ExploreCard;