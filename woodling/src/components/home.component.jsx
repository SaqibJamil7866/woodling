import React, { useEffect, useState, useReducer } from 'react';
import axios from 'axios';

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
        <div className="container">
        </div>
    );
}

export default AddEditBuInventory;
