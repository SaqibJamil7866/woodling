import React from 'react';
import { SettingService } from '../../services/Setting';
import { ToastsStore } from 'react-toasts';
import { picUrl } from '../../public/endpoins';
import { AuthService } from '../../services/AuthService';
import { showLoader, hideLoader } from '../../public/loader';


class EditProfile extends React.Component {
    state = {
        myData: [],
        cover: ''
    }
    async componentDidMount() {
        await SettingService.myData()
        .then((res) => {
            this.setState({myData: res.data.data}, () => {
                console.log('myData', res.data.data)
            })
        })
        .catch((e) => console.log(e))
    }

    openCover = (e) => {
        const pic = e.currentTarget.files[0];
        //const url = `uploads/cover/${pic.name}`;
        console.log(pic)
        const data = {user_id: parseInt(AuthService.getUserId()), type: 'cover_photo', photo: pic.name}
        SettingService.postCover(data)
        .then((res) => {
            if(res.data.status !== 'error'){
                ToastsStore.success(res.data.message); 
            }else{
                ToastsStore.error(res.message); 
            }
        })
        .catch((e)=> console.error("error: "+ e))
        .then(() => hideLoader());
        }
        // this.state.myData[e.currentTarget.name] = url;
        // this.setState({cover: url})
     
    

    render() {
        return ( 
            <div>
                <div className='cover-photo'>
                    <label className="upload__img--text pointer" htmlFor="selectCover">
                        <i className='fa fa-camera fs50' />
                    </label>
                    <input
                      onChange={this.openCover}
                      id="selectCover"
                      accept="image/*"
                      style={{ display: "none" }}
                      type="file"
                      name="cover_picture"
                    />
                </div>
                <img src={picUrl+""+this.state.cover} />
            </div>
        );
    }
}
 
export default EditProfile;