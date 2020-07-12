import React from 'react';
import StarRatings from 'react-star-ratings';

const RatingStar = (props) => {
    return(
        <div>
            <StarRatings
                starRatedColor='red'
                numberOfStars={5}
                rating={props.rating}
                starDimension="20px"
                starSpacing="1px"
            />
        </div>
    );
}

export default RatingStar;