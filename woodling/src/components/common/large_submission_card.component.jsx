/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/jsx-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { ReactComponent as AddButtonIcon } from '../../assets/add-button.svg';

const LargeSubmissionCard = (props) => {
    return( 
        <div className='d-flex'>
            <div className='d-flex flex-dir-col'>
                {props.data && props.data.map((call, index)=>{
                    return(
                        <div key={index} className='clr__white min-w870 max-w870 border-radius d-flex flex-dir-col mt10'>
                            <div className='d-flex align-items-center space-between bkgrnd-red right-top-radius'>
                                <div className='clr__white right-bottom-radius w75 border-bottom-2'>
                                    <h1 className='fs20'>{((call.title).length > props.headinglimit) ?  (((call.title).substring(0,props.headinglimit-3)) + '...') : call.title}</h1>
                                </div>
                                <div className='d-flex justify-content align-items-center mr--2'>
                                    <h6 className='clr-white'><b>ROLE(S):{call.roles_count}</b></h6>
                                </div>
                            </div>
                            <div className='ml30'>
                                <button disabled href="" className="skills-text">{call.skill}</button>
                                <p className='mt10'>{((call.description).length > props.textlimit) ?  (((call.description).substring(0,props.textlimit-3)) + '...') : call.description}</p>
                            </div>
                            <div className='pb20 border-top'>
                                <div className='d-flex space-between mt10 plr20'>
                                    <div className=''>
                                        <p>{call.city}, {call.country}</p>
                                    </div>
                                    <div>
                                        <button onClick={() => props.handleShowModel(call)} className="skills-btn">{call.production_type}</button>
                                    </div>
                                    <div>
                                        {call.active === "1" ? <p className='clr__red'><b>ACTIVE</b></p> : <p className='clr__red'><b>INACTIVE</b></p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) 
                    
                })}
                
                { !props.data || props.data.length === 0  ? 
                    <div className='center__item align-items-center'>
                        {props.img ? 
                            (<div>
                                <img style={{width: '400px'}} src={props.img} alt="img" /> <p style={{textAlign: 'center'}}><b>{props.noRecord}</b></p>
                             </div>
                            ) : 
                            <p className='fs20'>{props.noRecord}</p>
                        }
                    </div> : null
                }

                {props.cardShown && 
                    (
                        <div className='d-flex justify-content-center w80'>
                            <button onClick={props.showCards} className='load-btn'>Load More</button>
                        </div>
                    )
                }

            </div>
            <div className='d-flex align-items-start ml20 h10 mr10'>
                {/* <div className="fixedbutton"> */}
                    <AddButtonIcon className='pointer' onClick={props.postingCallForm} height="50px" width="50px" />
                {/* </div> */}
            </div>
        </div>
    );
}
 
export default LargeSubmissionCard;