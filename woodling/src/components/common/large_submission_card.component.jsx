import React from 'react';
import { ReactComponent as AddButtonIcon } from '../../assets/add-button.svg';

const LargeSubmissionCard = (props) => {
    const today = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'numeric',day: 'numeric'}).format(Date.now())
    return ( 
        <div className='d-flex'>
            <div className='d-flex flex-dir-col'>
                {props.cardShown===false ? props.submissionCard.length!==0 ? props.submissionCard.map((i, index)=>{
                    if(index<3){
                        return <div className='clr__white w80 border-radius d-flex flex-dir-col mt10'>
                            <div className='d-flex align-items-center space-between bkgrnd-red right-top-radius'>
                                <div className='clr__white right-bottom-radius w75 border-bottom-2'>
                                    <h1 className='fs20'>{((i.name).length > props.headinglimit) ?  (((i.name).substring(0,props.headinglimit-3)) + '...') : i.name}</h1>
                                </div>
                                <div className='d-flex justify-content align-items-center mr--2'>
                                    <h6 className='clr-white'><b>ROLE(S):2</b></h6>
                                </div>
                            </div>
                            <div className='ml30'>
                                <button disabled href="" className="skills-text">{i.skill}</button>
                                <p className='mt10'>{((i.details).length > props.textlimit) ?  (((i.details).substring(0,props.textlimit-3)) + '...') : i.details}</p>
                            </div>
                            <div className='pb20 border-top'>
                                <div className='d-flex space-between mt10 plr20'>
                                    <div className=''>
                                        <p>{((i.country).length > props.countrylimit) ?  (((i.country).substring(0,props.countrylimit-3)) + '...') : i.country}</p>
                                    </div>
                                    <div>
                                        <button onClick={() => props.handleShowModel(i)} className="skills-btn">{i.btn}</button>
                                    </div>
                                    <div>
                                        {i.expiryDate >= today ? <p className='clr__red'><b>ACTIVE</b></p> : <p className='clr__red'><b>INACTIVE</b></p>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                    
                }) : <div className='center__item align-items-center'>
                    {props.img ? <div>
                                    <img style={{width: '400px'}} src={props.img} /> <p style={{textAlign: 'center'}}><b>{props.noRecord}</b></p>
                                </div> : 
                                <p className='fs20'>{props.noRecord}</p>
                    }
                     </div> : props.submissionCard.map((i, index)=>{
                                        return <div className='clr__white w80 border-radius d-flex flex-dir-col mt10'>
                                            <div className='d-flex align-items-center space-between bkgrnd-red right-top-radius'>
                                                <div className='clr__white right-bottom-radius w75 border-bottom-2'>
                                                    <h1 className='fs20'>{((i.name).length > props.headinglimit) ?  (((i.name).substring(0,props.headinglimit-3)) + '...') : i.name}</h1>
                                                </div>
                                                <div className='d-flex justify-content align-items-center mr--2'>
                                                    <h6 className='clr-white'><b>ROLE(S):2</b></h6>
                                                </div>
                                            </div>
                                            <div className='ml30'>
                                                <button disabled href="" className="skills-text">{i.skill}</button>
                                                <p className='mt10'>{((i.details).length > props.textlimit) ?  (((i.details).substring(0,props.textlimit-3)) + '...') : i.details}</p>
                                            </div>
                                            <div className='pb20 border-top'>
                                                <div className='d-flex space-between mt10 plr20'>
                                                    <div className=''>
                                                        <p>{((i.country).length > props.countrylimit) ?  (((i.country).substring(0,props.countrylimit-3)) + '...') : i.country}</p>
                                                    </div>
                                                    <div>
                                                        <button onClick={() => props.handleShowModel(i)} className="skills-btn">{i.btn}</button>
                                                    </div>
                                                    <div>
                                                    {i.expiryDate >= today ? <p className='clr__red'><b>ACTIVE</b></p> : <p className='clr__red'><b>INACTIVE</b></p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                }) 
                            }
                <div className='d-flex justify-content-center w80'>
                    {props.submissionCard.length !==0 ? <button onClick={props.showCards} href="" className={props.cardShown ? 'noDisplay' :'load-btn'}>Load More</button> : null}
                </div>   
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