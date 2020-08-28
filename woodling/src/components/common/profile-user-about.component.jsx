import React from 'react';

const UserAbout = (props) => {
    const {rolesData, full_name, email, address, date_of_birth, gender, marital_status, phone_1, website} = props;
    console.log(rolesData)
    return ( 
        <div>
            <div className='clr__white d-flex justify-content-center p10'>
                {/* <button className="skills-text">Producer</button> */}
                {rolesData ? rolesData.map((i, index) => {
                    return <button disabled className="roles-text ml10 mr10">{i.name}</button>
                }) : null}
                {/* <button className="skills-text">Videographer</button> */}
            </div>
            <div className='d-flex justify-content-center'>
                <div className='row w70'>
                    <div className='col-md-6'>
                        <div className='clr__white h150 mt20'>
                            <div className='about-icon'>
                                <i className='fa fa-user fs20' />
                            </div>
                            <div className='d-flex justify-content-center align-item h100p'>
                                <p><b>{full_name}</b></p>
                            </div>
                        </div>
                    </div>
                    {website ? <div className='col-md-6'>
                        <div className='clr__white h150 mt20'>
                            <div className='about-icon'>
                                <i className='fa fa-globe fs20' />
                            </div>
                            <div className='d-flex justify-content-center align-item h100p'>
                                <p><b>{website}</b></p>
                            </div>
                        </div>
                    </div> : null}
                    <div className='col-md-6'>
                        <div className='clr__white h150 mt20'>
                            <div className='about-icon'>
                                <i className='fa fa-map-marker fs20' />
                            </div>
                            <div className='d-flex justify-content-center align-item h100p'>
                                <p><b>{address}</b></p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='clr__white h150 mt20'>
                            <div className='about-icon'>
                                <i className='fa fa-birthday-cake fs20' />
                            </div>
                            <div className='d-flex justify-content-center align-item h100p'>
                                <p><b>{date_of_birth}</b></p>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className='clr__white h150 mt20'>
                            <div className='about-icon'>
                                <i className='fa fa-venus-mars fs20' />
                            </div>
                            <div className='d-flex justify-content-center align-item h100p'>
                                <p><b>{gender}</b></p>
                            </div>
                        </div>
                    </div>
                    {marital_status ? <div className='col-md-6'>
                        <div className='clr__white h150 mt20'>
                            <div className='about-icon'>
                                <i className='fa fa-heart  fs20' />
                            </div>
                            <div className='d-flex justify-content-center align-item h100p'>
                                <p><b>{marital_status}</b></p>
                            </div>
                        </div>
                    </div> : null}
                    {email ? <div className='col-md-6'>
                        <div className='clr__white h150 mt20'>
                            <div className='about-icon'>
                                <i className='fa fa-envelope fs20' />
                            </div>
                            <div className='d-flex justify-content-center align-item h100p'>
                                <p><b>{email}</b></p>
                            </div>
                        </div>
                    </div> : null}
                    {phone_1 ? <div className='col-md-6'>
                        <div className='clr__white h150 mt20'>
                            <div className='about-icon'>
                                <i className='fa fa-mobile fs20' />
                            </div>
                            <div className='d-flex justify-content-center align-item h100p'>
                                <p><b>{phone_1}</b></p>
                            </div>
                        </div>
                    </div> : null}
                </div>
            </div>
        </div> 
    );
}
 
export default UserAbout;