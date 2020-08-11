import React from 'react';

const SelectImage = (props) => {
    const {name, id, openSelector, classy} = props;
    return ( 
        <>
            <label className="upload__img--text pointer z-index position-absolute" htmlFor={id}>
                <i className={classy} />
            </label>
            <input
                onChange={openSelector}
                id={id}
                accept="image/*"
                style={{ display: "none" }}
                type="file"
                name={name}
            />
        </>
     );
}
 
export default SelectImage;