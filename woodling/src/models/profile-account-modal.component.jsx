import React, {useReducer, useEffect} from 'react';
import { Modal } from 'react-bootstrap';
import { UserService } from '../services/UserService';

const AccountModal = (props) => {
    const initialState = {
        selected: false,
        price: [],
        data: []
    }
    function reducer(state, {field, value}) {
        return {
            ...state,
            [field]: value
        }
    }
    const [state, dispatch] = useReducer(reducer, initialState);
    const { selected, price, data } = state;

    useEffect(async() => {
        await UserService.getPremiumRate()
        .then((res) => {
            dispatch({field: 'price', value: res.data.premium_pricing})
        }).catch((e)=>console.error("error: "+ e));
    }, [])
    
    const handleSelected = (data) => {
        dispatch({field: 'selected', value: true})
        dispatch({field: 'data', value: data})
        console.log('monthly', data.price)
    }

    const handleSelectedFalse = (data) => {
        dispatch({field: 'selected', value: false})
        dispatch({field: 'data', value: data})
        console.log('Yearly', data.price)
    }
    
    const { openAccountModal, closeAccountModal } = props;
    return ( 
        <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={openAccountModal}
            onHide={closeAccountModal}
        >
            <Modal.Body>
                <div className='p10 d-flex space-between'>
                    {price.map((i, index) => {
                        return <div onClick={()=>handleSelectedFalse(i)} className={selected ? 'border w45 pointer' : 'border-red w45  pointer'}>
                                    <div className={data===[] ? null : data ? 'p35 d-flex justify-content-center align-item border-bottom' : 'p35 d-flex justify-content-center align-item border-bottom-red'}>
                                        <h3 className={selected ? '' : 'red'}>Yearly</h3>
                                    </div>
                                    <div>
                                        <div className='d-flex align-item'>
                                            <i className='fa fa-check red' />
                                            <p className='mb0 p0'>Get Featured Discovery</p>
                                        </div>
                                        <div className='d-flex mt5'>
                                            <i className='fa fa-check red' />
                                            <p className='mb0 p0'>Premium Search results</p>
                                        </div>
                                        <div className='d-flex mt5'>
                                            <i className='fa fa-check red' />
                                            <p className='mb0 p0'>Keep notes on talents</p>
                                        </div>
                                        <div className='d-flex mt5'>
                                            <i className='fa fa-check red' />
                                            <p className='mb0 p0'>See who visited your profile</p>
                                        </div>
                                        <div className='d-flex mt5'>
                                            <i className='fa fa-check red' />
                                            <p className='mb0 p0'>Keep track on Post Impressions</p>
                                        </div>
                                        <div className='d-flex'>
                                            <i className='fa fa-check red mt5' />
                                            <p className='mb0 p0'>Be first to receive the notifications</p>
                                        </div>
                                        <div className='d-flex'>
                                            <i className='fa fa-check red mt5' />
                                            <p className='mb0 p0'>Full access</p>
                                        </div>
                                        <div className='d-flex'>
                                            <i className='fa fa-check red mt5' />
                                            <p className='mb0 p0'>5 free casting calls</p>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <div className={selected ? 'border p25' : 'border-red p25'}>
                                            <h3>$35.00</h3>
                                        </div>
                                    </div>
                                </div>
                    })}
                    {/* <div onClick={handleSelected} className={selected ? 'border-red w45 pointer d-flex flex-dir-col space-between' : 'border w45 pointer d-flex flex-dir-col space-between'}>
                        <div className={selected ? 'p35 d-flex justify-content-center align-item border-bottom-red' : 'p35 d-flex justify-content-center align-item border-bottom'}>
                            <h3 className={selected ? 'red' : ''}>Monthly</h3>
                        </div>
                        <div>
                            <div className='d-flex'>
                                <i className='fa fa-check red mt5' />
                                <p className='mb0 p0'>Get Featured Discovery</p>
                            </div>
                            <div className='d-flex'>
                                <i className='fa fa-check red mt5' />
                                <p className='mb0 p0'>Premium Search results</p>
                            </div>
                            <div className='d-flex '>
                                <i className='fa fa-check red' mt5 />
                                <p className='mb0 p0'>Keep notes on talents</p>
                            </div>
                            <div className='d-flex'>
                                <i className='fa fa-check red mt5' />
                                <p className='mb0 p0'>See who visited your profile</p>
                            </div>
                            <div className='d-flex'>
                                <i className='fa fa-check red mt5' />
                                <p className='mb0 p0'>Keep track on Post Impressions</p>
                            </div>
                            <div className='d-flex'>
                                <i className='fa fa-check red mt5' />
                                <p className='mb0 p0'>Be first to receive the notifications</p>
                            </div>
                            <div className='d-flex'>
                                <i className='fa fa-check red mt5' />
                                <p className='mb0 p0'>Full access</p>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            <div className={selected ? 'border-red p25' : 'border p25'}>
                                <h3>$5.00</h3>
                            </div>
                        </div>
                    </div> */}
                </div>
            </Modal.Body>
        </Modal>
     );
}
 
export default AccountModal;