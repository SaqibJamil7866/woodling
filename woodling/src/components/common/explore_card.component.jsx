import React from 'react';
import { ReactComponent as RightIcon } from '../../assets/right-arrow.svg';

function ExploreCard(props) {
    return (
        <div className="card">
            <p class="oniline-status-title gray">EXPLORE | Get Connected <span className="inline-block float-right"><RightIcon /></span></p>
            <hr className="mt0 mb0"/>
            <ul className='vertical-list p0'>
                <li>Terms</li>
                <li>Privacy</li>
                <li>FAQ</li>
                <li>Support</li>
                <li>See More</li>
            </ul>
        </div>
    );
}

export default ExploreCard;