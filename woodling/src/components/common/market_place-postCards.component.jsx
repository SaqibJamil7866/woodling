import React from 'react';
import { picUrl } from '../../public/endpoins';
import { ReactComponent as DotCircleIcon } from '../../assets/dot-circle.svg';
import { ReactComponent as ShareIcon } from '../../assets/share-alt.svg';
import { ReactComponent as LinkIcon } from '../../assets/link.svg';

const MarketPlacePost = (props) => {
    const { posts, handleOpenModal } = props;
    return ( 
        posts.map((i, index, arr) => {
            return arr.length-1 === index ? (
                    <div key={index+1} className={`mt30 top-content-bar container row ${ "mb100"}`} style={{width: '700px'}}>
                                <div className={i.path ? "col-md-6" : 'col-md-10'}>
                                    <div className="p-3-0">
                                        <img style={{width: '15%'}} className="brad-40 h45" src={i.profile_thumb ? picUrl+""+i.profile_thumb : picUrl+""+i.profile_picture} alt="authore pic" />
                                        <span><b>@{i.username}</b></span>
                                    </div>
                                    <div className="min-h80 w100p d-flex space-between align-item mt10">
                                        <button disabled href="" className="skills-text m0 red">For {i.purpose}</button>
                                        <p className='p0 m0 red'><b>{i.currency} {i.price}</b></p>
                                    </div>
                                    <div className="min-h80 mt10">
                                        <p className='p0 m0'><b>{i.name}</b></p>
                                        <p className='clr-grey'>{i.product_type}</p>
                                    </div>
                                    <div className="min-h80 mt10 d-flex">
                                        <i className='fa fa-map-marker red fs20' />
                                        <p className='ml5'>{i.formatted_address}</p>
                                    </div>
                                    <div className="border-top">
                                        <span className="mr20 red d-flex align-item">
                                            <i className={i.likes?"fa fa-heart-o fs25":"fa fa-heart fs25"} title="Like" />
                                            <span className="badge fs15">{i.likes ? i.likes : i.like_status}</span>
                                        </span>
                                        {/* <span className="mr20 navy">
                                            <i className="fa fa-comment-o" title="Comment" />
                                            <span className="badge  mr20">{prop.comments}</span>
                                        </span> */}
                                    </div>
                                </div>
                                <div onClick={() => handleOpenModal(i)} className={i.path ? "col-md-6 p0" : 'col-md-2'}>
                                    <div className="">
                                        {i.path!==null ? <img className="brad-10 post-image absolute h270" src={picUrl+i.path} alt="authore pic" /> : null}
                                    </div>
                                    <div className="float-right">
                                        <DotCircleIcon className="profile-icons" />
                                        <ShareIcon className="profile-icons" />
                                        <LinkIcon className="profile-icons" />
                                    </div>
                                </div>
                            </div>) 
                    :         (<div ref={props.scrollRef} key={index+1} className={`mt30 top-content-bar container row ${ "mb100"}`} style={{width: '700px'}}>
                                    <div className={i.path ? "col-md-6" : 'col-md-10'}>
                                        <div className="p-3-0">
                                            <img style={{width: '15%'}} className="brad-40 h45" src={i.profile_thumb ? picUrl+""+i.profile_thumb : picUrl+""+i.profile_picture} alt="authore pic" />
                                            <span><b>@{i.username}</b></span>
                                        </div>
                                        <div className="min-h80 w100p d-flex space-between align-item mt10">
                                            <button disabled href="" className="skills-text m0 red">For {i.purpose}</button>
                                            <p className='p0 m0 red'><b>{i.currency} {i.price}</b></p>
                                        </div>
                                        <div className="min-h80 mt10">
                                            <p className='p0 m0'><b>{i.name}</b></p>
                                            <p className='clr-grey'>{i.product_type}</p>
                                        </div>
                                        <div className="min-h80 mt10 d-flex">
                                            <i className='fa fa-map-marker red fs20' />
                                            <p className='ml5'>{i.formatted_address}</p>
                                        </div>
                                        <div className="border-top">
                                            <span className="mr20 red d-flex align-item">
                                                <i className={i.likes?"fa fa-heart-o fs25":"fa fa-heart fs25"} title="Like" />
                                                <span className="badge fs15">{i.likes ? i.likes : i.like_status}</span>
                                            </span>
                                            {/* <span className="mr20 navy">
                                                <i className="fa fa-comment-o" title="Comment" />
                                                <span className="badge  mr20">{prop.comments}</span>
                                            </span> */}
                                        </div>
                                    </div>
                                    <div onClick={() => handleOpenModal(i)} className={i.path ? "col-md-6 p0" : 'col-md-2'}>
                                        <div className="">
                                            {i.path!==null ? <img className="brad-10 post-image absolute h270" src={picUrl+i.path} alt="authore pic" /> : null}
                                        </div>
                                        <div className="float-right">
                                            <DotCircleIcon className="profile-icons" />
                                            <ShareIcon className="profile-icons" />
                                            <LinkIcon className="profile-icons" />
                                        </div>
                                    </div>
                                </div>) 
        })
     );
}
 
export default MarketPlacePost;