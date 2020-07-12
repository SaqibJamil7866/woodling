import React from 'react';
import { ReactComponent as DotCircleIcon } from '../../assets/dot-circle.svg';
import { ReactComponent as ShareIcon } from '../../assets/share-alt.svg';
import { ReactComponent as LinkIcon } from '../../assets/link.svg';
function Post(props) {
    return (
        <div>
            {props.posts && 
                props.posts.map((prop, index, arr) => {
                return (
                    <div className={`mt30 top-content-bar container row ${arr.length -1 === index ? "": "mb100"}`} style={{width: '700px'}}>
                        <div className="col-md-6">
                            <div className="p-3-0">
                                <img className="brad-40" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"  alt="authore pic"/>
                                <span>{prop.full_name}</span>
                            </div>
                            <div className="min-h80">
                                {prop.caption}
                            </div>
                            <div className="border-top">
                                <span className="mr20 red">
                                    <i className="fa fa-heart-o" title="Like"></i>
                                    <span className="badge">{prop.likes}</span>
                                </span>
                                <span className="mr20 navy">
                                    <i className="fa fa-comment-o" title="Comment"></i>
                                    <span className="badge  mr20">{prop.comments}</span>
                                </span>
                            </div>
                        </div>
                        <div className="col-md-6 p0">
                            <div className="">
                                <img className="brad-10 post-image absolute" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"  alt="authore pic"/>
                            </div>
                            <div className="float-right">
                                <DotCircleIcon className="profile-icons" />
                                <ShareIcon className="profile-icons" />
                                <LinkIcon className="profile-icons" />
                            </div>
                        </div>
                    </div>
                )})
            }
        </div>
    );
}

export default Post;
