import React from 'react';

const TrendingTags = (props) => {
    return ( 
        <div className="card h300">
            <p className="oniline-status-title border-bottom"><b>Trending Now</b></p>
            <div className="pl5 scrolling">
                {props.tags && props.tags.map((tuser,index)=>{  
                    return(
                        <div className="explore-user-profile" key={index}>
                            <i className='fa fa-long-arrow-right explore-user alignSelf' />
                            {/* <img src={require('../../assets/img_avatar.png')} alt="user" className="explore-user" /> */}
                            <div className="user-name-follow p10">
                                <p className="explore-user-name">#{tuser.title}</p>
                            </div>
                        </div>
                    )
                })}
            </div>	
        </div>
     );
}
 
export default TrendingTags;