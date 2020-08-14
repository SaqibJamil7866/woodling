import React from 'react';
import UserExperienceModal from '../../models/user_experience-modal.component';

const UserExperience = (props) => {
    const {userExperience, userModal, openModal, closeModal, userModalData, experienceStyle, openExperienceModal} = props
    return ( 
        <>
            {userExperience && userExperience.map((i, index) => {
                return <div onClick={experienceStyle ? () => openExperienceModal(i) : () => openModal(i)} className={experienceStyle ? 'box-shadow clr__white pointer w45 f-left ml20 h165px mt20 p10 border-radius d-flex flex-dir-col space-between' : 'box-shadow clr__white pointer w40 f-left ml20 h200 mt20 p15 border-radius d-flex flex-dir-col space-between'}>
                            <div>
                                <h3 className='fs25'>{((i.project).length > 51) ?  (((i.project).substring(0,51-3)) + '...') : i.project}</h3>
                                <p>{i.company}</p>
                            </div>
                            <div className='d-flex space-between align-item'>
                                <button disabled={experienceStyle ? true : false} className={experienceStyle ? "skills-text plr10 mt0 fs13" : "skills-text"}>{i.role}</button>
                                <p className='p0 m0'>{i.start_date} - {i.end_date}</p>
                            </div>
                        </div>;
            })}
            {userExperience && userExperience.length === 0 ? 'No Talent find' : ''}
            {userModal ? <UserExperienceModal 
                            openModal={openModal}
                            closeModal={closeModal}
                            userModalData={userModalData}
                        /> : null}

           
        </>
     );
}
 
export default UserExperience;