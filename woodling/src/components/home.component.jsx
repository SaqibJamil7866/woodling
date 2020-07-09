import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';
import TopContentBar from './common/top_contentbar.component';
import Post from './common/post.component';
import { ReactComponent as AddButtonIcon } from '../assets/add-button.svg';
import OnlineStatusCard from './common/online_status_card.component';
import ExploreCard from './common/explore_card.component';

function AddEditBuInventory(props) {
    const initialState ={
        _id: "",
        buId: "",
        itemId: "",
        qty: "",
        items:[],
        businessUnits:[]
    }

    function reducer(state, { field, value}){
        return{
            ...state,
            [field] : value
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    const { _id, buId, itemId, qty, items, businessUnits } = state;

    const onChangeValue = ((e)=>{ 
        dispatch({field: e.target.name, value: e.target.value});
    });

    function validateForm() {
        let res = false;
        if(qty){
            res = true
        }
        return res;
    }

    const [comingFor, setcomingFor] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const [errorMsg, setErrorMsg] = useState("");
    const [openNotification, setOpenNotification] = useState(false);
  


    useEffect(() => {
        // setcomingFor(props.history.location.state.comingFor);
        // const selectedRec = props.history.location.state.selectedItem;
        // if(selectedRec){
        //     Object.entries(selectedRec).map(([key,val])=>{
        //         if (val && typeof val === 'object') {
        //             dispatch({ field: key, value: val._id });
        //         } else {
        //             dispatch({ field: key, value: val });
        //         }
        //     })
        // }
        // if(props.history.location.state.items) {
        //     dispatch({ field: 'items', value: props.history.location.state.items });
        // }
        // if(props.history.location.state.businessUnit) {
        //     dispatch({field: 'businessUnits',value: props.history.location.state.businessUnit});
        // }
    }, []);

    const handleCancel = () => {
        props.history.goBack();
    };


    // const handleAdd = () => {
    //     setIsFormSubmitted(true);
    //     if(qty){
    //         const params = { buId, itemId, qty };
    //         axios.post(addBuInventoryUrl, params).then(res => {
    //             if (res.data.success) {
    //                 console.log('response after adding item', res);
    //                 props.history.goBack();
    //             }
    //             else if (!res.data.success) {
    //                 setOpenNotification(true);
    //             }
    //         }).catch(e => {
    //                 console.log('error after adding bu inventory', e);
    //                 setOpenNotification(true)
    //                 setErrorMsg("Error while adding the item")
    //         });
    //     }
    // };

    // const handleEdit = () => {
    //     setIsFormSubmitted(true);
    //     if(qty){
    //         const params = { _id, buId, itemId, qty };
    //         axios.put(updateBuInventoryUrl, params).then(res => {
    //             if (res.data.success) {
    //                 console.log('response after adding item', res);
    //                 props.history.goBack();
    //             }
    //             else if (!res.data.success) {
    //                 setOpenNotification(true);
    //             }
    //         }).catch(e => {
    //             console.log('error after adding bu inventory', e);
    //             setOpenNotification(true);
    //             setErrorMsg("Error while editing the item")
    //         });
    //     }
    // };

    return (
        <div className="row h100p">
            <div className="col-md-8 br-white">
                <TopContentBar />
                <Post />
                <div className="fixedbutton">
                    <AddButtonIcon  height="50px" width="50px"/>
                </div>
            </div>
            <div className="col-md-4">
                <div className="img-div mt30 mb10">
                    <img src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"  alt="authore pic"/>
                </div>
                <OnlineStatusCard />
                <div className="mt10">
                    <ExploreCard />
                </div>
            </div>
        </div>
    );
}

export default AddEditBuInventory;
